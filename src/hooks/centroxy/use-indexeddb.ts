"use client";

import { indexedDBService } from "@/services/centroxy/indexeddb.service";
import type { ModuleContent, ModuleKey } from "@/types/centroxy";
import { useEffect, useState } from "react";

interface UseIndexedDBOptions {
  search?: string;
  status?: "all" | "draft" | "published" | "scheduled" | "archived";
  page?: number;
  pageSize?: number;
}

export function useIndexedDB<T extends ModuleContent>(
  key: ModuleKey,
  options: UseIndexedDBOptions = {},
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(options.page || 1);
  const [search, setSearch] = useState(options.search || "");
  const [status, setStatus] = useState(
    options.status || ("all" as const),
  );
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await indexedDBService.list<T>(key, {
          page,
          pageSize: options.pageSize || 8,
          search,
          status: status === "all" ? undefined : status,
        });

        if (response.data) {
          setData(response.data.data);
          setTotal(response.data.total);
          setTotalPages(response.data.totalPages || 1);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [key, page, search, status, options.pageSize]);

  async function createItem(item: T) {
    try {
      await indexedDBService.create(key, item);
      // Reload data
      const response = await indexedDBService.list<T>(key, {
        page: 1,
        pageSize: options.pageSize || 8,
      });
      if (response.data) {
        setData(response.data.data);
        setTotal(response.data.total);
        setPage(1);
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create item");
    }
  }

  async function updateItem(item: T) {
    try {
      await indexedDBService.update(key, item);
      // Reload data
      const response = await indexedDBService.list<T>(key, {
        page,
        pageSize: options.pageSize || 8,
        search,
        status: status === "all" ? undefined : status,
      });
      if (response.data) {
        setData(response.data.data);
        setTotal(response.data.total);
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update item");
    }
  }

  async function deleteItem(id: string) {
    try {
      await indexedDBService.delete(key, id);
      // Reload data
      const response = await indexedDBService.list<T>(key, {
        page,
        pageSize: options.pageSize || 8,
        search,
        status: status === "all" ? undefined : status,
      });
      if (response.data) {
        setData(response.data.data);
        setTotal(response.data.total);
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete item");
    }
  }

  async function getItem(id: string) {
    try {
      const response = await indexedDBService.get<T>(key, id);
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to get item");
    }
  }

  return {
    data,
    isLoading,
    error,
    page,
    search,
    status,
    total,
    totalPages,
    setPage,
    setSearch,
    setStatus,
    createItem,
    updateItem,
    deleteItem,
    getItem,
  };
}
