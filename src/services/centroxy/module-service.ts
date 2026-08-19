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

export const dashboardService = {
  async getSummary() {
    const response = await apiClient.get("/dashboard");
    const dashData = response.data.data || {};
    const counts = dashData.counts || {};

    const data: DashboardSummary[] = [
      {
        label: "Today's Birthdays",
        value: String(counts.birthdays || 0),
        helper: "Published for today",
        gradient: "from-[#F59E0B] via-[#F97316] to-[#EF4444]",
        icon: Cake,
      },
      {
        label: "Today's Thought",
        value: String(counts.thoughts || 0),
        helper: "Active quote",
        gradient: "from-[#10B981] via-[#14B8A6] to-[#3B82F6]",
        icon: Quote,
      },
      {
        label: "Upcoming Events",
        value: String(counts.events || 0),
        helper: "Scheduled",
        gradient: "from-[#6D28D9] via-[#9333EA] to-[#DB2777]",
        icon: CalendarDays,
      },
      {
        label: "Employee of Month",
        value: String(counts.employees || 0),
        helper: "Recognition slide",
        gradient: "from-[#F97316] via-[#EAB308] to-[#84CC16]",
        icon: Trophy,
      },
      {
        label: "Latest Customer",
        value: String(counts.customers || 0),
        helper: "Customer slide",
        gradient: "from-[#2563EB] via-[#06B6D4] to-[#14B8A6]",
        icon: BriefcaseBusiness,
      },
      {
        label: "Announcements",
        value: String(counts.announcements || 0),
        helper: "Published notices",
        gradient: "from-[#EC4899] via-[#F43F5E] to-[#F97316]",
        icon: Bell,
      },
      {
        label: "Industry News",
        value: String(counts.news || 0),
        helper: "Curated updates",
        gradient: "from-[#111827] via-[#334155] to-[#2563EB]",
        icon: Newspaper,
      },
      {
        label: "Total Slides",
        value: String(dashData.totalSlides || 0),
        helper: "Total active display slides",
        gradient: "from-[#5750F1] via-[#7C3AED] to-[#06B6D4]",
        icon: BadgeCheck,
      },
    ];

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
