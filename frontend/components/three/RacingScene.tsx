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
  /** Fires once the models have loaded. */
  onReady?: () => void;
}

/**
 * Full-size 3D stage. Fills its parent container; the caller controls size and
 * placement. The progresses drive the car, mount, and centering stages.
 */
export default function RacingScene({
  carProgress,
  mountProgress,
  centerProgress,
  onReady,
}: Props) {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
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
