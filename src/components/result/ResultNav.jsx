import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "history", label: "History" },
  { id: "culture", label: "Culture" },
  { id: "language", label: "Language" },
  { id: "food", label: "Food" },
  { id: "do", label: "Do" },
  { id: "awareness", label: "Avoid" },
  { id: "nearby", label: "Nearby" },
];

export default function ResultNav({ available }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const items = SECTIONS.filter((s) => available.has(s.id));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Guide sections"
      className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-40 hidden sm:flex items-center gap-1 rounded-full bg-ink/90 backdrop-blur px-2 py-2 shadow-card transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {items.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`font-mono text-[10px] uppercase tracking-widey px-3 py-2 rounded-full transition-colors ${
            active === s.id ? "bg-signal text-paper" : "text-paper/60 hover:text-paper"
          }`}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
