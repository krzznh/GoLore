import { motion } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion.js";

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 22,
  className = "",
  once = true,
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
