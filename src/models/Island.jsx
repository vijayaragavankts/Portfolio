import React, { useEffect, useRef } from "react";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
import IslandScene from "../assets/3d/captain.glb";

function Island({ isRotating, setIsRotating, setCurrentStage, ...props }) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials, animations } = useGLTF(IslandScene);

  const lastX = useRef(0);

  const rotationSpeed = useRef(0);

  const dampingFactor = 0.95;

  const handleTouchStart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches[0].clientX;

    lastX.current = clientX;
  };

  const handleTouchEnd = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (isRotating) {
      const clientX = event.touches[0].clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.1 * Math.PI;
    }
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches.clientX : event.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) {
        setIsRotating(true);
      }
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) {
        setIsRotating(true);
      }
      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("pointerdown", handleMouseDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("pointerdown", handleMouseDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handlePointerMove,
    handlePointerUp,
    gl,
  ]);
  const { actions } = useAnimations(animations, islandRef);
  useEffect(() => {
    actions["Take 001"].play();
  });

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;
      const normalization =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalization >= 0 && normalization <= 1:
          setCurrentStage(1);
          break;
        case normalization >= 1.85 && normalization <= 3:
          setCurrentStage(4);
          break;
        case normalization >= 3.5 && normalization <= 4.75:
          setCurrentStage(3);
          break;
        case normalization >= 5.55 && normalization <= 6.75:
          setCurrentStage(2);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <group
      ref={islandRef}
      {...props}
      scale={props.screenScale}
      position={props.position}
    >
      {/* <a.group position={[-42.281, -1.801, 11.779]} rotation={[0, -0.185, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Bridge_Mat001_0.geometry}
            material={materials["SF_Bridge_Mat.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Roof_Final_0.geometry}
            material={materials.SF_Roof_Final}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Roof_Final_0_1.geometry}
            material={materials.SF_Roof_Final}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Roof_Final_0_2.geometry}
            material={materials.SF_Roof_Final}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Roof_Final_0_3.geometry}
            material={materials.SF_Roof_Final}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Rocks_Mat_0.geometry}
            material={materials.SF_Rocks_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Windows_Mat_0.geometry}
            material={materials.SF_Windows_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Windows_Mat_0_1.geometry}
            material={materials.SF_Windows_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Windows_Mat_0_2.geometry}
            material={materials.SF_Windows_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Bush_Mat_0.geometry}
            material={materials.SF_Bush_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_TreeWood_Mat_0.geometry}
            material={materials.SF_TreeWood_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_TreeWood_Mat_0_1.geometry}
            material={materials.SF_TreeWood_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_TreeLeaf_Mat_0.geometry}
            material={materials.SF_TreeLeaf_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_HouseSupport_Mat_0.geometry}
            material={materials.SF_HouseSupport_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_HouseJoins_Mat_0.geometry}
            material={materials.SF_HouseJoins_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Chimney_Mat_0.geometry}
            material={materials.SF_Chimney_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_CutRock_Mat_0.geometry}
            material={materials.SF_CutRock_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Stalagmites_Mat_0.geometry}
            material={materials.SF_Stalagmites_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_WoodTex_Mat_0.geometry}
            material={materials.SF_WoodTex_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_PlasterTex_Mat_0.geometry}
            material={materials.SF_PlasterTex_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_StoneBrick_Mat_0.geometry}
            material={materials.SF_StoneBrick_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Island_Mat_0.geometry}
            material={materials.SF_Island_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_LampGlass_Mat_0.geometry}
            material={materials.SF_LampGlass_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Lamp_Mat_0.geometry}
            material={materials.SF_Lamp_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Candle_Mat_0.geometry}
            material={materials.SF_Candle_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Grass_Mat_0.geometry}
            material={materials.SF_Grass_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Rail_Mat_0.geometry}
            material={materials.SF_Rail_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0.geometry}
            material={materials.SF_GrassCards_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_1.geometry}
            material={materials.SF_GrassCards_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_2.geometry}
            material={materials.SF_GrassCards_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_3.geometry}
            material={materials.SF_GrassCards_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Sack_Mat_0.geometry}
            material={materials.SF_Sack_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_MineCart_Mat_0.geometry}
            material={materials.SF_MineCart_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Bridge_Mat_0.geometry}
            material={materials.SF_Bridge_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Door_Mat_0.geometry}
            material={materials.SF_Door_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Water_Mat_0.geometry}
            material={materials.SF_Water_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_Final_Water001_0.geometry}
            material={materials["Final_Water.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_Final_Rocks2_Mat_0.geometry}
            material={materials.Final_Rocks2_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_Black_0.geometry}
            material={materials.Black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_ButterFly_Mat_0.geometry}
            material={materials.SF_ButterFly_Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Final_Bridge1_SF_Lillypad_Mat_0.geometry}
            material={materials.SF_Lillypad_Mat}
          />
        </a.group> */}
      {/* </group> */}

      {/* New Island */}

      {/* <group position={[-7.738, 0, -87.926]} scale={1.127}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface21_T_Atlas_0.geometry}
          material={materials.T_Atlas}
          position={[0, 107.134, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface119_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <group position={[355.839, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface32_T_Atlas_0.geometry}
          material={materials.T_Atlas}
          position={[0, 48.486, 0]}
        />
      </group>
      <group
        position={[-64.193, 208.51, -421.875]}
        scale={[0.324, 0.679, 0.324]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder4_T_Atlas_0.geometry}
          material={materials.T_Atlas}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder4_lambert1_0.geometry}
          material={materials.lambert1}
        />
      </group>
      <group
        position={[111.861, 210.427, -124.833]}
        rotation={[0, -Math.PI / 3, 0]}
        scale={[0.324, 0.679, 0.324]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder5_T_Atlas_0.geometry}
          material={materials.T_Atlas}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder5_lambert1_0.geometry}
          material={materials.lambert1}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface2_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface3_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface4_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface5_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface6_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface7_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface43_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube6_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[203.351, 123.243, -202.329]}
        rotation={[0, 0.262, 0]}
        scale={1.084}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube8_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[-168.605, 161.096, 25.185]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube10_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[160.554, 50.634, 345.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface13_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[16.859, 29.763, -9.108]}
        scale={1.124}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pSphere1_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[344.509, 48.486, 120.497]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface37_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface44_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface45_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface46_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface47_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface53_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <group position={[0, 19.571, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface81_T_Atlas_0.geometry}
          material={materials.T_Atlas}
          position={[0, 28.914, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface77_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface79_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface80_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface42_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface49_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface64_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface75_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 48.486, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface95_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[0, 28.914, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube25_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[160.221, 400.875, 396.048]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube28_T_Atlas_0.geometry}
        material={materials.T_Atlas}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder7_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[140.411, 126.255, -6.466]}
        scale={0.517}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder8_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[-4.447, 80.608, -315.619]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface98_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[-86.525, -9.993, -85.476]}
        rotation={[0, Math.PI / 6, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube30_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[7.132, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane44_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[83.139, 136.653, -151.033]}
        rotation={[0, Math.PI / 3, 0]}
        scale={1.227}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder9_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[60.114, 130.156, -150.256]}
        scale={0.394}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder10_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[47.812, 130.156, -185.747]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={0.394}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder11_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[45.341, 130.156, -152.61]}
        rotation={[-1.391, -0.177, -0.769]}
        scale={0.305}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder12_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[53.08, 130.156, -198.319]}
        rotation={[-1.319, -0.009, -0.036]}
        scale={0.305}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder13_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[68.918, 128.938, -186.887]}
        rotation={[0, -0.873, 0]}
        scale={0.457}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder14_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[19.912, 130.156, -171.743]}
        rotation={[-1.347, 0.117, 0.476]}
        scale={0.305}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder15_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[21.181, 130.156, -150.678]}
        rotation={[-1.369, 0.152, 0.636]}
        scale={0.305}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane47_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[163.181, -131.476, -282.33]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultBrush1Main_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[56.286, 39.202, 93.095]}
        rotation={[0, -0.074, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultBrush4Main_T_Atlas_0.geometry}
        material={materials.T_Atlas}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface101_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[253.835, -83.96, 192.015]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface111_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[194.412, -176.753, 157.314]}
        rotation={[0.371, -0.008, 0.074]}
        scale={1.097}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface112_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-115.532, -210.173, 104.679]}
        rotation={[0, -1.336, 0]}
        scale={0.763}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface113_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-269.915, -146.133, -68.435]}
        rotation={[-Math.PI, 0.289, -Math.PI]}
        scale={0.574}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface114_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[311.523, -200.986, 159.469]}
        rotation={[0.508, 0.66, -0.506]}
        scale={0.61}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface115_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-943.198, -236.752, 574.947]}
        rotation={[-Math.PI, -1.351, -Math.PI]}
        scale={1.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface118_T_Atlas_0.geometry}
        material={materials.T_Atlas}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultBrush5Main_T_Atlas_0.geometry}
        material={materials.T_Atlas}
        position={[-297.559, -140.67, 363.676]}
        rotation={[0, -1.309, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane48_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[139.173, 60.454, 284.835]}
        rotation={[0.252, -0.618, 0.419]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane49_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[188.468, 75.95, 401.685]}
        rotation={[0.32, -0.879, 0.548]}
        scale={2.214}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane50_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[98.07, 52.998, 239.2]}
        rotation={[0.248, 0.101, 0.185]}
        scale={0.356}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane51_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[181.041, 53.626, 214.399]}
        rotation={[0.248, 0.101, 0.185]}
        scale={0.356}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane52_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[253.92, 52.973, 228.24]}
        rotation={[0.291, 0.365, 0.091]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane53_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[251.406, 52.657, 141.726]}
        rotation={[0.294, 0.378, 0.086]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane54_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[206.906, 55.634, 143.271]}
        rotation={[0.624, 0.969, -0.335]}
        scale={0.49}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane55_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[229.35, 52.381, 125.547]}
        rotation={[0.624, 0.969, -0.335]}
        scale={0.392}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane56_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[232.539, 63.148, 168.647]}
        rotation={[0.436, -1.069, 0.707]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane57_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[197.304, 61.36, 346.807]}
        rotation={[0.436, -1.069, 0.707]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane58_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[341.531, 59.169, 138.98]}
        rotation={[0.32, 0.48, 0.042]}
        scale={1.445}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane59_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[71.287, 55.03, 258.018]}
        rotation={[0.341, 0.545, 0.012]}
        scale={0.655}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane60_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-129.219, 73.709, 293.839]}
        rotation={[2.495, -0.927, 3.005]}
        scale={1.702}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane61_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[11.385, 49.699, 192.272]}
        rotation={[1.691, 1.188, -1.466]}
        scale={1.506}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane64_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[145.761, 0.188, 150.107]}
        rotation={[-0.071, -1.082, 0.033]}
        scale={0.656}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane65_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-43.574, 55.779, 240.596]}
        rotation={[-2.894, 1.451, 3.043]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane66_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-10.089, 51.976, 291.669]}
        rotation={[0.624, 0.969, -0.335]}
        scale={0.49}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane67_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[68.229, 65.112, 270.818]}
        rotation={[0.723, -1.247, 1.036]}
        scale={0.796}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane81_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-568.888, -24.685, 33.072]}
        rotation={[-Math.PI, -0.634, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane85_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[102.478, -11.6, -374.801]}
        rotation={[0, 1.042, 0]}
        scale={1.227}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane86_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-272.105, 64.63, 82.716]}
        rotation={[0.436, -1.069, 0.707]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane87_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-262.503, 58.905, -120.82]}
        rotation={[0.624, 0.969, -0.335]}
        scale={0.49}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane88_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-218.002, 55.927, -122.365]}
        rotation={[0.294, 0.378, 0.086]}
        scale={1.056}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane93_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-311.345, 0, 585.379]}
        rotation={[-Math.PI, -1.459, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane100_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[443.901, -0.934, 119.583]}
        rotation={[0, 0.904, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane103_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[-37.366, 0, -110.662]}
        rotation={[0, -0.372, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane104_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[299.183, 53.657, -378.104]}
        rotation={[0.32, 0.48, 0.042]}
        scale={1.64}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane105_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[136.942, -2.555, -619.118]}
        rotation={[0, 0.802, 0]}
        scale={0.786}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane106_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[17.758, 34.577, -203.168]}
        rotation={[0.352, -0.305, 0.039]}
        scale={1.445}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane107_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[22.153, 55.634, -282.297]}
        rotation={[0.624, 0.969, -0.335]}
        scale={0.49}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pPlane108_T_Leaves_0.geometry}
        material={materials.T_Leaves}
        position={[66.654, 52.657, -283.842]}
        rotation={[0.294, 0.378, 0.086]}
        scale={1.056}
      /> */}

      {/* new character */}
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="1ace5d8c8f814ac49dae14ad8119910ffbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Material_801}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="Object005" />
                  <group
                    name="Object007"
                    position={[3.06, 12.777, 4.111]}
                    rotation={[-1.26, -0.783, 0.721]}
                  >
                    <group
                      name="Object_45"
                      position={[-12.275, 0.715, -11.762]}
                    >
                      <mesh
                        name="Object007_Material_#801_0"
                        castShadow
                        receiveShadow
                        geometry={nodes["Object007_Material_#801_0"].geometry}
                        material={materials.Material_801}
                      />
                    </group>
                  </group>
                  <group
                    name="xX"
                    position={[-2.797, 9.664, 215.69]}
                    rotation={[-1.307, -0.611, -1.369]}
                    scale={0.745}
                  >
                    <group name="pCube5" scale={0.316}>
                      <mesh
                        name="pCube5_axe_Strap3_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.pCube5_axe_Strap3_0.geometry}
                        material={materials.axe_Strap3}
                      />
                    </group>
                    <group name="polySurface65" scale={0.316}>
                      <mesh
                        name="polySurface65_axe_Pattern3_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface65_axe_Pattern3_0.geometry}
                        material={materials.axe_Pattern3}
                      />
                    </group>
                    <group name="polySurface462" scale={0.316}>
                      <mesh
                        name="polySurface462_axe_Hammer3_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface462_axe_Hammer3_0.geometry}
                        material={materials.axe_Hammer3}
                      />
                    </group>
                    <group name="polySurface466" scale={0.316}>
                      <mesh
                        name="polySurface466_axe_Top3_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface466_axe_Top3_0.geometry}
                        material={materials.axe_Top3}
                      />
                    </group>
                    <group name="polySurface2" scale={0.316}>
                      <mesh
                        name="polySurface2_axe_Handle2_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface2_axe_Handle2_0.geometry}
                        material={materials.axe_Handle2}
                      />
                    </group>
                    <group name="polySurface77" scale={0.316}>
                      <mesh
                        name="polySurface77_axe_Tri3_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface77_axe_Tri3_0.geometry}
                        material={materials.axe_Tri3}
                      />
                    </group>
                    <group name="group2" scale={0.316}>
                      <mesh
                        name="group2_axe_Hilt3_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.group2_axe_Hilt3_0.geometry}
                        material={materials.axe_Hilt3}
                      />
                    </group>
                  </group>
                  <group
                    name="PhysCamera001"
                    position={[-68.109, 11.119, 51.994]}
                    rotation={[0.077, -0.958, 0.063]}
                  />
                  <group
                    name="PhysCamera001Target"
                    position={[0.641, 14.829, 3.804]}
                    rotation={[0.061, -0.758, 0.042]}
                  />
                  <group
                    name="ChamferCyl001"
                    position={[0, -2.296, 0.964]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="ChamferCyl001_Material_#802_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ChamferCyl001_Material_#802_0"].geometry}
                      material={materials.Material_802}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Island;
