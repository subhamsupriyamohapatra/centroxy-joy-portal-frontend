"use client";

import type { ModuleConfig } from "@/types/centroxy";
import { motion } from "framer-motion";
import Image from "next/image";

type SlidePreviewProps = {
  config: ModuleConfig;
  values: Record<string, string>;
};

export function SlidePreview({ config, values }: SlidePreviewProps) {
  const template = config.templates.find((item) => item.id === values.template);
  const image = values[config.imageField];
  const title = values[config.primaryField] || config.title;
  const subtitle = values[config.secondaryField] || config.singular;
  const body =
    values.quote ||
    values.description ||
    values.greetingMessage ||
    values.achievement ||
    "Your live display preview will update as you type.";

  return (
    <section className="sticky top-6 rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-dark dark:text-white">
          Live Preview
        </h2>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Preview before publishing to the display screen.
        </p>
      </div>
      <motion.div
        key={values.template}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative aspect-video overflow-hidden rounded-xl bg-linear-to-br ${
          template?.gradient ?? "from-primary to-[#06B6D4]"
        } p-6 text-white shadow-lg`}
      >
        <div className="absolute inset-0 bg-black/10" />
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        )}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
              Centroxy
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/75">
              {template?.name ?? "Template"}
            </span>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
              {config.title}
            </p>
            <h3 className="line-clamp-2 text-3xl font-bold">{title}</h3>
            <p className="mt-2 text-lg text-white/85">{subtitle}</p>
            <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-6 text-white/80">
              {body}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
