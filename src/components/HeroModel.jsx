import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

useGLTF.preload("/models/hero-1.glb");

function Model() {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/hero-1.glb");
  const { actions } = useAnimations(animations, group);

  const model = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    if (!group.current) return;

    const box = new THREE.Box3().setFromObject(model);

    const size = box.getSize(new THREE.Vector3());

    const center = box.getCenter(new THREE.Vector3());

    const wrapper = new THREE.Group();

    wrapper.add(model);

    model.position.set(-center.x, -box.min.y, -center.z);

    const maxSize = Math.max(size.x, size.y, size.z);

    if (maxSize > 0) {
      wrapper.scale.setScalar(3.2 / maxSize);
    }

    group.current.clear();

    group.current.add(wrapper);

    wrapper.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [model]);

  useEffect(() => {
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

  useFrame((state) => {
    if (!group.current) return;

    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.1;
  });

  return <group ref={group} />;
}

export default function HeroModel() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, -6, 1.4],
        fov: 38,
      }}
      onCreated={({ camera }) => {
        camera.lookAt(new THREE.Vector3(0, 3, 0));
      }}
    >
      <ambientLight intensity={1.2} />

      <directionalLight position={[5, 10, 5]} intensity={3} castShadow />

      <directionalLight position={[-5, 5, -5]} intensity={1} />

      <Environment preset="studio" />

      <Model />

      <ContactShadows
        position={[0, 0, 0]}
        scale={8}
        blur={3}
        opacity={0.45}
        far={5}
      />
    </Canvas>
  );
}
