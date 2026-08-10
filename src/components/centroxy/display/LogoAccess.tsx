"use client";

import { useLongPress } from "@/hooks/centroxy/use-long-press";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function LogoAccess() {
  const router = useRouter();
  const { cancel, isPressing, progress, start } = useLongPress(5000, () => {
    router.push("/admin/login");
  });
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-6 top-6 z-20 flex select-none items-center gap-3 rounded-xl bg-gradient-to-r from-white/15 to-white/10 px-4 py-3 text-white backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-lg"
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      onTouchCancel={cancel}
      role="button"
      tabIndex={0}
      aria-label="Centroxy logo - hold to access admin"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative flex size-12 items-center justify-center">
        {isPressing && (
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="26"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="30"
              cy="30"
              r="26"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="drop-shadow-lg"
            />
          </svg>
        )}
        <Image
          src="/images/logo/logo.svg"
          alt="Centroxy"
          width={34}
          height={34}
          className="h-8 w-auto drop-shadow-md"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-wide">Centroxy</span>
        <span className="text-xs text-white/70 font-medium">{isPressing ? `${Math.round(progress)}%` : "Joy Portal"}</span>
      </div>
    </motion.div>
  );
}
