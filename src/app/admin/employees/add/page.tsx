"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddEmployeePage() {
  const config = moduleConfigs.find((m) => m.key === "employees")!;
  return <ModuleFormPage config={config} mode="add" />;
}
