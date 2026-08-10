import { resolvePlaceholder } from "./api-client";

export const zohoService = {
  async syncNow() {
    return resolvePlaceholder({
      data: {
        syncedAt: new Date().toISOString(),
        imported: 0,
      },
      message: "Frontend placeholder Zoho sync response",
    });
  },
};
