"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ModuleConfig, ModuleContent } from "@/types/centroxy";

interface ModuleFormProps {
  config: ModuleConfig;
  initialData?: ModuleContent;
  onSubmit: (data: ModuleContent) => Promise<void>;
  isLoading?: boolean;
}

export function ModuleForm({
  config,
  initialData,
  onSubmit,
  isLoading = false,
}: ModuleFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ModuleContent>>(
    initialData ||
      ({ status: "draft", template: config.defaultTemplate || "minimal" } as Partial<ModuleContent>),
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await onSubmit(formData as ModuleContent);
      toast.success(
        `${config.singular} ${initialData ? "updated" : "created"} successfully`,
      );
      router.push(config.basePath);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save",
      );
    }
  }

  const handleChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={config.basePath}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
        >
          <ArrowLeft className="size-5 text-dark dark:text-white" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            {initialData ? "Edit" : "Add"} {config.singular}
          </h1>
          <p className="mt-2 text-dark-4 dark:text-dark-6">
            {initialData
              ? `Update ${config.singular.toLowerCase()} details`
              : `Create a new ${config.singular.toLowerCase()}`}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800 p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Status
            </label>
            <select
              value={(formData as any).status || "draft"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:border-primary transition"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Template */}
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Template
            </label>
            <select
              value={(formData as any).template || config.defaultTemplate || "minimal"}
              onChange={(e) => handleChange("template", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:border-primary transition"
            >
              <option value="minimal">Minimal</option>
              <option value="glass">Glass</option>
              <option value="corporate">Corporate</option>
              <option value="modern">Modern</option>
              <option value="premium">Premium</option>
              <option value="classic">Classic</option>
              <option value="spotlight">Spotlight</option>
              <option value="award">Award</option>
              <option value="celebration">Celebration</option>
              <option value="notice">Notice</option>
              <option value="breaking-news">Breaking News</option>
              <option value="event-card">Event Card</option>
              <option value="poster">Poster</option>
              <option value="timeline">Timeline</option>
              <option value="achievement">Achievement</option>
              <option value="gallery">Gallery</option>
              <option value="news-card">News Card</option>
              <option value="magazine">Magazine</option>
            </select>
          </div>

          {/* Generic Text Fields */}
          {Object.keys(formData).map((key) => {
            if (
              ["status", "template", "id", "createdAt", "updatedAt"].includes(
                key,
              )
            )
              return null;

            const value = (formData as any)[key];
            if (typeof value !== "string") return null;

            return (
              <div key={key}>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {key.toLowerCase().includes("description") ||
                key.toLowerCase().includes("message") ||
                key.toLowerCase().includes("body") ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:border-primary transition"
                  />
                ) : key.toLowerCase().includes("date") ||
                  key.toLowerCase().includes("time") ? (
                  <input
                    type={
                      key.toLowerCase().includes("time") ? "time" : "date"
                    }
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:border-primary transition"
                  />
                ) : key.toLowerCase().includes("image") ||
                  key.toLowerCase().includes("photo") ||
                  key.toLowerCase().includes("logo") ||
                  key.toLowerCase().includes("banner") ? (
                  <input
                    type="url"
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:border-primary transition"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-dark dark:text-white focus:outline-none focus:border-primary transition"
                  />
                )}
              </div>
            );
          })}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:from-primary/90 hover:to-primary/70 disabled:opacity-50 transition"
            >
              {isLoading
                ? "Saving..."
                : initialData
                  ? "Update"
                  : "Create"}
            </button>
            <Link
              href={config.basePath}
              className="flex-1 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-dark dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
