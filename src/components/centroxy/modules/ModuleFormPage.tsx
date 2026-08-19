"use client";

import { ImageUpload } from "@/components/centroxy/admin/ImageUpload";
import { PageHeader } from "@/components/centroxy/admin/PageHeader";
import { SlidePreview } from "@/components/centroxy/admin/SlidePreview";
import { TemplateGallery } from "@/components/centroxy/admin/TemplateGallery";
import { moduleService } from "@/services/centroxy/module-service";
import { EmployeePicker } from "@/components/centroxy/modules/EmployeePicker";
import type { ModuleConfig, ModuleContent, ModuleField } from "@/types/centroxy";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ModuleFormPageProps = {
  config: ModuleConfig;
  mode: "add" | "edit" | "view";
  itemId?: string;
};

type FormValues = Record<string, string>;

function makeDefaults(config: ModuleConfig): FormValues {
  const defaults: FormValues = {
    id: `temp-${config.key}-${Date.now()}`,
    status: "draft",
    template: config.templates[0]?.id ?? "classic",
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

export function ModuleFormPage({ config, itemId, mode }: ModuleFormPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(mode !== "add");
  const [selectedTemplate, setSelectedTemplate] = useState(
    config.templates[0]?.id ?? "classic",
  );
  const isView = mode === "view";

  const defaultValues = useMemo(() => makeDefaults(config), [config]);
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
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
    });

    return () => {
      mounted = false;
    };
  }, [config.key, defaultValues, itemId, mode, reset]);

  function handleTemplateChange(templateId: string) {
    setSelectedTemplate(templateId);
    setValue("template", templateId, { shouldDirty: true });
  }

  async function onSubmit(data: FormValues) {
    const payload = {
      ...data,
      id: data.id || `temp-${config.key}-${Date.now()}`,
      status: data.status || "draft",
      template: data.template || selectedTemplate,
      image: data[config.imageField],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as ModuleContent;

    await moduleService.save(config.key, payload);
    toast.success(`${config.singular} ${mode === "edit" ? "updated" : "created"}`);
    router.push(config.basePath);
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

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]">
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

                if (field.type === "textarea") {
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
                          <textarea
                            {...controllerField}
                            disabled={isView}
                            rows={5}
                            className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-sm outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                          />
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
                        <input
                          {...controllerField}
                          disabled={isView}
                          type={getInputType(field)}
                          className="h-11 w-full rounded-lg border border-stroke bg-white px-4 text-sm outline-none transition focus:border-primary disabled:opacity-70 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                        />
                      </label>
                    )}
                  />
                );
              })}
            </div>
          </section>

          <TemplateGallery
            templates={config.templates}
            value={selectedTemplate}
            onChange={handleTemplateChange}
          />

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
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
              >
                <Save className="size-4" />
                {mode === "edit" ? "Update" : "Publish"}
              </button>
            </div>
          )}
        </div>

        <SlidePreview
          config={config}
          values={{ ...values, template: selectedTemplate }}
        />
      </form>
    </>
  );
}
