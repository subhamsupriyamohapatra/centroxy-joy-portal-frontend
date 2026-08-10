export function LoadingSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4 h-10 w-64 animate-pulse rounded-lg bg-gray-2 dark:bg-dark-2" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-gray-2 dark:bg-dark-2"
          />
        ))}
      </div>
    </div>
  );
}
