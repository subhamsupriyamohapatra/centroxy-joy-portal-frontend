"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AnnouncementsPage() {
  const config = moduleConfigs.find((m) => m.key === "announcements")!;
  return <ModuleListPage config={config} />;
}
