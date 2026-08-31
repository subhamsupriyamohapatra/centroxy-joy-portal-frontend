"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function BannersPage() {
  const config = moduleConfigs.find((m) => m.key === "banners")!;
  return <ModuleListPage config={config} />;
}
