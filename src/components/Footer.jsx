import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

export default function Footer() {
  return (
    <footer className="section-pad pt-16 pb-10 border-t border-line bg-paper2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10">
        <div>
          <img
            src={logoLight}
            alt="GoLore"
            className="h-9 sm:h-10 w-auto mb-4 opacity-95 dark:hidden"
          />
          <img
            src={logoDark}
            alt="GoLore"
            className="hidden h-9 sm:h-10 w-auto mb-4 opacity-95 dark:block"
          />
          <p className="max-w-sm text-sm text-drift leading-relaxed">
            There is a story behind every place. GoLore reads a photograph and
            hands you the history, culture and language waiting inside it.
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 font-mono text-[11px] uppercase tracking-widey text-drift">
          <span>History &middot; Culture &middot; Language &middot; Food</span>
          <span>Photography via Pexels</span>
        </div>
      </div>

      <div className="rule mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-drift">
          &copy; {new Date().getFullYear()} GoLore. Every place has a story.
        </p>
        <p className="text-xs text-drift">
          Built by{" "}
          <span className="text-ink font-medium">Team Chaos</span> &mdash;
          Team Lead <span className="text-ink font-medium">Krishna</span>,
          with <span className="text-ink font-medium">Ritik</span> &amp;{" "}
          <span className="text-ink font-medium">Shlok</span>
        </p>
      </div>
    </footer>
  );
}
