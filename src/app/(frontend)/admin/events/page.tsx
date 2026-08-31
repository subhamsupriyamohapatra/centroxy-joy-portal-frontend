"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function EventsPage() {
  const config = moduleConfigs.find((m) => m.key === "events")!;
  return <ModuleListPage config={config} />;
}
