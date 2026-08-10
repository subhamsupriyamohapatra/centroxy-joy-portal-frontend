"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddCustomerPage() {
  const config = moduleConfigs.find((m) => m.key === "customers")!;
  return <ModuleFormPage config={config} mode="add" />;
}
