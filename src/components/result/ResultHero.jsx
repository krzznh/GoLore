import { motion } from "framer-motion";
import SafeImage from "../SafeImage.jsx";
import ThemeToggle from "../ThemeToggle.jsx";
import logoDark from "../../assets/logo-dark.png";

// Note: this section sits on top of a real photograph, so its overlay and
// text use fixed white/black tones rather than the theme-aware ink/paper
// tokens — the gradient must stay dark for legibility no matter which
// theme the rest of the app is in.
export default function ResultHero({ data, onStartOver, theme, onToggleTheme }) {
  const heroImage = data?.images?.location?.[0];
  const confidencePct = Math.round((data?.confidence ?? 0) * 100);

  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage
          src={heroImage?.image}
          alt={heroImage?.alt || data?.placeName}
          className="h-full w-full"
          imgClassName="scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute top-0 inset-x-0 z-10 section-pad flex items-center justify-between pt-6 sm:pt-8">
        <img
          src={logoDark}
          alt="GoLore"
          className="h-8 sm:h-9 w-auto opacity-95"
        />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="ghost" />
      </div>

      <div className="relative section-pad w-full pb-14 pt-40 sm:pb-20">
        <div className="max-w-4xl">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onStartOver}
            className="font-mono text-[11px] uppercase tracking-widey text-white/70 hover:text-white mb-8 flex items-center gap-2"
          >
            &larr; Start over
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className="eyebrow text-white/70">{data?.location}</span>
            {typeof data?.confidence === "number" && (
              <span className="font-mono text-[10px] uppercase tracking-widey text-white/60 border border-white/25 rounded-full px-2.5 py-1">
                {confidencePct}% match
              </span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8 }}
            className="font-display text-white text-[11vw] sm:text-6xl lg:text-7xl leading-[0.98] tracking-tightish text-balance"
          >
            {data?.placeName}
          </motion.h1>

          {data?.identificationNote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-4 max-w-xl text-sm text-white/70 italic"
            >
              {data.identificationNote}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg text-white/90 leading-relaxed"
          >
            {data?.shortIntroduction}
          </motion.p>
        </div>
      </div>

      {heroImage?.photographer && (
        <a
          href={heroImage.photographerUrl || data?.imageProvider?.website}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 right-4 sm:right-6 font-mono text-[10px] text-white/60 hover:text-white transition-colors"
        >
          Photo: {heroImage.photographer} / {data?.imageProvider?.name || "Pexels"}
        </a>
      )}
    </section>
  );
}
