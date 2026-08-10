"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";

type ImageUploadProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
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
      <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
        {label}
      </label>
      <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-stroke bg-gray-2 p-4 text-center transition hover:border-primary dark:border-dark-3 dark:bg-dark-2">
        {value ? (
          <Image
            src={value}
            alt={label}
            width={220}
            height={140}
            className="max-h-32 w-auto rounded-lg object-contain"
          />
        ) : (
          <>
            <ImagePlus className="size-8 text-dark-5" />
            <span className="mt-2 text-sm font-medium text-dark-4 dark:text-dark-6">
              Upload image
            </span>
          </>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
          hidden
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </label>
    </div>
  );
}
