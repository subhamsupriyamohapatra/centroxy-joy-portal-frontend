import Link from "next/link";
import { Plus } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function PageHeader({
  title,
  description,
  actionHref,
  actionLabel = "Add New",
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-dark-4 dark:text-dark-6">
            {description}
          </p>
        )}
      </div>

      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
        >
          <Plus className="size-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
