"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search records...",
}: SearchBarProps) {
  return (
    <label className="relative block w-full sm:max-w-sm">
      <span className="sr-only">Search</span>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-stroke bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
      />
    </label>
  );
}
