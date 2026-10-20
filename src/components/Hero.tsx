import { motion } from "framer-motion";
import StarfieldCanvas from "../effects/StarfieldCanvas";
import PetalsCanvas from "../effects/PetalsCanvas";
import { BACKGROUNDS, SITE_META, INTRO, HER_NICKNAME } from "../config/loveConfig";

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-[#080D24]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUNDS.nebulaHeart})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/50 via-[#120a26]/60 to-[#080D24]" />
      <StarfieldCanvas density={1} showShootingStars />
      <PetalsCanvas count={14} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs font-medium tracking-[0.4em] text-[#FFD4E5]/80"
        >
          FOR {HER_NICKNAME.toUpperCase()}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-4 bg-gradient-to-r from-[#FFD4E5] via-[#FFF8FC] to-[#BBA4FF] bg-clip-text font-serif text-4xl text-transparent drop-shadow-[0_0_35px_rgba(255,142,187,0.35)] sm:text-6xl md:text-7xl"
        >
          {INTRO.revealTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-6 max-w-xl text-sm text-white/65 sm:text-base"
        >
          {SITE_META.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-14 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[11px] tracking-[0.3em]">Cuộn xuống để xem nha bé :3 </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
