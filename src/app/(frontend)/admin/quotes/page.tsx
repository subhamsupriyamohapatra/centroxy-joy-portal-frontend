"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function QuotesPage() {
  const config = moduleConfigs.find((m) => m.key === "quotes")!;
  return <ModuleListPage config={config} />;
}