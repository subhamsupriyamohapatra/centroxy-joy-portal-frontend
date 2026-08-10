"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Cake,
  Award,
  BriefcaseBusiness,
  Bell,
  CalendarDays,
  BadgeCheck,
  Newspaper,
  Settings,
  LayoutGrid,
  Database,
} from "lucide-react";

const ADMIN_MENU = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { label: "Thought of the Day", href: "/admin/thoughts", icon: Quote },
  { label: "Birthday Greetings", href: "/admin/birthdays", icon: Cake },
  { label: "Employee of the Month", href: "/admin/employees", icon: Award },
  { label: "New Customer", href: "/admin/customers", icon: BriefcaseBusiness },
  { label: "Announcements", href: "/admin/announcements", icon: Bell },
  { label: "Upcoming Events", href: "/admin/events", icon: CalendarDays },
  { label: "Participation", href: "/admin/participation", icon: BadgeCheck },
  { label: "Industry News", href: "/admin/news", icon: Newspaper },
  { label: "Zoho Sync", href: "/admin/zoho", icon: Database },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
