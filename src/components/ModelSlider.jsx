import { Suspense, useMemo, useLayoutEffect, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, CameraControls } from "@react-three/drei";
import { useLang } from "../i18n.jsx";
import * as THREE from "three";

const models = [
  "/models/planetary_gear.glb",
  "/models/sci-fi-vase.glb",
  "/models/phone-stand.glb",
  "/models/gearbox.glb",
];

models.forEach((model) => useGLTF.preload(model));

function Viewer({ path }) {
  const { scene } = useGLTF(path);

  const model = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(model);

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    const maxSize = Math.max(size.x, size.y, size.z);

    const scale = 2.4 / maxSize;

    model.scale.setScalar(scale);

    model.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(model);

    model.position.y -= scaledBox.min.y;

    model.updateMatrixWorld(true);

    const finalBox = new THREE.Box3().setFromObject(model);

    const finalCenter = finalBox.getCenter(new THREE.Vector3());

    model.position.x -= finalCenter.x;
    model.position.z -= finalCenter.z;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.side = THREE.DoubleSide;
      }
    });
  }, [model]);

  return <primitive object={model} />;
}

function Scene({ path }) {
  const controlsRef = useRef();

  useEffect(() => {
    if (!controlsRef.current) return;

    controlsRef.current.setLookAt(0, 1.2, 4, 0, 0.8, 0, true);
    controlsRef.current.setTarget(0, 0.8, 0, false);
    controlsRef.current.update();
  }, [path]);

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
      <directionalLight position={[-5, 4, -5]} intensity={1} />
      <hemisphereLight intensity={0.8} />

      <Suspense fallback={null}>
        <Viewer path={path} />
        <Environment preset="city" />
      </Suspense>

      <CameraControls
        ref={controlsRef}
        makeDefault
        smoothTime={0.25}
        minDistance={2}
        maxDistance={8}
        truckSpeed={0}
        azimuthRotateSpeed={1}
        polarRotateSpeed={1}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function ModelSlider({ index, onChange }) {
  const { t } = useLang();
  const { title, category } = t.slider.slides[index];

  const prev = () => {
    onChange((index - 1 + models.length) % models.length);
  };

  const next = () => {
    onChange((index + 1) % models.length);
  };

  return (
    <div className="model-slider">
      <div className="model-slider__stage">
        <Canvas
          camera={{
            position: [0, 1.5, 4],
            fov: 45,
          }}
          shadows
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
              className={`model-slider__dot${
                i === index ? " model-slider__dot--active" : ""
              }`}
              onClick={() => onChange(i)}
              aria-label={slide.title}
              aria-selected={i === index}
              role="tab"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
