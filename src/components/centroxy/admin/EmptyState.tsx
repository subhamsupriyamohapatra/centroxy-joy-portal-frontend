import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No records found",
  description = "Create a new item or adjust your filters.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-[10px] border border-dashed border-stroke bg-white p-8 text-center dark:border-dark-3 dark:bg-gray-dark">
      <span className="flex size-14 items-center justify-center rounded-full bg-gray-2 text-dark-4 dark:bg-dark-2 dark:text-dark-6">
        <Inbox className="size-7" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-dark dark:text-white">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-dark-4 dark:text-dark-6">
        {description}
      </p>
    </div>
  );
}
