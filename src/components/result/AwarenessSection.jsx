import Reveal from "../Reveal.jsx";

export default function AwarenessSection({ thingsToAvoid, safetyConsiderations }) {
  const hasAny = thingsToAvoid?.length || safetyConsiderations?.length;
  if (!hasAny) return null;

  return (
    <section id="awareness" className="section-pad py-24 sm:py-28 border-t border-line bg-ink text-paper">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-14">
        {thingsToAvoid?.length > 0 && (
          <div>
            <Reveal>
              <span className="eyebrow text-paper/50">Worth knowing</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tightish mt-3 mb-8">
                Things to avoid
              </h2>
            </Reveal>
            <ul className="space-y-4">
              {thingsToAvoid.map((item, i) => (
                <Reveal key={i} delay={0.04 * i} as="li" className="flex gap-3">
                  <span className="text-clay mt-1 shrink-0">&#9679;</span>
                  <span className="text-paper/80 leading-relaxed">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {safetyConsiderations?.length > 0 && (
          <div>
            <Reveal>
              <span className="eyebrow text-paper/50">Stay aware</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tightish mt-3 mb-8">
                Safety notes
              </h2>
            </Reveal>
            <ul className="space-y-4 mb-6">
              {safetyConsiderations.map((item, i) => (
                <Reveal key={i} delay={0.04 * i} as="li" className="flex gap-3">
                  <span className="text-signal2 mt-1 shrink-0">&#9679;</span>
                  <span className="text-paper/80 leading-relaxed">{item}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1}>
              <p className="text-xs text-paper/40 leading-relaxed">
                General guidance only — always check current advisories from
                official local authorities before you travel.
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
