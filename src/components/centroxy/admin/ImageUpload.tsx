"use client";

import Image from "next/image";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { useRef } from "react";

type ImageUploadProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFile(file?: File) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
        {label}
      </span>

      {value ? (
        <div className="overflow-hidden rounded-xl border border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
          <div className="relative flex min-h-36 items-center justify-center p-4">
            <Image
              src={value}
              alt={label}
              width={220}
              height={140}
              className="max-h-32 w-auto rounded-lg object-contain"
            />
          </div>
          <div className="flex items-center gap-2 border-t border-stroke p-3 dark:border-dark-3">
            <button
              type="button"
              onClick={openPicker}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <RefreshCw className="size-4" />
              Replace image
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-red transition hover:bg-red hover:text-white dark:border-dark-3"
            >
              <Trash2 className="size-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          className="flex min-h-36 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-stroke bg-gray-2 p-4 text-center transition hover:border-primary dark:border-dark-3 dark:bg-dark-2"
        >
          <ImagePlus className="size-8 text-dark-5" />
          <span className="mt-2 text-sm font-medium text-dark-4 dark:text-dark-6">
            Upload image
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </div>
  );
}
