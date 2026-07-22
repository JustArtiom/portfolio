import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
  useHelper,
} from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import {
  applyCentering,
  applyInterpolated,
  applyTransform,
  cameraCenterPosition,
  smoothstep,
  MODELS,
  type MaterialProps,
  type SceneConfig,
  type Vec3,
} from "./sceneConfig";

const _camPos = new THREE.Vector3();

export type EditTarget =
  | "none"
  | "car.start"
  | "car.end"
  | "car.center"
  | "mount.start"
  | "mount.end";

export interface CameraState {
  position: Vec3;
  target: Vec3;
  fov: number;
}

interface Props {
  carProgress: number; // 0–100: start → end
  mountProgress: number; // 0–100: start → end
  centerProgress: number; // 0–100: end → center (outro)
  config: SceneConfig;
  materialProps: MaterialProps;
  dev?: boolean;
  editTarget?: EditTarget;
  gizmoMode?: "translate" | "rotate" | "scale";
  /** Dev: look through the hero (runtime) camera instead of orbiting. */
  preview?: boolean;
  onGizmoChange?: (target: EditTarget, obj: THREE.Object3D) => void;
  registerCamera?: (getter: () => CameraState) => void;
  /** Dev: registers an action that moves the orbit camera onto the hero pose. */
  registerGoToHero?: (fn: () => void) => void;
  /** Fires once, after the models have loaded and the scene first commits. */
  onReady?: () => void;
}

/**
 * The runtime camera, shown in dev as a frustum helper (so you can see where it
 * looks while orbiting) and optionally made the active camera for a 1:1 preview.
 */
function HeroCamera({
  camera,
  makeDefault,
  showHelper,
  centerProgress,
}: {
  camera: SceneConfig["camera"];
  makeDefault: boolean;
  showHelper: boolean;
  centerProgress: number;
}) {
  const ref = useRef<THREE.PerspectiveCamera>(null);
  const size = useThree((s) => s.size);
  useHelper(showHelper ? (ref as React.RefObject<THREE.PerspectiveCamera>) : null, THREE.CameraHelper);

  useLayoutEffect(() => {
    const cam = ref.current;
    if (!cam) return;
    cameraCenterPosition(
      _camPos,
      camera.position,
      camera.target,
      camera.centerDolly,
      smoothstep(centerProgress / 100)
    );
    cam.position.copy(_camPos);
    cam.fov = camera.fov;
    cam.aspect = size.width / size.height;
    cam.near = 0.1;
    cam.far = 10; // keep the frustum helper a sensible length
    cam.lookAt(...camera.target);
    cam.updateProjectionMatrix();
  });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault={makeDefault}
      fov={camera.fov}
      position={camera.position}
    />
  );
}

