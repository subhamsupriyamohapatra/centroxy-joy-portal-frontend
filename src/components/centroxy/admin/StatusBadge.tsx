import type { PublishStatus } from "@/types/centroxy";

const statusClassName: Record<PublishStatus, string> = {
  draft: "bg-gray-100 text-gray-700 dark:bg-dark-3 dark:text-dark-6",
  scheduled: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  archived: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
};

export function StatusBadge({ status }: { status: PublishStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClassName[status]}`}
    >
      {status}
    </span>
  );
}
