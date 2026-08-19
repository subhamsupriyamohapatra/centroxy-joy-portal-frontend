"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  searchEmployees,
  type PayloadEmployee,
} from "@/services/centroxy/payload.service";

type EmployeePickerProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (employee: PayloadEmployee) => void;
  disabled?: boolean;
};

export function EmployeePicker({
  value,
  onChange,
  onSelect,
  disabled,
}: EmployeePickerProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<PayloadEmployee[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleInputChange(input: string) {
    setQuery(input);
    onChange(input);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (input.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      const employees = await searchEmployees(input);
      setResults(employees);
      setIsOpen(true);
      setIsLoading(false);
    }, 300);
  }

  function handleSelect(employee: PayloadEmployee) {
    setQuery(employee.name);
    setIsOpen(false);
    onChange(employee.name);
    onSelect(employee);
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        value={query}
        disabled={disabled}
        onChange={(event) => handleInputChange(event.target.value)}
        placeholder="Type an employee name to search..."
        className="h-11 w-full rounded-lg border border-stroke bg-white px-4 text-sm outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
      />

      {isLoading && (
        <div className="absolute right-3 top-3 size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
          {results.map((employee) => (
            <li key={employee.id}>
              <button
                type="button"
                onClick={() => handleSelect(employee)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-gray-2 dark:hover:bg-dark-2"
              >
                {employee.photoUrl && (
                  <Image
                    src={employee.photoUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-dark dark:text-white">
                    {employee.name}
                  </span>
                  <span className="block truncate text-xs text-dark-4 dark:text-dark-6">
                    {[employee.designation, employee.department]
                      .filter(Boolean)
                      .join(" • ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && results.length === 0 && !isLoading && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-stroke bg-white p-3 text-sm text-dark-4 shadow-lg dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6">
          No employees found
        </div>
      )}
    </div>
  );
}
