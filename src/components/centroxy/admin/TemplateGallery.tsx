"use client";

import type { TemplateOption } from "@/types/centroxy";
import { TemplateCard } from "./TemplateCard";

type TemplateGalleryProps = {
  templates: TemplateOption[];
  value: string;
  onChange: (templateId: string) => void;
};

export function TemplateGallery({
  templates,
  value,
  onChange,
}: TemplateGalleryProps) {
  return (
    <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-dark dark:text-white">
          Choose Template
        </h2>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Select a display style and preview it before publishing.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={value === template.id}
            onSelect={onChange}
          />
        ))}
      </div>
    </section>
  );
}
