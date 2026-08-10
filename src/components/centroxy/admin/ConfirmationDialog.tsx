"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmationDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md rounded-[10px] border border-stroke bg-white p-6 shadow-2 dark:border-dark-3 dark:bg-gray-dark"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-red/10 text-red">
          <AlertTriangle className="size-6" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-dark-4 dark:text-dark-6">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red/90"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
