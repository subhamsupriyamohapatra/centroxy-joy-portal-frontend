"use client";

import { AdminShell } from "@/components/centroxy/admin/AdminShell";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return isLoginPage ? children : <AdminShell>{children}</AdminShell>;
}
