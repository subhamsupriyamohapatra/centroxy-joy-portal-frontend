"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function ThoughtsPage() {
  const config = moduleConfigs.find((m) => m.key === "thoughts")!;
  return <ModuleListPage config={config} />;
}
