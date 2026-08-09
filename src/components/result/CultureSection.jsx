import Reveal from "../Reveal.jsx";

function Pills({ items }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item, i) => (
        <span
          key={i}
          className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink2"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function CultureSection({
  culturalSignificance,
  localCulture,
  localCustoms,
  etiquette,
}) {
  const hasAny =
    culturalSignificance ||
    localCulture?.length ||
    localCustoms?.length ||
    etiquette?.length;
  if (!hasAny) return null;

  return (
    <section id="culture" className="section-pad py-24 sm:py-28 border-t border-line bg-paper2">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="eyebrow">Chapter Two</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 mb-6">
            Culture &amp; customs
          </h2>
        </Reveal>

        {culturalSignificance && (
          <Reveal delay={0.1}>
            <p className="text-ink2 leading-relaxed text-[17px] max-w-2xl mb-12">
              {culturalSignificance}
            </p>
          </Reveal>
        )}

        <div className="grid sm:grid-cols-2 gap-10">
          {localCulture?.length > 0 && (
            <Reveal delay={0.15}>
              <h3 className="font-display text-xl mb-4">Local culture</h3>
              <Pills items={localCulture} />
            </Reveal>
          )}
          {localCustoms?.length > 0 && (
            <Reveal delay={0.2}>
              <h3 className="font-display text-xl mb-4">Local customs</h3>
              <Pills items={localCustoms} />
            </Reveal>
          )}
        </div>

        {etiquette?.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h3 className="font-display text-xl mb-6">Etiquette &amp; social norms</h3>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {etiquette.map((rule, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <div className="rounded-xl2 bg-surface border border-line p-6 h-full">
                    <p className="font-medium text-ink mb-2">{rule.rule}</p>
                    <p className="text-sm text-drift leading-relaxed">
                      {rule.explanation}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
