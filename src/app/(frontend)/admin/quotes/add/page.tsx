"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddQuotePage() {
  const config = moduleConfigs.find((m) => m.key === "quotes")!;
  return <ModuleFormPage config={config} mode="add" />;
}