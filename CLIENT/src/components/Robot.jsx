import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Robot = () => {
  const group = useRef();
  const { scene } = useGLTF("./models/combat_robot.glb");

  // Track mouse movement
  useFrame(({ mouse }) => {
    if (group.current) {
      // Smoothly rotate head based on mouse position
      group.current.rotation.y = mouse.x * 0.8; // left-right
      group.current.rotation.x = -mouse.y * 0.5; // up-down
    }
  });

  return <primitive ref={group} object={scene} scale={0.3} position={[3, 0, 0]} />;
};

export default Robot;
