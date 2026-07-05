import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useLang } from '../i18n.jsx'

/* ---------- Матеріали ---------- */
const ACCENT = '#f5a623'
const DARK = '#3a4150'
const LIGHT = '#8b93a5'

/* ---------- 1. Решітка радіатора ---------- */
function GrilleModel() {
  const slats = [-0.6, -0.3, 0, 0.3, 0.6]
  return (
    <group>
      {/* рамка */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[3.2, 0.18, 0.3]} />
        <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[3.2, 0.18, 0.3]} />
        <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-1.51, 0, 0]}>
        <boxGeometry args={[0.18, 1.88, 0.3]} />
        <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.51, 0, 0]}>
        <boxGeometry args={[0.18, 1.88, 0.3]} />
        <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* ламелі */}
      {slats.map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[2.9, 0.09, 0.22]} />
          <meshStandardMaterial color={LIGHT} metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
      {/* емблема */}
      <mesh position={[0, 0, 0.22]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.7, 0.14, 0.08]} />
        <meshStandardMaterial color={ACCENT} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.22]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.7, 0.14, 0.08]} />
        <meshStandardMaterial color={ACCENT} metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  )
}

/* ---------- 2. Майстер-модель персонажа ---------- */
function FigureModel() {
  return (
    <group position={[0, -1.1, 0]}>
      {/* постамент */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1, 1.15, 0.25, 48]} />
        <meshStandardMaterial color={DARK} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* ноги */}
      <mesh position={[-0.28, 0.65, 0]}>
        <capsuleGeometry args={[0.16, 0.6, 8, 16]} />
        <meshStandardMaterial color={LIGHT} roughness={0.6} />
      </mesh>
      <mesh position={[0.28, 0.65, 0]}>
        <capsuleGeometry args={[0.16, 0.6, 8, 16]} />
        <meshStandardMaterial color={LIGHT} roughness={0.6} />
      </mesh>
      {/* тулуб */}
      <mesh position={[0, 1.45, 0]}>
        <capsuleGeometry args={[0.42, 0.7, 8, 24]} />
        <meshStandardMaterial color={LIGHT} roughness={0.6} />
      </mesh>
      {/* руки */}
      <mesh position={[-0.62, 1.5, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.13, 0.65, 8, 16]} />
        <meshStandardMaterial color={LIGHT} roughness={0.6} />
      </mesh>
      <mesh position={[0.62, 1.5, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.13, 0.65, 8, 16]} />
        <meshStandardMaterial color={LIGHT} roughness={0.6} />
      </mesh>
      {/* голова */}
      <mesh position={[0, 2.35, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={ACCENT} roughness={0.4} />
      </mesh>
    </group>
  )
}

/* ---------- 3. Форма для шоколаду ---------- */
function MoldModel() {
  const cells = []
  for (let x = -1; x <= 1; x++) {
    for (let z = 0; z <= 1; z++) {
      cells.push([x * 0.95, 0.28, z * 0.95 - 0.475])
    }
  }
  return (
    <group rotation={[0.15, 0, 0]}>
      {/* піддон */}
      <mesh>
        <boxGeometry args={[3.3, 0.45, 2.3]} />
        <meshStandardMaterial color={DARK} roughness={0.7} />
      </mesh>
      {/* заглиблення-цукерки */}
      {cells.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.36, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={ACCENT} roughness={0.35} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- 4. Нагорода / кубок ---------- */
function TrophyModel() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* база */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* ніжка */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 0.9, 32]} />
        <meshStandardMaterial color={ACCENT} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* чаша */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.75, 0.25, 1, 40]} />
        <meshStandardMaterial color={ACCENT} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* ручки */}
      <mesh position={[-0.85, 1.75, 0]} rotation={[0, 0, -0.2]}>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial color={ACCENT} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.85, 1.75, 0]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial color={ACCENT} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

/* ---------- Слайди: тексти беруться з перекладів (t.slider.slides) ---------- */
const models = [GrilleModel, FigureModel, MoldModel, TrophyModel]

export default function ModelSlider() {
  const [index, setIndex] = useState(0)
  const { t } = useLang()
  const { title, category } = t.slider.slides[index]
  const Model = models[index]

  const prev = () => setIndex((i) => (i - 1 + models.length) % models.length)
  const next = () => setIndex((i) => (i + 1) % models.length)

  return (
    <div className="model-slider">
      <div className="model-slider__stage">
        <Canvas key={index} camera={{ position: [0, 0.6, 5], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} />
          <pointLight position={[-4, 2, -3]} intensity={0.5} color={ACCENT} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2.2}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
          />
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
          {t.slider.slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`model-slider__dot${i === index ? ' model-slider__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={s.title}
              aria-selected={i === index}
              role="tab"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
