"use client";

import type { TemplateOption } from "@/types/centroxy";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

type TemplateCardProps = {
  template: TemplateOption;
  selected: boolean;
  onSelect: (templateId: string) => void;
};

export function TemplateCard({
  template,
  selected,
  onSelect,
}: TemplateCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      onClick={() => onSelect(template.id)}
      className={`group relative overflow-hidden rounded-[10px] border p-3 text-left transition ${
        selected
          ? "border-primary ring-2 ring-primary/20"
          : "border-stroke hover:border-primary dark:border-dark-3"
      }`}
    >
      <div
        className={`mb-3 h-24 rounded-lg bg-linear-to-br ${template.gradient} p-3`}
      >
        <div className="h-3 w-20 rounded-full bg-white/70" />
        <div className="mt-8 h-2 w-28 rounded-full bg-white/60" />
        <div className="mt-2 h-2 w-16 rounded-full bg-white/40" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-dark dark:text-white">
            {template.name}
          </h3>
          <p className="mt-1 text-xs leading-5 text-dark-4 dark:text-dark-6">
            {template.description}
          </p>
        </div>
        {selected && (
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Check className="size-4" />
          </span>
        )}
      </div>
    </motion.button>
  );
}
