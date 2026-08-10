"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  label: string;
  value: string;
  helper: string;
  gradient: string;
  icon: LucideIcon;
};

export function DashboardCard({
  label,
  value,
  helper,
  gradient,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-[10px] bg-linear-to-br ${gradient} p-5 text-white shadow-1`}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/80">{label}</p>
          <strong className="mt-3 block text-3xl font-bold">{value}</strong>
          <span className="mt-2 block text-sm text-white/80">{helper}</span>
        </div>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 shadow-sm backdrop-blur">
          <Icon className="size-6" />
        </span>
      </div>
    </motion.div>
  );
}
