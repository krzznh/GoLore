import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { validateImageFile } from "../lib/api.js";

export default function UploadPanel({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [context, setContext] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const acceptFile = useCallback((candidate) => {
    const result = validateImageFile(candidate);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setError("");
    setFile(candidate);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(candidate);
    });
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) acceptFile(dropped);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = () => {
    const trimmedContext = context.trim();
    if (!file && !trimmedContext) {
      setError(
        "Add a photo, a place name, or an address — just one of these is enough."
      );
      return;
    }
    setError("");
    onSubmit({ file, text: trimmedContext });
  };

  return (
    <section id="explore" className="section-pad py-24 sm:py-32 border-t border-line bg-paper2">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <span className="eyebrow">Start here</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish mt-3 mb-12 text-balance">
            What did you find?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`relative rounded-xl2 border-2 border-dashed transition-colors duration-300 ${
              dragActive ? "border-signal bg-signal/5" : "border-line bg-surface"
            }`}
          >
            <AnimatePresence mode="wait">
              {!previewUrl ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center px-6 py-20"
                >
                  <div className="h-16 w-16 rounded-full bg-paper2 border border-line flex items-center justify-center mb-6 text-ink">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 16V4M12 4L7 9M12 4l5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="font-display text-2xl mb-2">
                    Drag a photo here
                  </p>
                  <p className="text-sm text-drift mb-6">
                    or choose one from your device — JPG, PNG, WEBP or HEIC, up to 10MB.
                    Photos are optional: a place name or address below works too.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-signal transition-colors"
                    >
                      Choose a photo
                    </button>
                    <label className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink2 cursor-pointer hover:border-signal hover:text-signal transition-colors">
                      Use camera
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && acceptFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && acceptFile(e.target.files[0])}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 sm:p-6"
                >
                  <div className="relative rounded-xl overflow-hidden bg-paper2">
                    <img
                      src={previewUrl}
                      alt="Your uploaded photo, ready for GoLore to analyze"
                      className="w-full max-h-[420px] object-contain"
                    />
                    <button
                      onClick={handleRemove}
                      aria-label="Remove photo"
                      className="absolute top-3 right-3 h-9 w-9 rounded-full bg-ink/80 text-paper backdrop-blur flex items-center justify-center hover:bg-clay transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-drift truncate max-w-[60%]">
                      {file?.name}
                    </span>
                    <label className="text-xs font-medium text-signal cursor-pointer hover:underline">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && acceptFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {error && (
          <p className="mt-3 text-sm text-clay font-medium" role="alert">
            {error}
          </p>
        )}

        <Reveal delay={0.15} className="mt-8">
          <label className="block text-sm font-medium text-ink2 mb-2">
            Place name or address{" "}
            <span className="text-drift font-normal">
              {file ? "(optional — you already added a photo)" : "(or add a photo above)"}
            </span>
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={2}
            placeholder="e.g. “Kailasa Temple, Ellora” or “Ellora, Maharashtra, India” — type this alone, add a photo alone, or use both together."
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-drift focus:border-signal focus:ring-0 outline-none resize-none"
          />
          <p className="mt-2 text-xs text-drift">
            Just one of these — a photo, a place name, or an address — is enough to get started.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto rounded-full bg-signal text-paper px-8 py-4 text-base font-medium hover:bg-ink transition-colors duration-300"
          >
            Uncover this place
          </button>
        </Reveal>
      </div>
    </section>
  );
}
