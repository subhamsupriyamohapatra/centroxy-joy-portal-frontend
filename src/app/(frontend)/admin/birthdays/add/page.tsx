"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddBirthdayPage() {
  const config = moduleConfigs.find((m) => m.key === "birthdays")!;
  return <ModuleFormPage config={config} mode="add" />;
}
