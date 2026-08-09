import Reveal from "./Reveal.jsx";

const STEPS = [
  {
    n: "01",
    title: "Show GoLore a photo",
    body: "A landmark, a street, a plate of food, a sign you can't read yet. Drop it in, or add a hint if you already know something.",
  },
  {
    n: "02",
    title: "It reads the place",
    body: "GoLore looks at what's in the frame and works out where you likely are, and what makes that spot worth knowing.",
  },
  {
    n: "03",
    title: "You get the full story",
    body: "History, customs, etiquette, useful phrases, local dishes, things to do and to avoid — organized into one guide.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section-pad py-24 sm:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="eyebrow">How it works</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 max-w-xl text-balance">
            From a single photograph to a place you understand.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 mt-16">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.1 + i * 0.1}>
              <div className="pr-4">
                <span className="font-display italic text-3xl text-signal">
                  {s.n}
                </span>
                <h3 className="font-display text-2xl mt-4 mb-3 tracking-tightish">
                  {s.title}
                </h3>
                <p className="text-ink2 leading-relaxed text-[15px]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
