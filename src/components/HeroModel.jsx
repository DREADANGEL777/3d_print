import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Center, ContactShadows, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as THREE from "three"

useGLTF.preload("/models/hero.glb")

function Model() {
  const group = useRef()

  const { scene } = useGLTF("/models/hero.glb")

  useEffect(() => {
    // scene.traverse((child) => {
    //   if (!child.isMesh) return

    //   child.castShadow = true
    //   child.receiveShadow = true

    //   child.material = new THREE.MeshPhysicalMaterial({
    //     color: "#f6c33b",

    //     metalness: 0.45,
    //     roughness: 0.42,

    //     clearcoat: 0.55,
    //     clearcoatRoughness: 0.18,

    //     envMapIntensity: 1.3,
    //   })
    // })
  }, [scene])

  useFrame((state, delta) => {
    if (!group.current) return

    group.current.rotation.y += delta * 0.45

    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05

    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={1.55} />
      </Center>
    </group>
  )
}

export default function HeroModel() {
  return (
    <Canvas
      
      dpr={[1, 2]}
      camera={{
        position: [0, 0.3, 4],
        fov: 32,
      }}
    >

      <ambientLight intensity={1.15} />

      <directionalLight
        position={[5, 6, 5]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight position={[-5, 4, -5]} intensity={1.2} />

      {/* <pointLight position={[0, 2, 2]} intensity={18} color="#ffd54f" /> */}

      {/* <Environment preset="studio" /> */}

      <Model />

      <ContactShadows position={[0, -1.15, 0]} opacity={0.45} blur={2.5} scale={8} far={4} />
    </Canvas>
  )
}
