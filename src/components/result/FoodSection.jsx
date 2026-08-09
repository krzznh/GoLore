import Reveal from "../Reveal.jsx";
import SafeImage from "../SafeImage.jsx";

export default function FoodSection({ localFoods, foodImages }) {
  if (!localFoods || localFoods.length === 0) return null;

  return (
    <section id="food" className="section-pad py-24 sm:py-28 border-t border-line bg-paper2">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="eyebrow">Chapter Four</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 mb-12">
            Eat like a local
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localFoods.map((food, i) => {
            const img = foodImages?.[i % (foodImages?.length || 1)];
            return (
              <Reveal key={i} delay={0.05 * i}>
                <div className="rounded-xl2 overflow-hidden bg-surface border border-line group">
                  <SafeImage
                    src={img?.image}
                    alt={img?.alt || food}
                    className="aspect-[4/3] overflow-hidden"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <p className="font-display text-lg tracking-tightish">{food}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
