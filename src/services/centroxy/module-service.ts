import type {
  ApiResponse,
  DashboardSummary,
  DisplaySlide,
  ModuleContent,
  ModuleKey,
  PaginatedResult,
  PortalSettings,
  QueryParams,
} from "@/types/centroxy";
import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Cake,
  Newspaper,
  Quote,
  Trophy,
} from "lucide-react";
import { apiClient } from "./api-client";

export const moduleEndpointMap: Record<ModuleKey, string> = {
  thoughts: "/thoughts",
  birthdays: "/birthdays",
  employees: "/employees",
  customers: "/customers",
  announcements: "/announcements",
  events: "/events",
  participation: "/participation",
  news: "/news",
};

export const moduleService = {
  async list<T extends ModuleContent>(key: ModuleKey, params?: QueryParams) {
    const endpoint = moduleEndpointMap[key];
    const response = await apiClient.get(endpoint, { params });
    const data: PaginatedResult<T> = {
      data: (response.data.data?.data || []).map((item: any) => ({
        ...item,
        id: item._id || item.id,
      })),
      page: response.data.data?.page || 1,
      pageSize: response.data.data?.limit || 10,
      total: response.data.data?.total || 0,
    };
    return { data, message: response.data.message };
  },

  async get<T extends ModuleContent>(key: ModuleKey, id: string) {
    const endpoint = moduleEndpointMap[key];
    const response = await apiClient.get(`${endpoint}/${id}`);
    const item = response.data.data ? { ...response.data.data, id: response.data.data._id || response.data.data.id } : undefined;
    return { data: item as T | undefined, message: response.data.message };
  },

  async save<T extends ModuleContent>(key: ModuleKey, item: T) {
    const endpoint = moduleEndpointMap[key];
    const isEdit = Boolean(item.id && !item.id.startsWith("temp-"));
    let response;

    // Check if item contains file payload or standard JSON
    const formData = new FormData();
    Object.keys(item).forEach((k) => {
      const val = (item as any)[k];
      if (val !== undefined && val !== null) {
        formData.append(k, val);
      }
    });

    if (isEdit) {
      response = await apiClient.put(`${endpoint}/${item.id}`, item);
    } else {
      const { id: _ignored, ...payload } = item as unknown as Record<string, unknown>;
      response = await apiClient.post(endpoint, payload);
    }

    const saved = response.data.data ? { ...response.data.data, id: response.data.data._id || response.data.data.id } : item;
    return { data: saved as T, message: response.data.message };
  },

  async remove(key: ModuleKey, id: string) {
    const endpoint = moduleEndpointMap[key];
    const response = await apiClient.delete(`${endpoint}/${id}`);
    return { data: { id, key }, message: response.data.message };
  },
};

const dashboardModuleHrefs: Partial<Record<ModuleKey, string>> = {
  birthdays: "/admin/birthdays",
  thoughts: "/admin/thoughts",
  events: "/admin/events",
  employees: "/admin/employees",
  customers: "/admin/customers",
  announcements: "/admin/announcements",
  news: "/admin/news",
};

const dashboardCardMap: { countKey: string; moduleKey?: ModuleKey; label: string; helper: string; gradient: string; icon: any }[] = [
  { countKey: "birthdays", moduleKey: "birthdays", label: "Today's Birthdays", helper: "Published for today", gradient: "from-[#F59E0B] via-[#F97316] to-[#EF4444]", icon: Cake },
  { countKey: "thoughts", moduleKey: "thoughts", label: "Today's Thought", helper: "Active quote", gradient: "from-[#10B981] via-[#14B8A6] to-[#3B82F6]", icon: Quote },
  { countKey: "events", moduleKey: "events", label: "Upcoming Events", helper: "Scheduled", gradient: "from-[#6D28D9] via-[#9333EA] to-[#DB2777]", icon: CalendarDays },
  { countKey: "employees", moduleKey: "employees", label: "Employee of Month", helper: "Recognition slide", gradient: "from-[#F97316] via-[#EAB308] to-[#84CC16]", icon: Trophy },
  { countKey: "customers", moduleKey: "customers", label: "Latest Customer", helper: "Customer slide", gradient: "from-[#2563EB] via-[#06B6D4] to-[#14B8A6]", icon: BriefcaseBusiness },
  { countKey: "announcements", moduleKey: "announcements", label: "Announcements", helper: "Published notices", gradient: "from-[#EC4899] via-[#F43F5E] to-[#F97316]", icon: Bell },
  { countKey: "news", moduleKey: "news", label: "Industry News", helper: "Curated updates", gradient: "from-[#111827] via-[#334155] to-[#2563EB]", icon: Newspaper },
  { countKey: "totalSlides", label: "Total Slides", helper: "Total active display slides", gradient: "from-[#5750F1] via-[#7C3AED] to-[#06B6D4]", icon: BadgeCheck },
];

export const dashboardService = {
  async getSummary() {
    const response = await apiClient.get("/dashboard");
    const dashData = response.data.data || {};
    const counts = dashData.counts || {};

    const data: DashboardSummary[] = dashboardCardMap.map((card) => ({
      label: card.label,
      value: String(card.countKey === "totalSlides" ? (dashData.totalSlides || 0) : (counts[card.countKey] || 0)),
      helper: card.helper,
      gradient: card.gradient,
      icon: card.icon,
      href: card.moduleKey ? dashboardModuleHrefs[card.moduleKey] : undefined,
    }));

    return { data, message: response.data.message };
  },

  async getActivity() {
    const response = await apiClient.get("/dashboard");
    return {
      data: response.data.data?.recentActivities || [],
      message: response.data.message,
    };
  },
};

export const displayService = {
  async getSlides() {
    const response = await apiClient.get("/display");
    const slides: DisplaySlide[] = (response.data.data || []).map((slide: any) => ({
      ...slide,
      id: slide._id || slide.id,
    }));
    return { data: slides, message: response.data.message };
  },
};

export const settingService = {
  async getSettings() {
    const response = await apiClient.get("/settings");
    return { data: response.data.data as PortalSettings, message: response.data.message };
  },

  async saveSettings(settings: PortalSettings) {
    const response = await apiClient.put("/settings", settings);
    return { data: response.data.data as PortalSettings, message: response.data.message };
  },
};
