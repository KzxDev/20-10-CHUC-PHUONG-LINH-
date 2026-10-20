import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FireworksCanvas, { type FireworksHandle } from "../effects/FireworksCanvas";
import PetalsCanvas from "../effects/PetalsCanvas";
import StarfieldCanvas from "../effects/StarfieldCanvas";
import { CELEBRATION, BACKGROUNDS } from "../config/loveConfig";
import WishMaker from "./WishMaker";

export default function Celebration() {
  const fireworksRef = useRef<FireworksHandle>(null);
  const [dimmed, setDimmed] = useState(false);
  const [showText, setShowText] = useState(false);
  const [launched, setLaunched] = useState(false);

  const makeWish = () => {
    setLaunched(true);
    setDimmed(true);
    window.setTimeout(() => fireworksRef.current?.burstRandom(2), 200);
    window.setTimeout(() => fireworksRef.current?.burstHeart(), 1000);
    window.setTimeout(() => setShowText(true), 1800);
    window.setTimeout(() => fireworksRef.current?.burstRandom(3), 2400);
    window.setTimeout(() => {
      setDimmed(false);
      setShowText(false);
    }, 5500);
  };

  return (
    <section id="celebration" className="relative overflow-hidden bg-[#140827] py-28 sm:py-36">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUNDS.sunsetDreamscape})` }}
      />
      <motion.div
        className="absolute inset-0 bg-[#0a0618]"
        animate={{ opacity: dimmed ? 0.75 : 0.55 }}
        transition={{ duration: 1 }}
      />
      <StarfieldCanvas density={0.6} />
      <PetalsCanvas count={14} interactive={false} />
      <FireworksCanvas ref={fireworksRef} />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium tracking-[0.4em] text-[#FFD4E5]"
        >
          {CELEBRATION.eyebrow} · 20.10
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-4 font-serif text-3xl leading-tight text-[#FFF8FC] sm:text-5xl"
        >
          {CELEBRATION.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 font-serif text-xl text-[#FFD4E5] sm:text-2xl"
        >
          {CELEBRATION.headline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base"
        >
          {CELEBRATION.body}
        </motion.p>

        {showText && (
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2 }}
            className="mt-8 font-serif text-xl text-[#FFE5AC] drop-shadow-[0_0_20px_rgba(255,229,172,0.6)] sm:text-3xl"
          >
            PHƯƠNG LINH IU
          </motion.p>
        )}

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          onClick={makeWish}
          className="mt-10 rounded-full bg-gradient-to-r from-[#FF8EBB] to-[#FFE5AC] px-8 py-3 text-sm font-medium text-[#1a0d2e] shadow-[0_15px_40px_rgba(255,142,187,0.4)]"
        >
          {launched ? CELEBRATION.replayButton : CELEBRATION.wishButton}
        </motion.button>

        <WishMaker />
      </div>
    </section>
  );
}
