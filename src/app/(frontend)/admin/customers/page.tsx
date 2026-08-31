"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function CustomersPage() {
  const config = moduleConfigs.find((m) => m.key === "customers")!;
  return <ModuleListPage config={config} />;
}
