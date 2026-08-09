import { useEffect, useState } from "react";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import ThemeToggle from "./ThemeToggle.jsx";
import useTheme from "../hooks/useTheme.js";

export default function Navbar({ onStart }) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="section-pad flex items-center justify-between h-20 sm:h-24">
        <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="GoLore home">
          <img
            src={logoLight}
            alt="GoLore"
            className="h-9 sm:h-11 lg:h-12 w-auto dark:hidden"
          />
          <img
            src={logoDark}
            alt="GoLore"
            className="hidden h-9 sm:h-11 lg:h-12 w-auto dark:block"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-widey text-ink2">
          <a href="#how" className="hover:text-signal transition-colors">
            How it works
          </a>
          <a href="#explore" className="hover:text-signal transition-colors">
            Explore
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            onClick={onStart}
            className="rounded-full bg-ink text-paper px-4 sm:px-5 py-2 text-[13px] sm:text-sm font-medium tracking-tightish hover:bg-signal transition-colors duration-300"
          >
            Upload a photo
          </button>
        </div>
      </div>
    </header>
  );
}
