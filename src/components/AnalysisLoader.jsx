import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import ThemeToggle from "./ThemeToggle.jsx";
import useTheme from "../hooks/useTheme.js";

const STAGES_WITH_PHOTO = [
  "Looking at your photo",
  "Identifying the place",
  "Piecing together its story",
  "Exploring local culture",
  "Finding local food",
  "Preparing your guide",
];

const STAGES_TEXT_ONLY = [
  "Reading what you told us",
  "Identifying the place",
  "Piecing together its story",
  "Exploring local culture",
  "Finding local food",
  "Preparing your guide",
];

export default function AnalysisLoader({ previewUrl, searchText }) {
  const [index, setIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const stages = previewUrl ? STAGES_WITH_PHOTO : STAGES_TEXT_ONLY;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i < stages.length - 1 ? i + 1 : i));
    }, 1500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center section-pad py-32 relative">
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <div className="flex flex-col items-center text-center max-w-sm">
        <img
          src={logoLight}
          alt="GoLore"
          className="h-8 mb-8 opacity-90 dark:hidden"
        />
        <img
          src={logoDark}
          alt="GoLore"
          className="hidden h-8 mb-8 opacity-90 dark:block"
        />

        <div className="relative h-40 w-40 mb-10">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt=""
              className="h-full w-full object-cover rounded-full grayscale opacity-90"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-paper2 border border-line flex items-center justify-center px-6">
              <span
                className="font-hand text-xl text-ink2 leading-tight line-clamp-4"
                title={searchText}
              >
                {searchText || "Somewhere out there"}
              </span>
            </div>
          )}
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-signal"
            style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <span className="eyebrow mb-3">GoLore is reading this</span>

        <div className="h-8 relative w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-display text-2xl tracking-tightish absolute inset-x-0"
            >
              {stages[index]}&hellip;
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5 mt-8">
          {stages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= index ? "w-6 bg-signal" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
