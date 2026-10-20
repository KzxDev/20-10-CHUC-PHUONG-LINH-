import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EasterEggProvider } from "./context/EasterEggContext";
import LoadingScreen from "./components/LoadingScreen";
import IntroEnvelope from "./components/IntroEnvelope";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import StoryTimeline from "./components/StoryTimeline";
import LoveConstellation from "./components/LoveConstellation";
import MemoryGallery from "./components/MemoryGallery";
import MagicalGarden from "./components/MagicalGarden";
import LoveLetter from "./components/LoveLetter";
import GiftRoom from "./components/GiftRoom";
import Celebration from "./components/Celebration";
import Finale from "./components/Finale";
import SecretMessageToast from "./components/SecretMessageToast";
import SecretsUnlockedModal from "./components/SecretsUnlockedModal";

type AppStage = "loading" | "intro" | "site";

export default function App() {
  const [stage, setStage] = useState<AppStage>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / 1100) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setStage("intro"), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <EasterEggProvider>
      <div className="min-h-screen w-full bg-[#080D24] font-sans text-white antialiased">
        <AnimatePresence>{stage === "loading" && <LoadingScreen progress={progress} />}</AnimatePresence>
        <AnimatePresence>
          {stage === "intro" && <IntroEnvelope onComplete={() => setStage("site")} />}
        </AnimatePresence>

        {stage === "site" && (
          <>
            <ScrollProgress />
            <Navigation onReplayIntro={() => setStage("intro")} />
          </>
        )}

        <main>
          <Hero />
          <StoryTimeline />
          <LoveConstellation />
          <MemoryGallery />
          <MagicalGarden />
          <LoveLetter />
          <GiftRoom />
          <Celebration />
          <Finale />
        </main>

        <SecretMessageToast />
        <SecretsUnlockedModal />
      </div>
    </EasterEggProvider>
  );
}