export default function SceneContents({
  carProgress,
  mountProgress,
  centerProgress,
  config,
  materialProps,
  dev = false,
  editTarget = "none",
  gizmoMode = "translate",
  preview = false,
  onGizmoChange,
  registerCamera,
  registerGoToHero,
  onReady,
}: Props) {
  const carRef = useRef<THREE.Group>(null);
  const mountRef = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as
    | { target?: THREE.Vector3; update?: () => void }
    | null;
  const controlsRef = useRef(controls);
  controlsRef.current = controls;
  const configRef = useRef(config);
  configRef.current = config;

  // Stable initial nav-camera values so gizmo-driven re-renders don't reset it.
  const initialCamPos = useMemo<Vec3>(
    () => [...config.camera.position],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const initialFov = useMemo(
    () => config.camera.fov,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Single shared gray material, updated in place from props.
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8a8b8e" }),
    []
  );
  useEffect(() => {
    material.color.set(materialProps.color);
    material.roughness = materialProps.roughness;
    material.metalness = materialProps.metalness;
  }, [material, materialProps]);

  // Fires once the scene commits (i.e. after the models have loaded, since this
  // component sits under a Suspense boundary).
  const readyFired = useRef(false);
  useEffect(() => {
    if (readyFired.current) return;
    readyFired.current = true;
    onReady?.();
  }, [onReady]);

  // Runtime camera fov (position/dolly are set per-frame in useFrame below).
  useEffect(() => {
    if (dev) return;
    (camera as THREE.PerspectiveCamera).fov = config.camera.fov;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [dev, camera, config.camera.fov]);

  // Expose the live nav camera to the dev "capture view" button.
  useEffect(() => {
    if (!registerCamera) return;
    registerCamera(() => {
      const t = controlsRef.current?.target;
      return {
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: t ? [t.x, t.y, t.z] : configRef.current.camera.target,
        fov: (camera as THREE.PerspectiveCamera).fov,
      };
    });
  }, [registerCamera, camera]);

  // Move the orbit camera onto the hero pose (dev "go to camera view").
  useEffect(() => {
    if (!registerGoToHero) return;
    registerGoToHero(() => {
      const c = configRef.current.camera;
      camera.position.set(...c.position);
      (camera as THREE.PerspectiveCamera).fov = c.fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      const ctrl = controlsRef.current;
      if (ctrl?.target) {
        ctrl.target.set(...c.target);
        ctrl.update?.();
      } else {
        camera.lookAt(...c.target);
      }
    });
  }, [registerGoToHero, camera]);

  // When an edit target is chosen, pin that model to the keyframe and hand it
  // to the gizmo.
  const [activeObject, setActiveObject] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (!dev || editTarget === "none") {
      setActiveObject(null);
      return;
    }
    const [group, key] = editTarget.split(".") as [
      "car" | "mount",
      "start" | "end" | "center",
    ];
    const ref = group === "car" ? carRef : mountRef;
    const keyframe =
      group === "car"
        ? configRef.current.car[key]
        : configRef.current.mount[key as "start" | "end"];
    if (ref.current && keyframe) {
      applyTransform(ref.current, keyframe);
      setActiveObject(ref.current);
    }
  }, [dev, editTarget]);

  useFrame(() => {
    // The model being edited is owned by the gizmo (pinned to its keyframe);
    // every other model follows its own progress.
    const carEditing = dev && editTarget.startsWith("car");
    const mountEditing = dev && editTarget.startsWith("mount");

    if (centerProgress > 0) {
      // Centering (reversible): car end → center, mount rigidly follows.
      applyCentering(
        carEditing ? null : carRef.current,
        mountEditing ? null : mountRef.current,
        config.car.end,
        config.car.center,
        config.mount.end,
        smoothstep(centerProgress / 100)
      );
    } else {
      // Intros: each model plays start → end on its own progress.
      if (!carEditing && carRef.current) {
        applyInterpolated(
          carRef.current,
          config.car.start,
          config.car.end,
          smoothstep(carProgress / 100)
        );
      }
      if (!mountEditing && mountRef.current) {
        applyInterpolated(
          mountRef.current,
          config.mount.start,
          config.mount.end,
          smoothstep(mountProgress / 100)
        );
      }
    }

    // Runtime camera dolly-back during centering.
    if (!dev) {
      cameraCenterPosition(
        _camPos,
        config.camera.position,
        config.camera.target,
        config.camera.centerDolly,
        smoothstep(centerProgress / 100)
      );
      camera.position.copy(_camPos);
      camera.lookAt(
        config.camera.target[0],
        config.camera.target[1],
        config.camera.target[2]
      );
    }
  });

  return (
    <>
      {dev ? (
        <>
          <PerspectiveCamera
            makeDefault={!preview}
            fov={initialFov}
            position={initialCamPos}
          />
          <HeroCamera
            camera={config.camera}
            makeDefault={preview}
            showHelper={!preview}
            centerProgress={centerProgress}
          />
          {!preview && <OrbitControls makeDefault />}
          <gridHelper args={[10, 20, "#444444", "#222222"]} />
          <axesHelper args={[1.5]} />
          {activeObject && (
            <TransformControls
              object={activeObject}
              mode={gizmoMode}
              onObjectChange={() =>
                activeObject && onGizmoChange?.(editTarget, activeObject)
              }
            />
          )}
        </>
      ) : (
        <PerspectiveCamera makeDefault fov={initialFov} position={initialCamPos} />
      )}

      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />

      <Model ref={carRef} url={MODELS.car} material={material} />
      <Model ref={mountRef} url={MODELS.mount} material={material} />
    </>
  );
}
