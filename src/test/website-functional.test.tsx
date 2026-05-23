import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "@/App";

vi.mock("@/integrations/supabase/client", () => {
  const auth = {
    onAuthStateChange: vi.fn(() => ({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    })),
    getSession: vi.fn(async () => ({ data: { session: null } })),
    signInWithPassword: vi.fn(async () => ({ error: null })),
    signUp: vi.fn(async () => ({ error: null })),
    signOut: vi.fn(async () => ({ error: null })),
  };

  return {
    supabase: {
      auth,
      from: vi.fn(),
    },
  };
});

describe("website functional smoke", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    window.scrollTo = vi.fn();
  });

  it("renders the main landing page experience", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/The Machines Cost/i)).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /Find My Career Path/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start My Free Assessment/i })).toBeInTheDocument();
    expect(screen.getByText(/Your Path Starts/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to Climb/i)).toBeInTheDocument();
  });

  it("shows authentication entrypoint on dashboard route for unauthenticated users", async () => {
    window.history.pushState({}, "", "/dashboard");

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
