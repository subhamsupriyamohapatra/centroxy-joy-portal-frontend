"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddEventPage() {
  const config = moduleConfigs.find((m) => m.key === "events")!;
  return <ModuleFormPage config={config} mode="add" />;
}
