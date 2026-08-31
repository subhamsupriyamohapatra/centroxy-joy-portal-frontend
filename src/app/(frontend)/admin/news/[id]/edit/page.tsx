"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";
import { useParams } from "next/navigation";

export default function EditNewsPage() {
  const params = useParams();
  const config = moduleConfigs.find((m) => m.key === "news")!;
  return <ModuleFormPage config={config} mode="edit" itemId={params.id as string} />;
}
