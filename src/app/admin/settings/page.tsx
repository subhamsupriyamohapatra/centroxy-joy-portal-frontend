"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { settingService } from "@/services/centroxy/setting.service";
import type { PortalSettings } from "@/types/centroxy";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<PortalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingService.getSettings();
        setSettings(response.data);
      } catch (error) {
        console.error("[Load Settings Error]", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const response = await settingService.saveSettings(settings);
      if (response.data) {
        setSettings(response.data);
      }
      toast.success("Settings saved successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("[Save Settings Error]", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-dark dark:text-white">Settings</h1>
        <div className="rounded-2xl bg-white dark:bg-gray-dark p-8 animate-pulse h-96" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-4 dark:text-dark-6">Failed to load settings</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-dark dark:text-white">Settings</h1>
        <p className="mt-2 text-dark-4 dark:text-dark-6">
          Configure your Centroxy Joy Portal
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-dark border border-stroke dark:border-dark-3 p-8 shadow-1">
        <div className="space-y-6">
          {/* Company Logo */}
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Company Logo URL
            </label>
            <input
              type="text"
              value={settings.companyLogo}
              onChange={(e) =>
                setSettings({ ...settings, companyLogo: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          {/* Slide Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Slide Duration (seconds)
              </label>
              <input
                type="number"
                value={settings.slideDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slideDuration: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
              />
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    theme: e.target.value as PortalSettings["theme"],
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="corporate">Corporate</option>
                <option value="celebration">Celebration</option>
              </select>
            </div>
          </div>

          {/* Background Music */}
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Background Music URL
            </label>
            <input
              type="text"
              value={settings.backgroundMusic}
              onChange={(e) =>
                setSettings({ ...settings, backgroundMusic: e.target.value })
              }
              placeholder="Leave empty to disable"
              className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          {/* Display Resolution and Animation Speed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Display Resolution
              </label>
              <select
                value={settings.displayResolution}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    displayResolution: e.target.value as PortalSettings["displayResolution"],
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
              >
                <option value="1920x1080">1920x1080</option>
                <option value="1366x768">1366x768</option>
                <option value="3840x2160">3840x2160 (4K)</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Animation Speed
              </label>
              <select
                value={settings.animationSpeed}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    animationSpeed: e.target.value as PortalSettings["animationSpeed"],
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary transition"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
