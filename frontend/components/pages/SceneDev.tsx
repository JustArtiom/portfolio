import { Suspense, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { button, Leva, useControls } from "leva";
import * as THREE from "three";
import SceneContents, {
  type CameraState,
  type EditTarget,
} from "@/components/three/SceneContents";
import {
  defaultSceneConfig,
  readTransform,
  type SceneConfig,
} from "@/components/three/sceneConfig";

const TARGETS: EditTarget[] = [
  "none",
  "car.start",
  "car.end",
  "car.center",
  "mount.start",
  "mount.end",
];

export default function SceneDev() {
  const [config, setConfig] = useState<SceneConfig>(() =>
    structuredClone(defaultSceneConfig)
  );
  const configRef = useRef(config);
  configRef.current = config;
  const cameraGetter = useRef<() => CameraState>(undefined);
  const goToHero = useRef<() => void>(undefined);

  const material = useControls("material", {
    color: defaultSceneConfig.material.color,
    roughness: { value: defaultSceneConfig.material.roughness, min: 0, max: 1, step: 0.01 },
    metalness: { value: defaultSceneConfig.material.metalness, min: 0, max: 1, step: 0.01 },
  });

  const edit = useControls("edit", {
    target: { value: "none", options: TARGETS },
    mode: { value: "translate", options: ["translate", "rotate", "scale"] },
    carProgress: { value: 0, min: 0, max: 100, step: 1 },
    mountProgress: { value: 0, min: 0, max: 100, step: 1 },
    centerProgress: { value: 0, min: 0, max: 100, step: 1 },
  });

  const captureView = useCallback(() => {
    const c = cameraGetter.current?.();
    if (!c) return;
    setConfig((prev) => {
      const next = structuredClone(prev);
      next.camera.position = c.position;
      next.camera.target = c.target;
      return next;
    });
  }, []);

  const cam = useControls("camera", {
    preview: false,
    fov: { value: defaultSceneConfig.camera.fov, min: 20, max: 80, step: 1 },
    centerDolly: {
      value: defaultSceneConfig.camera.centerDolly,
      min: 0,
      max: 10,
      step: 0.1,
    },
    "capture view → hero": button(() => captureView()),
    "go to camera view": button(() => goToHero.current?.()),
  });

  const materialRef = useRef(material);
  materialRef.current = material;
  const fovRef = useRef(cam.fov);
  fovRef.current = cam.fov;
  const dollyRef = useRef(cam.centerDolly);
  dollyRef.current = cam.centerDolly;

  const exportConfig = useCallback(() => {
    const out: SceneConfig = {
      ...configRef.current,
      camera: {
        ...configRef.current.camera,
        fov: fovRef.current,
        centerDolly: dollyRef.current,
      },
      material: { ...materialRef.current },
    };
    const text = JSON.stringify(out, null, 2);
    // eslint-disable-next-line no-console
    console.log("=== SCENE CONFIG ===\n" + text);
    navigator.clipboard?.writeText(text).catch(() => {});
  }, []);

  useControls("export", {
    "copy config → clipboard": button(() => exportConfig()),
  });

  const handleGizmo = useCallback(
    (target: EditTarget, obj: THREE.Object3D) => {
      if (target === "none") return;
      const [group, key] = target.split(".") as [
        "car" | "mount",
        "start" | "end",
      ];
      setConfig((prev) => {
        const next = structuredClone(prev);
        next[group][key] = readTransform(obj);
        return next;
      });
    },
    []
  );

  const liveConfig: SceneConfig = {
    ...config,
    camera: { ...config.camera, fov: cam.fov, centerDolly: cam.centerDolly },
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#141414]">
      <Leva collapsed={false} />
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#141414"]} />
        <Suspense fallback={null}>
          <SceneContents
            dev
            carProgress={edit.carProgress}
            mountProgress={edit.mountProgress}
            centerProgress={edit.centerProgress}
            config={liveConfig}
            materialProps={material}
            editTarget={edit.target as EditTarget}
            gizmoMode={edit.mode as "translate" | "rotate" | "scale"}
            preview={cam.preview}
            onGizmoChange={handleGizmo}
            registerCamera={(fn) => (cameraGetter.current = fn)}
            registerGoToHero={(fn) => (goToHero.current = fn)}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-3 left-3 max-w-md font-mono text-[11px] leading-relaxed text-white/70 bg-black/50 rounded-lg p-3 pointer-events-none">
        <div className="text-white/90 mb-1">scene editor</div>
        <b>camera:</b> the wireframe box = where the runtime camera looks. Orbit
        to frame it, hit <b>capture view → hero</b>, then toggle{" "}
        <b>preview</b> to see the exact shot.
        <br />
        <b>models:</b> pick <b>edit ▸ target</b>, set <b>mode</b>, drag the
        gizmo. Set target = none to orbit + scrub <b>carProgress</b> /{" "}
        <b>mountProgress</b> independently.
        <br />
        Done? <b>copy config → clipboard</b> and paste it back to me.
      </div>
    </div>
  );
}
