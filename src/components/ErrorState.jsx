import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import ThemeToggle from "./ThemeToggle.jsx";
import useTheme from "../hooks/useTheme.js";

export default function ErrorState({ message, onRetry }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center section-pad py-32 relative">
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <div className="max-w-md text-center">
        <img
          src={logoLight}
          alt="GoLore"
          className="h-8 mx-auto mb-8 opacity-90 dark:hidden"
        />
        <img
          src={logoDark}
          alt="GoLore"
          className="hidden h-8 mx-auto mb-8 opacity-90 dark:block"
        />

        <span className="eyebrow text-clay">Something went sideways</span>
        <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-4 tracking-tightish text-balance">
          GoLore couldn't finish that one.
        </h2>
        <p className="text-ink2 leading-relaxed mb-8">
          {message || "Something went wrong while reading your photo. Please try again."}
        </p>
        <button
          onClick={onRetry}
          className="rounded-full bg-ink text-paper px-7 py-3.5 text-sm font-medium hover:bg-signal transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
