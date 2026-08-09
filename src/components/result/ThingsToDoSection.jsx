import Reveal from "../Reveal.jsx";

export default function ThingsToDoSection({ thingsToDo }) {
  if (!thingsToDo || thingsToDo.length === 0) return null;

  return (
    <section id="do" className="section-pad py-24 sm:py-28 border-t border-line">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="eyebrow">Chapter Five</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 mb-12">
            Things to do
          </h2>
        </Reveal>

        <ol className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {thingsToDo.map((item, i) => (
            <Reveal key={i} delay={0.04 * i} as="li" className="flex gap-4 items-baseline">
              <span className="font-display italic text-signal text-lg shrink-0 w-7">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-ink2 leading-relaxed">{item}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
