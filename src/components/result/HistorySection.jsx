import Reveal from "../Reveal.jsx";

export default function HistorySection({ history, timeline }) {
  if (!history && (!timeline || timeline.length === 0)) return null;

  return (
    <section id="history" className="section-pad py-24 sm:py-28 border-t border-line">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
        <div>
          <Reveal>
            <span className="eyebrow">Chapter One</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 mb-6">
              History
            </h2>
          </Reveal>
          {history && (
            <Reveal delay={0.1}>
              <p className="text-ink2 leading-relaxed text-[17px]">{history}</p>
            </Reveal>
          )}
        </div>

        {timeline && timeline.length > 0 && (
          <div className="relative pl-8 sm:pl-10">
            <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-line" />
            <ol className="space-y-9">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={0.05 * i} as="li" className="relative">
                  <span className="absolute -left-8 sm:-left-10 top-1 h-3.5 w-3.5 rounded-full bg-signal ring-4 ring-paper" />
                  <span className="font-mono text-xs uppercase tracking-widey text-signal">
                    {item.year}
                  </span>
                  <p className="text-ink2 leading-relaxed mt-1.5">{item.event}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
