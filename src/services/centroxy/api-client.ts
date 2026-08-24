import axios from "axios";
import { toast } from "sonner";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002/api";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * Set to true on a request to suppress the global error toast
     * (the caller then handles error messaging itself).
     */
    skipErrorToast?: boolean;
  }
}

const FALLBACK_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check the submitted data.",
  401: "Your session has expired or is invalid. Please sign in again.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "This record already exists or conflicts with existing data.",
  413: "The submitted data is too large.",
  422: "Validation failed. Please check the submitted data.",
  429: "Too many requests. Please slow down and try again later.",
  500: "Something went wrong on the server. Please try again later.",
  502: "The server is unreachable. Please try again later.",
  503: "The service is temporarily unavailable. Please try again later.",
};

function extractBackendMessage(data: unknown): string | undefined {
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data && typeof data === "object") {
    const maybeMessage = (data as { message?: unknown }).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim()) {
      return maybeMessage;
    }
  }

  return undefined;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("centroxy_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const backendMessage = extractBackendMessage(error.response?.data);

    const userMessage =
      backendMessage ??
      (status ? FALLBACK_MESSAGES[status] : undefined) ??
      (error.code === "ERR_NETWORK"
        ? "Cannot reach the server. Check your connection and try again."
        : "Unexpected error. Please try again.");

    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("centroxy_token");
      localStorage.removeItem("centroxy_user");

      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }

    if (
      typeof window !== "undefined" &&
      !error.config?.skipErrorToast
    ) {
      toast.error(userMessage);
    }

    return Promise.reject(Object.assign(error, { userMessage }));
  }
);

export function resolvePlaceholder<T>(data: T, delay = 120) {
  return new Promise<T>((resolve) => {
    globalThis.setTimeout(() => resolve(data), delay);
  });
}
