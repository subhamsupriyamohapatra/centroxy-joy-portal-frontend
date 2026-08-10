"use client";

import { useCallback, useRef, useState } from "react";

export function useLongPress(duration: number, onComplete: () => void) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const cancel = useCallback(() => {
    clearTimers();
    setIsPressing(false);
    setProgress(0);
  }, [clearTimers]);

  const start = useCallback(() => {
    clearTimers();
    startTimeRef.current = Date.now();
    setIsPressing(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(100, (elapsed / duration) * 100));
    }, 80);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setProgress(100);
      setIsPressing(false);
      onComplete();
    }, duration);
  }, [clearTimers, duration, onComplete]);

  return {
    cancel,
    isPressing,
    progress,
    start,
  };
}
