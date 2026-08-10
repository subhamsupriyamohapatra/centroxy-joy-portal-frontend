"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddThoughtPage() {
  const config = moduleConfigs.find((m) => m.key === "thoughts")!;
  return <ModuleFormPage config={config} mode="add" />;
}
