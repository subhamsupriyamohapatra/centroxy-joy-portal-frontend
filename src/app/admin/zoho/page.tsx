"use client";

import { motion } from "framer-motion";
import { Database, RefreshCw } from "lucide-react";

export default function ZohoSyncPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-dark dark:text-white">
          Zoho Sync
        </h1>
        <p className="mt-2 text-dark-4 dark:text-dark-6">
          Synchronize your Centroxy data with Zoho CRM
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-dark border border-stroke dark:border-dark-3 p-8 shadow-1 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Database className="size-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-dark dark:text-white mt-4">
          Coming Soon
        </h2>
        <p className="text-dark-4 dark:text-dark-6 mt-2">
          Zoho CRM integration is being prepared
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-white font-medium flex items-center gap-2 mx-auto hover:bg-primary/90 transition disabled:opacity-50"
          disabled
        >
          <RefreshCw className="size-4" />
          Sync Data
        </motion.button>
      </div>
    </motion.div>
  );
}
