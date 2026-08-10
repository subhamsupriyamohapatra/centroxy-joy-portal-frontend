"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function AddParticipationPage() {
  const config = moduleConfigs.find((m) => m.key === "participation")!;
  return <ModuleFormPage config={config} mode="add" />;
}
