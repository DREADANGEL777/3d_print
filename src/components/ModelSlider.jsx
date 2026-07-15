import { Suspense, useMemo, useState, useLayoutEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment, useGLTF, CameraControls } from "@react-three/drei"
import { useLang } from "../i18n.jsx"
import * as THREE from "three"

const models = [
  "/models/planetary-gear.glb",
  "/models/articulated-dragon.glb",
  "/models/phone-stand.glb",
  "/models/gearbox.glb",
]
const modelSettings = {
  "/models/planetary-gear.glb": {
    rotation: [0, 0, 0],
    position: [0, 0, 0],
  },

  "/models/articulated-dragon.glb": {
    rotation: [0, 0, 0],
    position: [0, 0, 0],
  },

  "/models/phone-stand.glb": {
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.8, 0],
  },

  "/models/gearbox.glb": {
    rotation: [0, 0, 0],
    position: [0, -0.7, 0],
  },
}

models.forEach((model) => {
  useGLTF.preload(model)
})

function Viewer({ path }) {
  const { scene } = useGLTF(path)

  const model = useMemo(() => scene.clone(true), [scene])

  useLayoutEffect(() => {
    if (!model) return

    model.rotation.set(0, 0, 0)

    model.updateMatrixWorld(true)

    let box = new THREE.Box3().setFromObject(model)

    let size = box.getSize(new THREE.Vector3())

    let center = box.getCenter(new THREE.Vector3())

    model.position.x -= center.x
    model.position.z -= center.z

    const maxSize = Math.max(size.x, size.y, size.z)

    const scale = 2.3 / maxSize

    model.scale.setScalar(scale)

    model.updateMatrixWorld(true)

    box = new THREE.Box3().setFromObject(model)

    center = box.getCenter(new THREE.Vector3())

    model.position.y -= box.min.y


    box = new THREE.Box3().setFromObject(model)

    center = box.getCenter(new THREE.Vector3())

    model.position.x -= center.x
    model.position.z -= center.z

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        if (child.material) {
          child.material.side = THREE.DoubleSide
        }
      }
    })
  }, [model])

  return <primitive object={model} />
}

function Scene({ path }) {
  const controlsRef = useRef()

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight position={[5, 8, 5]} intensity={2.5} />

      <directionalLight position={[-5, 4, -5]} intensity={1} />

      <hemisphereLight intensity={0.8} />

      <Suspense fallback={null}>
        <Viewer path={path} />

        <Environment preset="city" />
      </Suspense>

      <CameraControls makeDefault smoothTime={0.25} distance={4} minDistance={2} maxDistance={8} />
    </>
  )
}

export default function ModelSlider() {
  const [index, setIndex] = useState(0)

  const { t } = useLang()

  const { title, category } = t.slider.slides[index]

  const prev = () => {
    setIndex((i) => (i - 1 + models.length) % models.length)
  }

  const next = () => {
    setIndex((i) => (i + 1) % models.length)
  }

  return (
    <div className="model-slider">
      <div className="model-slider__stage">
        <Canvas
          camera={{
            position: [0, 1, 4],
            fov: 45,
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#111318"]} />

          <Scene path={models[index]} />
        </Canvas>

        <button
          type="button"
          className="model-slider__arrow model-slider__arrow--prev"
          onClick={prev}
          aria-label={t.slider.prev}
        >
          ‹
        </button>

        <button
          type="button"
          className="model-slider__arrow model-slider__arrow--next"
          onClick={next}
          aria-label={t.slider.next}
        >
          ›
        </button>

        <span className="model-slider__hint">{t.slider.hint}</span>
      </div>

      <div className="model-slider__caption">
        <div>
          <span className="model-slider__category">{category}</span>

          <h3 className="model-slider__title">{title}</h3>
        </div>

        <div className="model-slider__dots" role="tablist">
          {t.slider.slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              className={`model-slider__dot${i === index ? " model-slider__dot--active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={slide.title}
              aria-selected={i === index}
              role="tab"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
