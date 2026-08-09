import { useState } from "react";
import Reveal from "../Reveal.jsx";

function PhraseCard({ phrase, delay }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(phrase.phrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore, nothing critical here
    }
  };

  return (
    <Reveal delay={delay}>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full text-left rounded-xl2 border border-line bg-surface p-6 hover:border-signal transition-colors group relative"
        aria-expanded={flipped}
      >
        <span className="font-mono text-[10px] uppercase tracking-widey text-drift">
          {flipped ? "Meaning" : "Phrase"}
        </span>
        <p className="font-display text-2xl mt-2 mb-1 tracking-tightish">
          {flipped ? phrase.meaning : phrase.phrase}
        </p>
        {!flipped && phrase.pronunciation && (
          <p className="text-sm text-signal font-hand text-lg">
            {phrase.pronunciation}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-drift">
            {flipped ? "Tap to see original" : "Tap to reveal meaning"}
          </span>
          <span
            onClick={handleCopy}
            role="button"
            tabIndex={0}
            className="text-xs font-medium text-ink2 hover:text-signal transition-colors"
          >
            {copied ? "Copied" : "Copy"}
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export default function LanguageSection({ localLanguage, usefulPhrases }) {
  if (!localLanguage && (!usefulPhrases || usefulPhrases.length === 0)) return null;

  return (
    <section id="language" className="section-pad py-24 sm:py-28 border-t border-line">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="eyebrow">Chapter Three</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 mb-4">
            Speak like a local
          </h2>
        </Reveal>
        {localLanguage && (
          <Reveal delay={0.1}>
            <p className="text-ink2 leading-relaxed max-w-xl mb-12">
              The local language here is {localLanguage}. A handful of
              phrases go a long way.
            </p>
          </Reveal>
        )}

        {usefulPhrases?.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {usefulPhrases.map((phrase, i) => (
              <PhraseCard key={i} phrase={phrase} delay={0.04 * i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
