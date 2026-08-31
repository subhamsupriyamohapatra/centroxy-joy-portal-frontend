"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddBannerPage() {
  const config = moduleConfigs.find((m) => m.key === "banners")!;
  return <ModuleFormPage config={config} mode="add" />;
}
