import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MODELS } from "./sceneConfig";

useGLTF.preload(MODELS.car);
useGLTF.preload(MODELS.mount);

interface Props {
  url: string;
  material: THREE.Material;
}

/**
 * Loads a GLB, clones it, recomputes vertex normals (the models were welded
 * with normals stripped so they could be decimated), and overrides every mesh
 * with a single shared gray material.
 */
const Model = forwardRef<THREE.Group, Props>(({ url, material }, ref) => {
  const { scene } = useGLTF(url);

  const cloned = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry = mesh.geometry.clone();
      mesh.geometry.computeVertexNormals();
      mesh.material = material;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    });
    return root;
  }, [scene, material]);

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
});

Model.displayName = "Model";
export default Model;
