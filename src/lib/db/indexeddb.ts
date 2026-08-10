import type { ModuleContent, ModuleKey } from "@/types/centroxy";

const DB_NAME = "CentralxyDB";
const DB_VERSION = 1;

const STORES: Record<ModuleKey, string> = {
  thoughts: "thoughts",
  birthdays: "birthdays",
  employees: "employees",
  customers: "customers",
  announcements: "announcements",
  events: "events",
  participation: "participation",
  news: "news",
};

let db: IDBDatabase | null = null;

export async function initDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      Object.values(STORES).forEach((storeName) => {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };
  });
}

export async function addItem<T extends ModuleContent>(
  key: ModuleKey,
  item: T,
): Promise<T> {
  const database = await initDB();
  const storeName = STORES[key];

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(item);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(item);
  });
}

export async function updateItem<T extends ModuleContent>(
  key: ModuleKey,
  item: T,
): Promise<T> {
  const database = await initDB();
  const storeName = STORES[key];

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(item);
  });
}

export async function getItem<T extends ModuleContent>(
  key: ModuleKey,
  id: string,
): Promise<T | undefined> {
  const database = await initDB();
  const storeName = STORES[key];

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getAllItems<T extends ModuleContent>(
  key: ModuleKey,
): Promise<T[]> {
  const database = await initDB();
  const storeName = STORES[key];

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

export async function deleteItem(key: ModuleKey, id: string): Promise<void> {
  const database = await initDB();
  const storeName = STORES[key];

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function clearStore(key: ModuleKey): Promise<void> {
  const database = await initDB();
  const storeName = STORES[key];

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
