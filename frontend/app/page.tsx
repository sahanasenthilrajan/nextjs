"use client";

import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isSignUp ? "/auth/register" : "/auth/login";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Authentication failed. Please check your credentials.";
        setMessage(errorMsg);
        setMessageType("error");
        return;
      }

      // Store token if returned
      if (data.accessToken) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("tarcin_access_token", data.accessToken);
        storage.setItem("tarcin_user_email", data.user?.email || email);
      }

      setMessageType("success");
      setMessage(
        isSignUp
          ? `Account created successfully! Welcome to TARCIN, ${data.user?.email || email}.`
          : `Signed in successfully as ${data.user?.email || email}. Welcome back!`
      );
    } catch {
      setMessageType("error");
      setMessage(
        `Unable to reach backend at ${API_URL}. Please ensure the NestJS backend is running on port 3001.`
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    setMessageType("info");
    setMessage("Google authentication will be connected in the next phase.");
  }

  return (
    <main className="min-h-screen w-full overflow-hidden bg-white">
      <div className="grid min-h-screen w-full grid-cols-1 overflow-hidden bg-white md:grid-cols-2">
        {/* LEFT: TARCIN BRANDING */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#32105f] via-[#54209a] to-[#762bd0] p-8 text-white sm:p-12 lg:p-16">
          <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-[0.2em]">TARCIN</h1>
            <p className="mt-1 text-xs font-medium tracking-[0.35em] text-purple-200">
              ROBOTIC LLP
            </p>
            <div className="mt-5 h-1 w-12 rounded-full bg-white/70" />
          </div>

          <div className="relative z-10 my-12">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-purple-100 backdrop-blur">
              COMPANY WORKSPACE
            </span>

            <h2 className="mt-7 max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
              Welcome to a smarter way of working.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-purple-100">
              Access your workspace, stay connected with your team, and keep
              your projects moving forward.
            </p>

            <div className="mt-10 grid max-w-sm grid-cols-2 gap-3">
              <div className="rotate-[-2deg] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition hover:rotate-0">
                <span className="text-xs text-purple-200">01</span>
                <p className="mt-3 text-sm font-semibold">Your Workspace</p>
                <p className="mt-1 text-xs text-purple-200">One place to begin</p>
              </div>

              <div className="translate-y-4 rotate-[2deg] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition hover:rotate-0">
                <span className="text-xs text-purple-200">02</span>
                <p className="mt-3 text-sm font-semibold">Project Updates</p>
                <p className="mt-1 text-xs text-purple-200">Stay informed</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-6">
            <p className="text-sm font-medium">
              Technology. Innovation. Collaboration.
            </p>
            <p className="mt-2 text-xs text-purple-200">
              TARCIN ROBOTIC LLP · Secure workspace access
            </p>
          </div>
        </section>

        {/* RIGHT: LOGIN / REGISTER FORM */}
        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-12 lg:px-20">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold tracking-[0.2em] text-purple-700">
                TARCIN ACCOUNT
              </p>

              <h2 className="text-3xl font-semibold text-[#241b31]">
                {isSignUp ? "Create account" : "Welcome back"}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {isSignUp
                  ? "Register a new account to join your workspace."
                  : "Sign in to continue to your workspace."}
              </p>
            </div>

            {/* GOOGLE SIGN IN */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-purple-300 hover:bg-purple-50"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.2 13.22l7.98 6.19C13.07 13.72 18.03 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.98 46.98 31.9 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.18 28.59a14.4 14.4 0 0 1 0-9.18L3.2 13.22a23.94 23.94 0 0 0 0 21.56l7.98-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.87 2.3-8.18 2.3-5.97 0-11.03-4.22-12.82-9.91L3.2 34.78C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => {
                        setMessageType("info");
                        setMessage("Password reset will be added later.");
                      }}
                      className="text-xs font-semibold text-purple-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    required
                    minLength={8}
                    placeholder={
                      isSignUp
                        ? "Choose a strong password (min 8 chars)"
                        : "Enter your password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 pr-16 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-purple-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 accent-purple-700"
                  />
                  Remember me
                </label>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#7026d1] to-[#8e35ed] py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
              >
                {loading
                  ? isSignUp
                    ? "Creating account..."
                    : "Signing in..."
                  : isSignUp
                  ? "Create account"
                  : "Sign in"}
              </button>

              {/* Mode toggle */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage("");
                  }}
                  className="text-xs font-medium text-purple-700 hover:text-purple-900 hover:underline transition"
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Create one"}
                </button>
              </div>

              {message && (
                <div
                  role="status"
                  className={`rounded-xl p-3 text-center text-xs ${
                    messageType === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : messageType === "error"
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-purple-50 text-purple-800 border border-purple-200"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Quick developer demo credentials reminder */}
              <div className="rounded-lg bg-gray-50 p-2.5 text-center text-[11px] text-gray-500">
                Demo user: <span className="font-semibold text-gray-700">demo@tarcin.com</span> / <span className="font-semibold text-gray-700">Password123!</span>
              </div>
            </form>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-center text-xs text-gray-500">
                Need assistance? Contact your team administrator.
              </p>

              <p className="mt-5 text-center text-[10px] tracking-wider text-gray-400">
                TARCIN ROBOTIC LLP · SECURE ACCESS
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
