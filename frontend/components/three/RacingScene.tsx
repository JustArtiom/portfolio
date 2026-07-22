import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SceneContents from "./SceneContents";
import { defaultSceneConfig } from "./sceneConfig";

interface Props {
  /** 0–100: car flies in and rotates into place. */
  carProgress: number;
  /** 0–100: sensor mount slides onto the car. */
  mountProgress: number;
  /** 0–100: car + mount move to the centered, camera-facing pose. */
  centerProgress: number;
  /** When false, the render loop stops entirely (scene is off-screen). */
  active?: boolean;
  /** Fires once the models have loaded. */
  onReady?: () => void;
}

/**
 * Full-size 3D stage. Fills its parent container; the caller controls size and
 * placement. When `active` is false the WebGL loop is halted so it does no GPU
 * work while scrolled out of view.
 */
export default function RacingScene({
  carProgress,
  mountProgress,
  centerProgress,
  active = true,
  onReady,
}: Props) {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents
            carProgress={carProgress}
            mountProgress={mountProgress}
            centerProgress={centerProgress}
            config={defaultSceneConfig}
            materialProps={defaultSceneConfig.material}
            onReady={onReady}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
