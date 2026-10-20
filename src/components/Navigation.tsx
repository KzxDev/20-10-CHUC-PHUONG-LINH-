import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../config/loveConfig";
import AudioController from "./AudioController";
import { useEasterEggs } from "../context/EasterEggContext";

export default function Navigation({ onReplayIntro }: { onReplayIntro: () => void }) {
  const [active, setActive] = useState(NAV_ITEMS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const { unlock } = useEasterEggs();

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setShowBackTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-1/2 top-4 z-[80] w-[94%] max-w-3xl -translate-x-1/2 sm:top-5">
        <div className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-[#0d0a1e]/60 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-4">
          <button
            onClick={() => {
              unlock("envelopeSeal");
              onReplayIntro();
            }}
            title="Xem lại intro"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8EBB] to-[#BBA4FF] text-sm text-[#1a0d2e]"
            aria-label="Xem lại intro"
          >
            💌
          </button>

          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition lg:text-sm ${
                  active === item.id ? "text-[#FFF8FC]" : "text-white/50 hover:text-white/80"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <AudioController />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 md:hidden"
              aria-label="Mở menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0d0a1e]/90 p-2 backdrop-blur-xl md:hidden"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`rounded-xl px-4 py-2.5 text-left text-sm ${
                    active === item.id ? "bg-white/10 text-white" : "text-white/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-[80] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FFD4E5] backdrop-blur-md transition hover:border-[#FF8EBB]/50"
            aria-label="Về đầu trang"
          >
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
