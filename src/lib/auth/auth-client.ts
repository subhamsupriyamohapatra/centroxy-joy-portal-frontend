"use client";

import { useEffect, useState } from "react";

type DemoUser = {
  name: string;
  email: string;
  image: string | null;
  bio?: string;
  phoneNumber?: number;
  role?: string;
};

type DemoSession = {
  user: DemoUser;
  session: {
    id: string;
  };
};

type AuthResult<T> = {
  data: T;
  error: { message?: string } | null;
};

const defaultUser: DemoUser = {
  name: "Centroxy Admin",
  email: "admin@centroxy.com",
  image: null,
  bio: "System Administrator",
  phoneNumber: 99033437865,
  role: "Administrator",
};

function getStoredUser(): DemoUser {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("centroxy_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          name: parsed.name || parsed.username || defaultUser.name,
          email: `${parsed.username || "admin"}@centroxy.com`,
          image: null,
          role: parsed.role || "Administrator",
        };
      }
    } catch (e) {
      // Fallback
    }
  }
  return defaultUser;
}

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCurrentSession(): DemoSession | null {
  const user = getStoredUser();
  return {
    user,
    session: {
      id: "centroxy-backend-session",
    },
  };
}

export const authClient = {
  async updateUser(update: Partial<DemoUser>): Promise<AuthResult<DemoSession>> {
    const session = getCurrentSession()!;
    const updated = {
      ...session,
      user: { ...session.user, ...update },
    };
    notifyListeners();
    return { data: updated, error: null };
  },
};

export const signIn = {
  async email(_input?: unknown): Promise<AuthResult<DemoSession | null>> {
    notifyListeners();
    return { data: getCurrentSession(), error: null };
  },
  async social(_input?: unknown): Promise<AuthResult<DemoSession | null>> {
    notifyListeners();
    return { data: getCurrentSession(), error: null };
  },
};

export const signUp = {
  async email(input: {
    name?: string;
    email?: string;
    password?: string;
    callbackURL?: string;
  }): Promise<AuthResult<DemoSession>> {
    notifyListeners();
    return { data: getCurrentSession()!, error: null };
  },
};

export async function signOut(): Promise<AuthResult<null>> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("centroxy_token");
    localStorage.removeItem("centroxy_user");
  }
  notifyListeners();
  return { data: null, error: null };
}

export async function getSession(): Promise<AuthResult<DemoSession | null>> {
  return { data: getCurrentSession(), error: null };
}

export function useSession() {
  const [data, setData] = useState(getCurrentSession());

  useEffect(() => subscribe(() => setData(getCurrentSession())), []);

  return {
    data,
    isPending: false,
  };
}
