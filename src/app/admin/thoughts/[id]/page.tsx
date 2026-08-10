"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";
import { useParams } from "next/navigation";

export default function ViewThoughtDetailsPage() {
  const params = useParams();
  const config = moduleConfigs.find((m) => m.key === "thoughts")!;
  return <ModuleFormPage config={config} mode="view" itemId={params.id as string} />;
}
