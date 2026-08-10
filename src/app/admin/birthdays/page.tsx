"use client";

import { ModuleListPage } from "@/components/centroxy/modules/ModuleListPage";
import { moduleConfigs } from "@/data/centroxy/modules";

export default function BirthdaysPage() {
  const config = moduleConfigs.find((m) => m.key === "birthdays")!;
  return <ModuleListPage config={config} />;
}
