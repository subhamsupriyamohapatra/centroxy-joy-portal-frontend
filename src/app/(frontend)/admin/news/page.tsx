"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function NewsPage() {
  const config = moduleConfigs.find((m) => m.key === "news")!;
  return <ModuleListPage config={config} />;
}
