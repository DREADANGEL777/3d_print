import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

useGLTF.preload("/models/leopard.glb");

function Model() {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/leopard.glb");

  const { actions } = useAnimations(animations, group);

  const model = scene;

  useEffect(() => {
    console.log(
      "Animations:",
      animations.map((a) => a.name),
    );
    console.log("Actions:", actions);

    const animationName = animations[0]?.name;

    if (animationName && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }

    return () => {
      if (animationName && actions[animationName]) {
        actions[animationName].fadeOut(0.5);
      }
    };
  }, [actions, animations]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    const maxSize = Math.max(size.x, size.y, size.z);

    if (maxSize > 0) {
      const scale = 2 / maxSize;
      model.scale.setScalar(scale);
    }

    const newBox = new THREE.Box3().setFromObject(model);

    model.position.y -= newBox.min.y;

    model.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material.envMapIntensity = 1.2;
      }
    });
  }, [model]);

  useFrame((state) => {
    if (!group.current) return;

    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
  });
  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

export default function HeroModel() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, 1.8, 6],
        fov: 40,
      }}
    >
      <ambientLight intensity={1.5} />

      <directionalLight position={[5, 8, 5]} intensity={3} castShadow />

      <directionalLight position={[-5, 5, -5]} intensity={1} />

      <Environment preset="studio" />

      <Model />

      <ContactShadows
        position={[0, 0, 0]}
        scale={8}
        blur={2.5}
        opacity={0.45}
        far={4}
      />
    </Canvas>
  );
}
