"use client";

import { ModuleFormPage } from "@/components/centroxy/modules/ModuleFormPage";
import { moduleConfigs } from "@/data/centroxy/modules";
import { useParams } from "next/navigation";

export default function EditBannerPage() {
  const params = useParams();
  const config = moduleConfigs.find((m) => m.key === "banners")!;
  return <ModuleFormPage config={config} mode="edit" itemId={params.id as string} />;
}
