"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";
import { useParams } from "next/navigation";

export default function ViewCustomerPage() {
  const params = useParams();
  const config = moduleConfigs.find((m) => m.key === "customers")!;
  return <ModuleFormPage config={config} mode="view" itemId={params.id as string} />;
}
