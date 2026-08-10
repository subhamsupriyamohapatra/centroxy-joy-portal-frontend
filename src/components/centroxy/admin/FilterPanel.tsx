"use client";

import type { PublishStatus } from "@/types/centroxy";

const statuses: Array<PublishStatus | "all"> = [
  "all",
  "published",
  "scheduled",
  "draft",
  "archived",
];

type FilterPanelProps = {
  status: PublishStatus | "all";
  onStatusChange: (status: PublishStatus | "all") => void;
};

export function FilterPanel({ status, onStatusChange }: FilterPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onStatusChange(item)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
            status === item
              ? "border-primary bg-primary text-white"
              : "border-stroke bg-white text-dark-4 hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
