"use client";

import { ImageUpload } from "@/components/centroxy/admin/ImageUpload";
import { PageHeader } from "@/components/centroxy/admin/PageHeader";
import { SlidePreview } from "@/components/centroxy/admin/SlidePreview";
import { TemplateGallery } from "@/components/centroxy/admin/TemplateGallery";
import { moduleService } from "@/services/centroxy/module-service";
import { pexelsService } from "@/services/centroxy/pexels.service";
import { EmployeePicker } from "@/components/centroxy/modules/EmployeePicker";
import { AddQuoteDialog } from "@/components/centroxy/modules/AddQuoteDialog";
import type { ModuleConfig, ModuleContent, ModuleField, Quote } from "@/types/centroxy";
import { Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type ModuleFormPageProps = {
  config: ModuleConfig;
  mode: "add" | "edit" | "view";
  itemId?: string;
};

type FormValues = Record<string, string>;

type QuoteOptionValue = {
  id: string;
  quote: string;
  author: string;
};

function makeDefaults(config: ModuleConfig): FormValues {
  const defaults: FormValues = {
    id: `temp-${config.key}-${Date.now()}`,
    status: "draft",
    template: config.defaultTemplate ?? config.templates[0]?.id ?? "classic",
  };

  config.fields.forEach((field) => {
    defaults[field.name] =
      field.type === "status"
        ? "draft"
        : field.type === "select"
          ? (field.options?.[0] ?? "")
          : "";
  });

  return defaults;
}

function getInputType(field: ModuleField) {
  if (field.type === "date" || field.type === "time") {
    return field.type;
  }

  return "text";
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function ModuleFormPage({ config, itemId, mode }: ModuleFormPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(mode !== "add");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteOptions, setQuoteOptions] = useState<QuoteOptionValue[]>([]);
  const [addQuoteOpen, setAddQuoteOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(
    config.defaultTemplate ?? config.templates[0]?.id ?? "classic",
  );
  const isView = mode === "view";

  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const defaultValues = useMemo(() => makeDefaults(config), [config]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const values = watch();

  useEffect(() => {
    let mounted = true;

    if (mode === "add" || !itemId) {
      reset(defaultValues);
      setIsLoading(false);
      return;
    }

    moduleService.get(config.key, itemId).then((response) => {
      if (!mounted) {
        return;
      }

      const item = response.data;
      const nextValues = item
        ? Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key, String(value ?? "")]),
          )
        : defaultValues;

      reset(nextValues);
        setSelectedTemplate(nextValues.template || defaultValues.template);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`[Load ${config.singular}]`, error);
        if (mounted) {
          reset(defaultValues);
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [config.key, defaultValues, itemId, mode, reset]);

  useEffect(() => {
    if (config.key !== "thoughts") {
      return;
    }

    let mounted = true;

    moduleService
      .list<Quote>("quotes", { pageSize: 200 })
      .then((response) => {
        if (mounted) {
          setQuoteOptions(response.data.data);
        }
      })
      .catch(() => {
        if (mounted) {
          setQuoteOptions([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, [config.key]);

  function handleTemplateChange(templateId: string) {
    setSelectedTemplate(templateId);
    setValue("template", templateId, { shouldDirty: true });
  }

  async function handleQuoteSaved(saved: Quote) {
    try {
      const response = await moduleService.list<Quote>("quotes", { pageSize: 200 });
      setQuoteOptions(response.data.data);
    } catch {
      // keep current options if refresh fails
    }

    setValue("quote", saved.quote, { shouldDirty: true });
    if (saved.author) {
      setValue("author", saved.author, { shouldDirty: true });
    }
    setAddQuoteOpen(false);
  }

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    const payload = {
      ...data,
      id: data.id || `temp-${config.key}-${Date.now()}`,
      status: data.status || "draft",
      template: data.template || selectedTemplate,
      image: data[config.imageField],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as ModuleContent;

    const recordPayload = payload as unknown as Record<string, string>;

    if (config.key === "thoughts" && !recordPayload.backgroundImage) {
      const backgrounds = await pexelsService.getNatureBackgrounds(1);
      if (backgrounds.length > 0) {
        recordPayload.backgroundImage = backgrounds[0];
        recordPayload.image = backgrounds[0];
      }
    }

    try {
      await moduleService.save(config.key, payload);
      toast.success(`${config.singular} ${mode === "edit" ? "updated" : "created"}`);
      router.push(config.basePath);
    } catch (error) {
      console.error(`[Save ${config.singular}]`, error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-2 dark:bg-dark-2" />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-14 animate-pulse rounded-lg bg-gray-2 dark:bg-dark-2" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={`${mode === "add" ? "Add" : mode === "edit" ? "Edit" : "View"} ${config.singular}`}
        description={config.description}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`grid gap-6 ${
          config.showPreview === false
            ? ""
            : "xl:grid-cols-[minmax(0,1fr)_28rem]"
        }`}
      >
        <div className="space-y-6">
          <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <h2 className="mb-5 text-lg font-bold text-dark dark:text-white">
              Content Details
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {config.fields.map((field) => {
                if (field.type === "employee") {
                  return (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      render={({ field: controllerField }) => (
                        <label className="md:col-span-2">
                          <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            {field.label}
                          </span>
                          <EmployeePicker
                            value={controllerField.value}
                            onChange={controllerField.onChange}
                            disabled={isView}
                            onSelect={(employee) => {
                              if (employee.photoUrl) {
                                setValue(config.imageField, employee.photoUrl, {
                                  shouldDirty: true,
                                });
                              }
                            }}
                          />
                        </label>
                      )}
                    />
                  );
                }

                if (field.type === "image") {
                  return (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      render={({ field: controllerField }) => (
                        <div className="md:col-span-2">
                          <ImageUpload
                            label={field.label}
                            value={controllerField.value}
                            onChange={controllerField.onChange}
                          />
                        </div>
                      )}
                    />
                  );
                }

                if (field.type === "quote") {
                  const selectedId =
                    quoteOptions.find((q) => q.quote === (values[field.name] || ""))?.id ?? "";

                  return (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      rules={
                        field.required ? { required: "Please select a quotation" } : undefined
                      }
                      render={({ field: controllerField, formState }) => (
                        <label className="md:col-span-2">
                          <span className="mb-2 flex items-center justify-between text-sm font-medium text-dark dark:text-white">
                            {field.label}
                            {!isView && (
                              <button
                                type="button"
                                onClick={() => setAddQuoteOpen(true)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 dark:border-dark-3 dark:hover:bg-dark-2 transition"
                              >
                                <Plus className="size-3.5" />
                                Add Quotation
                              </button>
                            )}
                          </span>
                          <select
                            value={selectedId}
                            disabled={isView}
                            onChange={(e) => {
                              const selected = quoteOptions.find(
                                (q) => q.id === e.target.value,
                              );
                              controllerField.onChange(selected ? selected.quote : "");
                              if (selected) {
                                setValue("author", selected.author || "", {
                                  shouldDirty: true,
                                });
                              }
                            }}
                            className="h-11 w-full rounded-lg border border-stroke bg-white px-4 text-sm outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                          >
                            <option value="">
                              {quoteOptions.length === 0
                                ? "No quotations yet — click “Add Quotation”"
                                : "Select a quotation…"}
                            </option>
                            {quoteOptions.map((q) => (
                              <option key={q.id} value={q.id}>
                                {`“${q.quote}” — ${q.author || "Unknown"}`}
                              </option>
                            ))}
                          </select>
                          {formState.errors[field.name] && (
                            <span className="mt-1 block text-xs font-medium text-red">
                              {formState.errors[field.name]?.message as string}
                            </span>
                          )}
                        </label>
                      )}
                    />
                  );
                }

                if (field.type === "textarea") {
                  const isQuoteText = config.key === "quotes" && field.name === "quote";
                  const wordCount = isQuoteText ? countWords(values[field.name] || "") : 0;

                  return (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      rules={
                        isQuoteText
                          ? {
                              required: field.required
                                ? "Quotation is required"
                                : undefined,
                              validate: {
                                maxWords: (value: string) =>
                                  countWords(value || "") <= 12 ||
                                  "Quotation cannot be more than 12 words",
                              },
                            }
                          : field.required
                            ? { required: "This field is required" }
                            : undefined
                      }
                      render={({ field: controllerField, formState }) => (
                        <label className="md:col-span-2">
                          <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            {field.label}
                            {isQuoteText && (
                              <span
                                className={`ml-2 text-xs ${
                                  wordCount > 12 ? "text-red" : "text-dark-4 dark:text-dark-6"
                                }`}
                              >
                                ({wordCount}/12 words)
                              </span>
                            )}
                          </span>
                          <textarea
                            {...controllerField}
                            disabled={isView}
                            rows={5}
                            className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                          />
                          {formState.errors[field.name] && (
                            <span className="mt-1 block text-xs font-medium text-red">
                              {formState.errors[field.name]?.message as string}
                            </span>
                          )}
                        </label>
                      )}
                    />
                  );
                }

                if (field.type === "select" || field.type === "status") {
                  const options =
                    field.type === "status"
                      ? ["draft", "scheduled", "published", "archived"]
                      : field.options ?? [];

                  return (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      render={({ field: controllerField }) => (
                        <label>
                          <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
                            {field.label}
                          </span>
                          <select
                            {...controllerField}
                            disabled={isView}
                            className="h-11 w-full rounded-lg border border-stroke bg-white px-4 text-sm capitalize outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option.replace("-", " ")}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    />
                  );
                }

                const isDate = field.type === "date";
                const needsFuture = isDate && field.futureOnly;
                const isThoughtEnd =
                  config.key === "thoughts" && field.name === "endDate";

                const rules = {
                  ...(field.required
                    ? { required: "This field is required" }
                    : {}),
                  ...(needsFuture
                    ? {
                        validate: {
                          notInPast: (value: string) =>
                            !value || value >= today
                              ? true
                              : "Date cannot be in the past",
                          ...(isThoughtEnd
                            ? {
                                afterStart: (value: string) =>
                                  !value ||
                                  !values.startDate ||
                                  value >= values.startDate
                                    ? true
                                    : "End date must be on or after the start date",
                              }
                            : {}),
                        },
                      }
                    : {}),
                };

                return (
                  <Controller
                    key={field.name}
                    name={field.name}
                    control={control}
                    rules={rules}
                    render={({ field: controllerField }) => (
                      <label>
                        <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
                          {field.label}
                        </span>
                        <input
                          {...controllerField}
                          disabled={isView}
                          type={getInputType(field)}
                          min={needsFuture ? today : undefined}
                          className="h-11 w-full rounded-lg border border-stroke bg-white px-4 text-sm outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                        />
                        {errors[field.name] && (
                          <span className="mt-1 block text-xs font-medium text-red">
                            {errors[field.name]?.message as string}
                          </span>
                        )}
                      </label>
                    )}
                  />
                );
              })}
            </div>
          </section>

          {config.templates.length > 0 && (
            <TemplateGallery
              templates={config.templates}
              value={selectedTemplate}
              onChange={handleTemplateChange}
            />
          )}

          {!isView && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push(config.basePath)}
                className="rounded-lg border border-stroke px-5 py-2.5 text-sm font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
                ) : (
                  <Save className="size-4" />
                )}
                {isSubmitting
                  ? mode === "edit" ? "Updating..." : "Publishing..."
                  : mode === "edit" ? "Update" : "Publish"}
              </button>
            </div>
          )}
        </div>

        {config.showPreview !== false && (
          <SlidePreview
            config={config}
            values={{ ...values, template: selectedTemplate }}
          />
        )}
      </form>

      <AddQuoteDialog
        open={addQuoteOpen}
        onOpenChange={setAddQuoteOpen}
        onSaved={handleQuoteSaved}
      />
    </>
  );
}
