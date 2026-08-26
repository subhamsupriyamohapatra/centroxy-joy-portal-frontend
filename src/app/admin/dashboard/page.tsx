"use client";

import { motion } from "framer-motion";
import { dashboardService } from "@/services/centroxy/dashboard.service";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { DashboardSummary } from "@/types/centroxy";

export default function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await dashboardService.getSummary();
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to load dashboard summary", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dark dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-dark-4 dark:text-dark-6">
          Welcome to Centroxy Joy Portal Admin
        </p>
      </motion.div>

      {/* Summary Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white dark:bg-gray-dark rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {summary.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-white dark:bg-gray-dark border border-stroke dark:border-dark-3 p-5 shadow-1 hover:shadow-2 transition overflow-hidden group cursor-pointer"
              >
                {item.href ? (
                  <Link href={item.href} className="block">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 group-hover:scale-110 transition`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <p className="text-sm text-dark-4 dark:text-dark-6">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold text-dark dark:text-white mt-2">
                      {item.value}
                    </p>
                    <p className="text-xs text-dark-4 dark:text-dark-6 mt-2">
                      {item.helper}
                    </p>
                  </Link>
                ) : (
                  <>
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 group-hover:scale-110 transition`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <p className="text-sm text-dark-4 dark:text-dark-6">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold text-dark dark:text-white mt-2">
                      {item.value}
                    </p>
                    <p className="text-xs text-dark-4 dark:text-dark-6 mt-2">
                      {item.helper}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white dark:bg-gray-dark border border-stroke dark:border-dark-3 p-6 shadow-1"
      >
        <h2 className="text-xl font-bold text-dark dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/thoughts"
            className="p-4 rounded-lg border border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-dark dark:text-white">
                Add Thought
              </span>
              <ArrowRight className="size-4" />
            </div>
          </Link>

          <Link
            href="/admin/birthdays"
            className="p-4 rounded-lg border border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-dark dark:text-white">
                Add Birthday
              </span>
              <ArrowRight className="size-4" />
            </div>
          </Link>

          <Link
            href="/admin/announcements"
            className="p-4 rounded-lg border border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-dark dark:text-white">
                Add Announcement
              </span>
              <ArrowRight className="size-4" />
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
