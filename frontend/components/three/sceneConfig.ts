import * as THREE from "three";

export type Vec3 = [number, number, number];

export interface Transform {
  position: Vec3;
  rotation: Vec3; // euler radians
  scale: number;
}

export interface MaterialProps {
  color: string;
  roughness: number;
  metalness: number;
}

export interface SceneConfig {
  camera: {
    position: Vec3;
    target: Vec3;
    fov: number;
    /** World units the camera pulls back along its view axis during centering. */
    centerDolly: number;
  };
  material: MaterialProps;
  car: { start: Transform; end: Transform; center: Transform };
  mount: { start: Transform; end: Transform };
}

/**
 * Committed scene setup. Tune it in the dev editor (/dev/scene) and paste the
 * exported config back here. The mount has no `center` pose — during centering
 * it rigidly follows the car (see `applyCentering`).
 */
export const defaultSceneConfig: SceneConfig = {
  camera: { position: [0, 0.35, 5], target: [0, 0, 0], fov: 40, centerDolly: 2.5 },
  material: { color: "#a7a7a7", roughness: 0.62, metalness: 0.59 },
  car: {
    start: {
      position: [4.974661555034349, 0.9338861951207251, 0],
      rotation: [
        0.21952597044426223, 0.10345618624272256, -0.10410129544388456,
      ],
      scale: 1,
    },
    end: {
      position: [1.1761803280369565, 0.39395663645215895, 0],
      rotation: [
        0.39270585108295536, -0.6765466994076277, 0.1908401589925413,
      ],
      scale: 1.8335433636230143,
    },
    // Centered, front pointing at the camera (tune in the editor — this is
    // where the car scales down as it moves in).
    center: {
      position: [0, 0.2, 0],
      rotation: [0.2, 0, 0],
      scale: 1.8335433636230143,
    },
  },
  mount: {
    start: {
      position: [2.674735212786577, 1.557792536489639, 1.9031757957805744],
      rotation: [-3.123517018950875, 0.06306167267427282, -3.052568231944937],
      scale: 1,
    },
    end: {
      position: [0.5013111821266163, 0.5408278408660286, 0.8078804283557866],
      rotation: [-2.7464214978270145, 0.6962056822522147, 2.9539698529021043],
      scale: 1.834834313194916,
    },
  },
};

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
export const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Reused scratch objects so per-frame interpolation allocates nothing.
const _ea = new THREE.Euler();
const _eb = new THREE.Euler();
const _qa = new THREE.Quaternion();
const _qb = new THREE.Quaternion();
const _pos = new THREE.Vector3();
const _scl = new THREE.Vector3();
const _quat = new THREE.Quaternion();

/**
 * Interpolate a→b onto `obj` at t (0–1). Position and scale lerp; rotation uses
 * quaternion slerp so it always takes the shortest path (no euler-wrap spins).
 */
export function applyInterpolated(
  obj: THREE.Object3D,
  a: Transform,
  b: Transform,
  t: number
) {
  obj.position.set(
    lerp(a.position[0], b.position[0], t),
    lerp(a.position[1], b.position[1], t),
    lerp(a.position[2], b.position[2], t)
  );
  _ea.set(a.rotation[0], a.rotation[1], a.rotation[2]);
  _eb.set(b.rotation[0], b.rotation[1], b.rotation[2]);
  _qa.setFromEuler(_ea);
  _qb.setFromEuler(_eb);
  obj.quaternion.slerpQuaternions(_qa, _qb, t);
  obj.scale.setScalar(lerp(a.scale, b.scale, t));
}

export function applyTransform(obj: THREE.Object3D, t: Transform) {
  obj.position.set(t.position[0], t.position[1], t.position[2]);
  obj.rotation.set(t.rotation[0], t.rotation[1], t.rotation[2]);
  obj.scale.setScalar(t.scale);
}

/** Read a live object3D back into a serialisable Transform. */
export function readTransform(obj: THREE.Object3D): Transform {
  return {
    position: [obj.position.x, obj.position.y, obj.position.z],
    rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
    scale: obj.scale.x,
  };
}

// --- matrix helpers for the centering stage ---

function matrixFromTransform(out: THREE.Matrix4, t: Transform) {
  _pos.set(t.position[0], t.position[1], t.position[2]);
  _ea.set(t.rotation[0], t.rotation[1], t.rotation[2]);
  _quat.setFromEuler(_ea);
  _scl.setScalar(t.scale);
  return out.compose(_pos, _quat, _scl);
}

function interpolatedMatrix(
  out: THREE.Matrix4,
  a: Transform,
  b: Transform,
  t: number
) {
  _pos.set(
    lerp(a.position[0], b.position[0], t),
    lerp(a.position[1], b.position[1], t),
    lerp(a.position[2], b.position[2], t)
  );
  _ea.set(a.rotation[0], a.rotation[1], a.rotation[2]);
  _eb.set(b.rotation[0], b.rotation[1], b.rotation[2]);
  _qa.setFromEuler(_ea);
  _qb.setFromEuler(_eb);
  _quat.slerpQuaternions(_qa, _qb, t);
  _scl.setScalar(lerp(a.scale, b.scale, t));
  return out.compose(_pos, _quat, _scl);
}

const _mCarNow = new THREE.Matrix4();
const _mCarEnd = new THREE.Matrix4();
const _mCarEndInv = new THREE.Matrix4();
const _mMountEnd = new THREE.Matrix4();
const _mDelta = new THREE.Matrix4();
const _mMountNow = new THREE.Matrix4();

/**
 * Centering stage. Moves the car from its `end` pose toward `center` at t (0–1)
 * and rigidly carries the mount along by the same motion, so the mounted sensor
 * stays attached to the car as it rotates. Pass null for a model being edited.
 */
export function applyCentering(
  carObj: THREE.Object3D | null,
  mountObj: THREE.Object3D | null,
  carEnd: Transform,
  carCenter: Transform,
  mountEnd: Transform,
  t: number
) {
  interpolatedMatrix(_mCarNow, carEnd, carCenter, t);
  if (carObj) _mCarNow.decompose(carObj.position, carObj.quaternion, carObj.scale);

  if (mountObj) {
    matrixFromTransform(_mCarEnd, carEnd);
    _mCarEndInv.copy(_mCarEnd).invert();
    _mDelta.multiplyMatrices(_mCarNow, _mCarEndInv); // car's end→now rigid motion
    matrixFromTransform(_mMountEnd, mountEnd);
    _mMountNow.multiplyMatrices(_mDelta, _mMountEnd);
    _mMountNow.decompose(mountObj.position, mountObj.quaternion, mountObj.scale);
  }
}

const _cbPos = new THREE.Vector3();
const _cbTarget = new THREE.Vector3();
const _cbDir = new THREE.Vector3();

/**
 * Camera position pulled back from `target` along the view axis by
 * `dolly * t` (t in 0–1). Writes into `outPos`. Keeps the same look target so
 * the car simply gets smaller in frame as t → 1.
 */
export function cameraCenterPosition(
  outPos: THREE.Vector3,
  base: Vec3,
  target: Vec3,
  dolly: number,
  t: number
) {
  _cbPos.set(base[0], base[1], base[2]);
  _cbTarget.set(target[0], target[1], target[2]);
  _cbDir.copy(_cbPos).sub(_cbTarget).normalize();
  return outPos.copy(_cbPos).addScaledVector(_cbDir, dolly * t);
}

export const MODELS = {
  car: "/models/ads-dv.glb",
  mount: "/models/sensor-mount.glb",
} as const;
