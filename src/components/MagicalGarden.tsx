import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Flower from "./garden/Flower";
import FireflyCanvas from "../effects/FireflyCanvas";
import PetalsCanvas from "../effects/PetalsCanvas";
import { BACKGROUNDS, GARDEN_INTRO, EASTER_EGGS } from "../config/loveConfig";
import { useEasterEggs } from "../context/EasterEggContext";

type FlowerSeed = {
  left: string;
  bottom: string;
  scale: number;
  hue: number;
  delay: number;
  petals: number;
};

function makeSeeds(countRange: [number, number], scaleRange: [number, number], seedOffset: number): FlowerSeed[] {
  const count = countRange[0] + (seedOffset % (countRange[1] - countRange[0] + 1));
  return Array.from({ length: count }, (_, i) => {
    const r = (i * 97 + seedOffset * 13) % 100;
    return {
      left: `${(i * 37 + seedOffset * 19) % 94}%`,
      bottom: `${(r % 12) + (seedOffset % 2 === 0 ? 0 : 4)}%`,
      scale: scaleRange[0] + ((r % 10) / 10) * (scaleRange[1] - scaleRange[0]),
      hue: 320 + (i * 23) % 60,
      delay: ((i * 7 + seedOffset * 3) % 10) * 0.18,
      petals: 5 + (i % 3),
    };
  });
}

const BACK_FLOWERS = makeSeeds([8, 10], [0.35, 0.55], 1);
const MID_FLOWERS = makeSeeds([7, 9], [0.6, 0.85], 2);
const FRONT_FLOWERS = makeSeeds([5, 6], [0.95, 1.25], 3);

export default function MagicalGarden() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });
  const [meteorShower, setMeteorShower] = useState(false);
  const [, setSpecialClicks] = useState<Set<number>>(new Set());
  const { unlock, setActiveMessage } = useEasterEggs();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 15 });
  const backX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const backY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const midX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const midY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const frontX = useTransform(smoothX, [-1, 1], [-26, 26]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const gateScale = useTransform(scrollYProgress, [0.3, 1], [1, 1.12]);
  const gateY = useTransform(scrollYProgress, [0.3, 1], [0, -30]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const handleSpecialClick = (idx: number) => {
    setSpecialClicks((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === 3) {
        unlock("gardenFlowers");
        setActiveMessage(EASTER_EGGS.secretMessages.gardenFlowers);
      }
      return next;
    });
  };

  const handleMoonClick = () => {
    unlock("moon");
    setMeteorShower(true);
    window.setTimeout(() => setMeteorShower(false), 2800);
  };

  const meteors = Array.from({ length: 9 });

  return (
    <section
      id="garden"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#0b0618]"
    >
      {/* Background layer: path to gate */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BACKGROUNDS.stonePathGate})`,
          x: backX,
          y: backY,
          scale: gateScale,
          translateY: gateY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0618]/50 via-transparent to-[#0b0618]" />

      <FireflyCanvas count={18} />
      <PetalsCanvas count={16} />

      {/* Moon easter egg */}
      <motion.button
        onClick={handleMoonClick}
        aria-label="Chạm vào mặt trăng"
        className="absolute right-[12%] top-[12%] h-12 w-12 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fffdf5,#ffe9c2_60%,transparent_75%)] shadow-[0_0_35px_14px_rgba(255,236,190,0.35)] sm:h-16 sm:w-16"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      />

      {meteorShower &&
        meteors.map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-px w-24 bg-gradient-to-r from-transparent via-[#FFF3DD] to-transparent"
            style={{ top: `${Math.random() * 40}%`, left: `${Math.random() * 90}%`, rotate: 35 }}
            initial={{ opacity: 0, x: -40, y: -40 }}
            animate={{ opacity: [0, 1, 0], x: 180, y: 140 }}
            transition={{ duration: 1.1 + Math.random() * 0.6, delay: i * 0.15 }}
          />
        ))}

      {/* Depth layers of flowers */}
      <motion.div className="absolute inset-0" style={{ x: backX, y: backY }}>
        {inView && BACK_FLOWERS.map((f, i) => <Flower key={`b-${i}`} {...f} petalCount={f.petals} scale={f.scale * 0.9} />)}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
        {inView && MID_FLOWERS.map((f, i) => <Flower key={`m-${i}`} {...f} petalCount={f.petals} />)}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: frontX }}>
        {inView &&
          FRONT_FLOWERS.map((f, i) =>
            i < 3 ? (
              <Flower
                key={`s-${i}`}
                {...f}
                petalCount={f.petals}
                special
                onClick={() => handleSpecialClick(i)}
              />
            ) : (
              <Flower key={`f-${i}`} {...f} petalCount={f.petals} />
            )
          )}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-10 flex flex-col items-center px-6 text-center sm:top-16">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl text-[#FFF8FC] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl"
        >
          {GARDEN_INTRO.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 max-w-md text-xs text-white/60 sm:text-sm"
        >
          {GARDEN_INTRO.description}
        </motion.p>
      </div>

      <p className="pointer-events-none absolute bottom-6 w-full text-center text-[11px] tracking-wide text-white/35">
        Chạm vào hoa để hoa nở đi Linh iu :3  ✨
      </p>
    </section>
  );
}
