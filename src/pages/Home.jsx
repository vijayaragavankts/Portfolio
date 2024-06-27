import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import time_audio from "../assets/captain.mp3";
import { music_off, music_on, soundoff, soundon } from "../assets/icons/index";
import { Environment } from "@react-three/drei";

const Home = () => {
  const audioRef = useRef(new Audio(time_audio));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustPlaneScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [0, -1.8, 0.8];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -5, -3];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.6, 0.6, 0.6];
      screenPosition = [0, -8.8, -25.4];
    } else {
      screenScale = [0.7, 0.7, 0.7];
      screenPosition = [0, -9, -26.5];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const [planeScale, PlanePosition] = adjustPlaneScreenSize();

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Environment preset="sunset" />

          {/* <Bird /> */}
          <Sky isRotating={isRotating} />

          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            position={islandPosition}
            screenScale={islandScale}
            rotation={[0.1, 0.2077, 0]}
            setCurrentStage={setCurrentStage}
            // receiveShadow
            // castShadow
          />

          {/* <Plane
            isRotating={isRotating}
            position={PlanePosition}
            scale={planeScale}
            rotation={[0, 20.1, 0]}
          /> */}
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="jukebox"
          onClick={() => setIsPlayingMusic((curr) => !curr)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
