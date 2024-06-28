import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import skyScene from "../assets/3d/green_sky.glb";
import { useFrame } from "@react-three/fiber";

const BlueSky = ({ isRotating }) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.35 * delta;
    }
  });
  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default BlueSky;
