"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminUnlock() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (!isActive || isCancelled) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          router.push("/admin/login");
          return 100;
        }
        return prev + (100 / 50); // Complete in 5 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isCancelled, router]);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    if (progress < 100) {
      setIsCancelled(true);
      setProgress(0);
      setTimeout(() => setIsCancelled(false), 300);
    }
    setIsActive(false);
  };

  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    if (progress < 100) {
      setIsCancelled(true);
      setProgress(0);
      setTimeout(() => setIsCancelled(false), 300);
    }
    setIsActive(false);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Centroxy Joy Portal</h1>
        <p className="text-gray-400 mb-12 text-sm">
          Press and hold to access admin panel
        </p>

        <div
          className="relative w-32 h-32 mx-auto cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background circle */}
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
          </svg>

          {/* Progress circle */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#5750f1"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-2xl font-bold text-white"
              animate={{ scale: isActive ? 1.1 : 1 }}
            >
              {Math.round(progress)}%
            </motion.span>
            <span className="text-xs text-gray-400 mt-1">Hold</span>
          </div>
        </div>

        {isCancelled && (
          <motion.p
            className="mt-6 text-red-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Access cancelled
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
