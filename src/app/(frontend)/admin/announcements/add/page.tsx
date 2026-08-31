"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddAnnouncementPage() {
  const config = moduleConfigs.find((m) => m.key === "announcements")!;
  return <ModuleFormPage config={config} mode="add" />;
}
