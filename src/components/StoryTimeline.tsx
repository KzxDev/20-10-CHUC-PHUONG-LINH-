import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { STORY_INTRO, TIMELINE_CHAPTERS } from "../config/loveConfig";
import AnniversaryCounter from "./AnniversaryCounter";
import StarfieldCanvas from "../effects/StarfieldCanvas";

function OrbitHeartIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative mx-auto mb-16 flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
      <motion.span
        className="absolute h-full w-full rounded-full border border-dashed border-[#BBA4FF]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute h-[70%] w-[70%] rounded-full border border-dashed border-[#FF8EBB]/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      {/* two orbiting lights converging */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8EBB] shadow-[0_0_18px_6px_rgba(255,142,187,0.5)]"
        initial={{ x: -90, y: 0 }}
        animate={inView ? { x: -8, y: 0 } : { x: -90, y: 0 }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.span
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BBA4FF] shadow-[0_0_18px_6px_rgba(187,164,255,0.5)]"
        initial={{ x: 90, y: 0 }}
        animate={inView ? { x: 8, y: 0 } : { x: 90, y: 0 }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.svg
        viewBox="0 0 32 29"
        className="relative h-16 w-16 text-[#FFF8FC] sm:h-20 sm:w-20"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
      >
        <path
          d="M16 28S1 18.5 1 9.5C1 4.3 5.1 1 9.4 1c3 0 5.3 1.7 6.6 4.1C17.3 2.7 19.6 1 22.6 1 26.9 1 31 4.3 31 9.5 31 18.5 16 28 16 28Z"
          fill="currentColor"
          opacity="0.9"
        />
      </motion.svg>
      <motion.div
        className="pointer-events-none absolute h-full w-full rounded-full bg-[#FF8EBB]/10 blur-2xl"
        animate={inView ? { opacity: [0, 0.8, 0.3] } : { opacity: 0 }}
        transition={{ duration: 2, delay: 2.2 }}
      />
    </div>
  );
}

function TimelineChapterCard({
  chapter,
  index,
}: {
  chapter: (typeof TIMELINE_CHAPTERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const fromLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex w-full items-start gap-5 pb-16 last:pb-0 sm:gap-10">
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF8EBB]/50 bg-[#1a0d2e] text-[#FFD4E5] shadow-[0_0_20px_rgba(255,142,187,0.35)] sm:h-12 sm:w-12"
        >
          <span className="text-xs font-semibold sm:text-sm">{String(index + 1).padStart(2, "0")}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, x: fromLeft ? -16 : 16, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md sm:p-7"
      >
        <p className="text-[11px] font-medium tracking-[0.3em] text-[#FF8EBB] sm:text-xs">{chapter.number}</p>
        <h3 className="mt-2 font-serif text-xl text-[#FFF8FC] sm:text-2xl">{chapter.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">{chapter.text}</p>
      </motion.div>
    </div>
  );
}

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);
  const warmOverlay = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.9]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#120a26] via-[#1a0d2e] to-[#2a1340] py-28 sm:py-36"
    >
      <StarfieldCanvas density={0.5} />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#45203f]/40 to-[#5a2a4a]/50"
        style={{ opacity: warmOverlay }}
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs font-medium tracking-[0.4em] text-[#BBA4FF]">{STORY_INTRO.eyebrow}</p>
        </motion.div>

        <OrbitHeartIntro />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="whitespace-pre-line text-center font-serif text-3xl leading-tight text-[#FFF8FC] sm:text-5xl"
        >
          {STORY_INTRO.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-center text-sm text-white/65 sm:text-base"
        >
          {STORY_INTRO.description}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-2 text-center font-serif italic text-[#FFD4E5]/70"
        >
          {STORY_INTRO.caption}
        </motion.p>

        <div className="mt-16">
          <AnniversaryCounter />
        </div>

        <div className="relative mt-28">
          <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-6" />
          <motion.div
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-[#FF8EBB] via-[#BBA4FF] to-[#FFE5AC] sm:left-6"
            style={{ height: lineHeight }}
          />
          <div>
            {TIMELINE_CHAPTERS.map((chapter, i) => (
              <TimelineChapterCard key={chapter.id} chapter={chapter} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
