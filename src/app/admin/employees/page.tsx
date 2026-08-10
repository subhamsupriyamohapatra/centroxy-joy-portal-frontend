"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function EmployeesPage() {
  const config = moduleConfigs.find((m) => m.key === "employees")!;
  return <ModuleListPage config={config} />;
}
