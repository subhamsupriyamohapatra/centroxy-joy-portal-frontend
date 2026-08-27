"use client";

import { FilterPanel } from "@/components/centroxy/admin/FilterPanel";
import { LoadingSkeleton } from "@/components/centroxy/admin/LoadingSkeleton";
import { Pagination } from "@/components/centroxy/admin/Pagination";
import { SearchBar } from "@/components/centroxy/admin/SearchBar";
import { StatusBadge } from "@/components/centroxy/admin/StatusBadge";
import { ConfirmationDialog } from "@/components/centroxy/admin/ConfirmationDialog";
import { EmptyState } from "@/components/centroxy/admin/EmptyState";
import { PageHeader } from "@/components/centroxy/admin/PageHeader";
import { useModuleData } from "@/hooks/centroxy/use-module-data";
import type { ModuleConfig, ModuleContent } from "@/types/centroxy";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type ModuleListPageProps = {
  config: ModuleConfig;
};

function getValue(item: ModuleContent, field: string) {
  const value = item[field as keyof ModuleContent];
  return typeof value === "string" ? value : "";
}

export function ModuleListPage({ config }: ModuleListPageProps) {
  const {
    data,
    isLoading,
    page,
    search,
    setPage,
    setSearch,
    setStatus,
    status,
    total,
    totalPages,
    deleteItem,
  } = useModuleData(config.key);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function confirmDelete() {
    if (!deleteId) {
      return;
    }

    try {
      await deleteItem(deleteId);
      toast.success(`${config.singular} deleted`);
    } catch (error) {
      console.error(`[Delete ${config.singular}]`, error);
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actionHref={`${config.basePath}/add`}
        actionLabel={`Add ${config.singular}`}
      />

      <div className="mb-4 flex flex-col justify-between gap-3 rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark xl:flex-row xl:items-center">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel status={status} onStatusChange={setStatus} />
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : data.length === 0 ? (
        <EmptyState
          title={`No ${config.title.toLowerCase()} found`}
          description="Try a different search, clear filters, or add a new slide."
        />
      ) : (
        <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-left">
              <thead className="bg-gray-2 text-sm text-dark-4 dark:bg-dark-2 dark:text-dark-6">
                <tr>
                  <th className="px-4 py-3 font-semibold">Preview</th>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Details</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Template</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-dark-3">
                {data.map((item) => {
                  const image = getValue(item, config.imageField) || item.image;

                  return (
                    <tr key={item.id} className="hover:bg-gray-2/60 dark:hover:bg-dark-2/70">
                      <td className="px-4 py-4">
                        <div className="relative size-14 overflow-hidden rounded-lg bg-gray-2 dark:bg-dark-2">
                          {image && (
                            <Image
                              src={image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-dark dark:text-white">
                          {getValue(item, config.primaryField)}
                        </p>
                        <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
                          {config.dateField ? getValue(item, config.dateField) : item.updatedAt}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-dark-4 dark:text-dark-6">
                        {getValue(item, config.secondaryField)}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-4 text-sm font-medium capitalize text-dark dark:text-white">
                        {item.template?.replace("-", " ") || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`${config.basePath}/${item.id}/view`}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-stroke text-dark-4 hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                          >
                            <Eye className="size-4" />
                          </Link>
                          <Link
                            href={`${config.basePath}/${item.id}/edit`}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-stroke text-dark-4 hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                          >
                            <Edit className="size-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteId(item.id)}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-stroke text-dark-4 hover:border-red hover:text-red dark:border-dark-3 dark:text-dark-6"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-stroke px-4 py-3 text-sm text-dark-4 dark:border-dark-3 dark:text-dark-6 sm:flex-row sm:items-center sm:justify-between">
            <span>{total} records found</span>
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(deleteId)}
        title={`Delete ${config.singular}?`}
        description="This will permanently delete this item from the database."
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
