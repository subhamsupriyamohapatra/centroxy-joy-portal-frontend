"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { moduleService } from "@/services/centroxy/module-service";
import type { Quote } from "@/types/centroxy";

type AddQuoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (quote: Quote) => void;
};

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function AddQuoteDialog({ open, onOpenChange, onSaved }: AddQuoteDialogProps) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!open) {
    return null;
  }

  const wordCount = countWords(quote);

  async function handleSave() {
    setError(null);

    if (!quote.trim()) {
      setError("Quotation is required");
      return;
    }

    if (wordCount > 12) {
      setError("Quotation cannot be more than 12 words");
      return;
    }

    setIsSaving(true);

    try {
      const response = await moduleService.save<Quote>("quotes", {
        id: `temp-quote-${Date.now()}`,
        quote: quote.trim(),
        author: author.trim(),
        status: "published",
        template: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as unknown as Quote);

      onSaved(response.data);
      setQuote("");
      setAuthor("");
      onOpenChange(false);
      toast.success("Quotation added");
    } catch {
      setError("Failed to add quotation. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative w-full max-w-lg rounded-[10px] border border-stroke bg-white p-6 shadow-xl dark:border-dark-3 dark:bg-gray-dark">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-dark dark:text-white">Add Quotation</h3>
            <p className="text-sm text-dark-4 dark:text-dark-6">
              Save a quote to the library and use it in your thought.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-2 transition"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 flex items-center justify-between text-sm font-medium text-dark dark:text-white">
                Quotation
                <span
                  className={`ml-2 text-xs ${
                    wordCount > 12 ? "text-red" : "text-dark-4 dark:text-dark-6"
                  }`}
                >
                  ({wordCount}/12 words)
                </span>
              </span>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={4}
                autoFocus
                placeholder="Write the quotation…"
                className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Author
              </span>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Who said it?"
                className="h-11 w-full rounded-lg border border-stroke bg-white px-4 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </label>
          </div>

          {error && (
            <span className="mt-2 block text-xs font-medium text-red">{error}</span>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-stroke px-5 py-2.5 text-sm font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
              ) : null}
              {isSaving ? "Saving..." : "Add Quotation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}