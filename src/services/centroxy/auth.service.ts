import { apiClient } from "./api-client";

export const authService = {
  async login(credentials: { username: string; password: string; remember?: boolean }) {
    const response = await apiClient.post("/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });

    if (response.data.success && response.data.data?.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("centroxy_token", response.data.data.token);
        localStorage.setItem("centroxy_user", JSON.stringify(response.data.data.user));
      }
    }

    return response.data;
  },

  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch (e) {
      // Ignore network logout errors
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("centroxy_token");
        localStorage.removeItem("centroxy_user");
      }
    }

    return { success: true, message: "Logged out successfully" };
  },
};
