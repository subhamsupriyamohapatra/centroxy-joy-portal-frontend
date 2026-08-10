"use client";

import {
  addItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
  initDB,
} from "@/lib/db/indexeddb";
import type {
  ApiResponse,
  ModuleContent,
  ModuleKey,
  PaginatedResult,
  QueryParams,
} from "@/types/centroxy";

function filterAndPaginate<T extends ModuleContent>(
  items: T[],
  params: QueryParams = {},
): PaginatedResult<T> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 8;
  const search = params.search?.trim().toLowerCase() ?? "";

  const filtered = items.filter((item) => {
    const matchesStatus =
      !params.status || params.status === "all" || item.status === params.status;
    const matchesSearch =
      !search ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search);

    return matchesStatus && matchesSearch;
  });

  const start = (page - 1) * pageSize;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: filtered.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages,
  };
}

export const indexedDBService = {
  async init() {
    await initDB();
  },

  async list<T extends ModuleContent>(
    key: ModuleKey,
    params?: QueryParams,
  ): Promise<ApiResponse<PaginatedResult<T>>> {
    const items = await getAllItems<T>(key);
    const data = filterAndPaginate(items, params);

    return {
      data,
      message: "Retrieved items from IndexedDB",
    };
  },

  async get<T extends ModuleContent>(
    key: ModuleKey,
    id: string,
  ): Promise<ApiResponse<T | undefined>> {
    const item = await getItem<T>(key, id);

    return {
      data: item,
      message: "Retrieved item from IndexedDB",
    };
  },

  async create<T extends ModuleContent>(
    key: ModuleKey,
    item: T,
  ): Promise<ApiResponse<T>> {
    const newItem = {
      ...item,
      id: item.id || `${key}-${Date.now()}`,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addItem(key, newItem);

    return {
      data: newItem,
      message: "Item created in IndexedDB",
    };
  },

  async update<T extends ModuleContent>(
    key: ModuleKey,
    item: T,
  ): Promise<ApiResponse<T>> {
    const updatedItem = {
      ...item,
      updatedAt: new Date().toISOString(),
    };

    await updateItem(key, updatedItem);

    return {
      data: updatedItem,
      message: "Item updated in IndexedDB",
    };
  },

  async delete(
    key: ModuleKey,
    id: string,
  ): Promise<ApiResponse<{ id: string; key: ModuleKey }>> {
    await deleteItem(key, id);

    return {
      data: { id, key },
      message: "Item deleted from IndexedDB",
    };
  },
};
