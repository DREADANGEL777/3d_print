import heroModel from "../assets/hero-model.png";

export default function HeroModel() {
  return (
    <div className="hero-model-image">
      <img src={heroModel} alt="Hero Model" draggable={false} />
    </div>
  );
}