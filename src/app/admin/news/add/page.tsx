"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddNewsPage() {
  const config = moduleConfigs.find((m) => m.key === "news")!;
  return <ModuleFormPage config={config} mode="add" />;
}