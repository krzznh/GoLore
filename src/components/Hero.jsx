import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";

const POSTCARDS = [
  {
    src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=70",
    label: "Marrakech, Morocco",
    rotate: -7,
    x: -70,
    y: 10,
  },
  {
    src: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=700&q=70",
    label: "Petra, Jordan",
    rotate: 5,
    x: 60,
    y: -30,
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=70",
    label: "Kyoto, Japan",
    rotate: -3,
    x: 10,
    y: 70,
  },
];

function Postcard({ card, delay }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      className="absolute left-1/2 top-1/2 w-[220px] rounded-xl2 bg-surface p-2 pb-4 shadow-card border border-line/60"
      style={{ marginLeft: -110, marginTop: -140 }}
      initial={{ opacity: 0, scale: 0.9, rotate: card.rotate, x: card.x, y: card.y + 30 }}
      animate={{ opacity: 1, scale: 1, rotate: card.rotate, x: card.x, y: card.y }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
    >
      <div className="overflow-hidden rounded-lg aspect-[4/5] bg-paper2">
        {!failed ? (
          <img
            src={card.src}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="font-hand text-xl text-drift">{card.label}</span>
          </div>
        )}
      </div>
      <figcaption className="mt-2 font-hand text-xl text-ink2 text-center">
        {card.label}
      </figcaption>
    </motion.figure>
  );
}

export default function Hero({ onStart }) {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32 section-pad">
      <div className="absolute inset-0 -z-10 grain" />
      <div
        className="absolute -z-10 top-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, #4C5CFF, transparent 70%)" }}
      />

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-8 items-center max-w-7xl mx-auto">
        <div>
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              A photo is where every trip begins
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-balance text-[13vw] leading-[0.95] sm:text-[6.2rem] sm:leading-[0.94] tracking-tightish text-ink">
              There is a
              <br />
              <span className="italic font-normal text-signal">story</span>{" "}
              behind
              <br />
              every place.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg text-ink2 leading-relaxed">
              Upload a photo of a place, a dish, a street sign, anything you
              found along the way. GoLore reads it and hands you the history,
              the culture, the language and the food waiting inside it.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onStart}
                className="group relative rounded-full bg-ink text-paper px-7 py-4 text-base font-medium overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover a place
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
                <span className="absolute inset-0 bg-signal scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              </button>
              <a
                href="#how"
                className="text-sm font-medium text-ink2 underline decoration-line underline-offset-4 hover:text-signal hover:decoration-signal transition-colors"
              >
                See how it works
              </a>
            </div>
          </Reveal>
        </div>

        {/* Signature: a small drift of postcards, as if just pulled from a travel journal */}
        <div className="relative h-[340px] sm:h-[420px] hidden sm:block">
          {POSTCARDS.map((card, i) => (
            <Postcard key={card.label} card={card} delay={0.3 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
