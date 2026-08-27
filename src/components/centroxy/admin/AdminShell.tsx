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

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("centroxy_token");
      localStorage.removeItem("centroxy_user");
    }
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#020d1a]">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || mobileMenuOpen) && (
          <motion.aside
            key="admin-sidebar"
            initial={{ x: -290 }}
            animate={{ x: 0 }}
            exit={{ x: -290 }}
            transition={{ duration: 0.3 }}
            className="fixed md:sticky md:top-0 w-[290px] h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-[#020d1a] border-r border-gray-200 dark:border-gray-800 z-40 overflow-y-auto shadow-lg dark:shadow-2xl"
          >
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-[#1a2332]">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <Image
                    src="/centroxy/image/site-logo-black.svg"
                    alt="Centroxy"
                    width={160}
                    height={160}
                />
              </Link>

              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <X className="size-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-3 space-y-1">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Menu
              </p>
              <ul className="space-y-1">
                {ADMIN_MENU.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary dark:from-primary/20 dark:to-primary/10 border-l-2 border-primary"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon className="size-5 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-[#1a2332] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 shadow-sm dark:shadow-lg">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between">
            {/* Left Side - Menu Toggle */}
            <button
              onClick={() =>
                window.innerWidth < 768
                  ? setMobileMenuOpen(!mobileMenuOpen)
                  : setSidebarOpen(!sidebarOpen)
              }
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-600 dark:text-gray-300"
            >
              {sidebarOpen || mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>

            {/* Center - Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >


            </motion.div>

            {/* Right Side - Logout Button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all bg-gradient-to-r from-red-500/10 to-red-500/5 text-red-600 dark:text-red-400 hover:from-red-500/20 hover:to-red-500/10 dark:hover:from-red-500/30 dark:hover:to-red-500/20 border border-red-200 dark:border-red-900/50"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
