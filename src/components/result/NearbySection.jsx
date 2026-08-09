import Reveal from "../Reveal.jsx";

export default function NearbySection({ nearbyPlaces, interestingFacts, onStartOver }) {
  const hasAny = nearbyPlaces?.length || interestingFacts?.length;

  return (
    <section id="nearby" className="section-pad py-24 sm:py-28 border-t border-line bg-paper2">
      <div className="max-w-5xl mx-auto">
        {hasAny && (
          <div className="grid sm:grid-cols-2 gap-14 mb-20">
            {nearbyPlaces?.length > 0 && (
              <div>
                <Reveal>
                  <span className="eyebrow">Keep exploring</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="font-display text-3xl sm:text-4xl tracking-tightish mt-3 mb-8">
                    Nearby places
                  </h2>
                </Reveal>
                <ul className="space-y-3">
                  {nearbyPlaces.map((place, i) => (
                    <Reveal key={i} delay={0.04 * i} as="li">
                      <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
                        <span className="text-ink2">{place}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}

            {interestingFacts?.length > 0 && (
              <div>
                <Reveal>
                  <span className="eyebrow">Bonus lore</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="font-display text-3xl sm:text-4xl tracking-tightish mt-3 mb-8">
                    Interesting facts
                  </h2>
                </Reveal>
                <ul className="space-y-4">
                  {interestingFacts.map((fact, i) => (
                    <Reveal key={i} delay={0.04 * i} as="li" className="text-ink2 leading-relaxed">
                      &ldquo;{fact}&rdquo;
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Reveal>
          <div className="rounded-xl2 bg-ink text-paper px-8 py-14 sm:px-16 sm:py-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tightish mb-4 text-balance">
              Found something else along the way?
            </h2>
            <p className="text-paper/70 max-w-md mx-auto mb-8">
              Every photo has a place behind it. Upload the next one and let
              GoLore tell you its story.
            </p>
            <button
              onClick={onStartOver}
              className="rounded-full bg-paper text-ink px-7 py-3.5 text-sm font-medium hover:bg-signal hover:text-paper transition-colors"
            >
              Discover another place
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
