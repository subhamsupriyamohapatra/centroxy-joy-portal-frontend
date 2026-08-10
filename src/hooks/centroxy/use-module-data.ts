"use client";

import { moduleService } from "@/services/centroxy/module-service";
import type {
  ModuleContent,
  ModuleKey,
  PaginatedResult,
  PublishStatus,
} from "@/types/centroxy";
import { useEffect, useMemo, useState } from "react";

export function useModuleData<T extends ModuleContent>(moduleKey: ModuleKey) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PublishStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const [result, setResult] = useState<PaginatedResult<T>>({
    data: [],
    page: 1,
    pageSize: 8,
    total: 0,
  });

  const refresh = () => setTrigger((t) => t + 1);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    moduleService
      .list<T>(moduleKey, { search, status, page, pageSize: 8 })
      .then((response) => {
        if (isMounted) {
          setResult(response.data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [moduleKey, page, search, status, trigger]);

  const deleteItem = async (id: string) => {
    await moduleService.remove(moduleKey, id);
    refresh();
  };

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(result.total / result.pageSize)),
    [result.pageSize, result.total],
  );

  return {
    data: result.data,
    isLoading,
    page,
    search,
    setPage,
    setSearch,
    setStatus,
    status,
    total: result.total,
    totalPages,
    refresh,
    deleteItem,
  };
}
