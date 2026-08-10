"use client";

import type { DisplaySlide as DisplaySlideType, SlideKind } from "@/types/centroxy";
import { templateOptions } from "@/data/centroxy/modules";
import { motion } from "framer-motion";
import Image from "next/image";

const gradientByKind: Record<DisplaySlideType["kind"], string> = {
  welcome: "from-[#07111F] via-[#1D4ED8] to-[#14B8A6]",
  thought: "from-[#0F172A] via-[#2563EB] to-[#10B981]",
  birthday: "from-[#831843] via-[#F43F5E] to-[#F59E0B]",
  employee: "from-[#3B2405] via-[#B45309] to-[#FACC15]",
  customer: "from-[#063B35] via-[#0F766E] to-[#38BDF8]",
  announcement: "from-[#111827] via-[#4F46E5] to-[#EC4899]",
  event: "from-[#1E1B4B] via-[#7C3AED] to-[#F97316]",
  participation: "from-[#172554] via-[#2563EB] to-[#F59E0B]",
  news: "from-[#020617] via-[#334155] to-[#06B6D4]",
  "thank-you": "from-[#0F172A] via-[#115E59] to-[#5750F1]",
};

const templateKindKey: Partial<Record<SlideKind, keyof typeof templateOptions>> = {
  thought: "thought",
  birthday: "birthday",
  employee: "employee",
  customer: "customer",
  announcement: "announcement",
  event: "event",
  participation: "participation",
  news: "news",
};

function resolveGradient(slide: DisplaySlideType): string {
  const key = templateKindKey[slide.kind];
  if (key && slide.template) {
    const match = templateOptions[key].find((t) => t.id === slide.template);
    if (match) return match.gradient;
  }
  return gradientByKind[slide.kind];
}

export function DisplaySlide({ slide }: { slide: DisplaySlideType }) {
  const isBirthday = slide.kind === "birthday";

  return (
    <section
      className={`relative flex h-screen w-screen overflow-hidden bg-gradient-to-br ${resolveGradient(slide)} text-white`}
    >
      {/* Background Image */}
      {slide.image && (
        <Image
          src={slide.image}
          alt=""
          fill
          priority={slide.kind === "welcome"}
          className="object-cover opacity-20"
          sizes="100vw"
        />
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.24),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.12))]" />

      {/* Birthday Confetti Animation */}
      {isBirthday && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, index) => (
            <motion.span
              key={index}
              initial={{ y: "110vh", opacity: 0.3, x: 0 }}
              animate={{ 
                y: "-15vh", 
                opacity: [0.3, 1, 0.2],
                x: Math.sin(index) * 20
              }}
              transition={{
                duration: 8 + (index % 5),
                repeat: Infinity,
                delay: index * 0.3,
              }}
              className="absolute bottom-0 size-4 rounded-full bg-white/70 shadow-lg"
              style={{ left: `${(index * 13) % 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 sm:px-6 md:px-[8vw] py-[10vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-6xl"
        >
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 sm:mb-6 inline-flex rounded-full bg-white/15 px-3 sm:px-5 py-2 text-xs sm:text-lg font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur border border-white/20"
          >
            {slide.badge}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black leading-[1.1] text-white drop-shadow-lg"
          >
            {slide.title}
          </motion.h1>

          {/* Subtitle */}
          {slide.subtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90 drop-shadow"
            >
              {slide.subtitle}
            </motion.h2>
          )}

          {/* Body */}
          {slide.body && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 sm:mt-8 max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/85 drop-shadow"
            >
              {slide.body}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-10 text-right"
      >
        <p className="text-base sm:text-lg font-semibold text-white drop-shadow">
          Centroxy Joy Portal
        </p>
        <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-white/70 font-medium">
          Live Display
        </p>
      </motion.div>
    </section>
  );
}
