"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";
import { useParams } from "next/navigation";

export default function ViewEmployeePage() {
  const params = useParams();
  const config = moduleConfigs.find((m) => m.key === "employees")!;
  return <ModuleFormPage config={config} mode="view" itemId={params.id as string} />;
}
