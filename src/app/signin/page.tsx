"use client";

/**
 * Sign In Screen — Sprint 2
 * Firebase Authentication with forgot password flow
 * Connected to AuthContext for global auth state
 */

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { isValidEmail } from "@/lib/utils";
import { Mail, Lock, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import type { SignInFormData, FormErrors } from "@/types";
import Image from "next/image";

export default function SignInPage() {
  useAuthGuard({ requireAuth: false, redirectTo: "/dashboard" });
  const { signIn, forgotPassword, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const newErrors: FormErrors = {};
    if (touched.email && formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
  }, [formData, touched]);

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!showForgotPassword && !formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!validateAll()) return;

    setIsSubmitting(true);
    const result = await signIn(formData.email, formData.password);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setAuthError(result.error || "Sign in failed. Please check your credentials.");
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setTouched({ email: true });
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    const result = await forgotPassword(formData.email);
    setIsSubmitting(false);

    if (result.success) {
      setResetSent(true);
    } else {
      setAuthError(result.error || "Failed to send reset email.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <Loader2 className="w-8 h-8 animate-spin text-emerald" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-navy-900 px-4 py-8">
      <div className="w-full max-w-md">
        <Link
          href="/welcome"
          className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-900 dark:text-navy-400 dark:hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back
        </Link>

        <div className="text-center mb-8">
          <Image
            src="/logo.jpg"
            alt="WISECRAFT"
            width={56}
            height={56}
            className="rounded-2xl object-contain mx-auto mb-4 shadow-soft"
            priority
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">
            {showForgotPassword ? "Reset Password" : "Welcome Back"}
          </h1>
          <p className="text-navy-500 dark:text-navy-400 text-sm">
            {showForgotPassword
              ? "Enter your email to receive a reset link"
              : "Sign in to continue your growth journey"}
          </p>
        </div>

        <Card variant="default" padding="lg">
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium">
              {authError}
            </div>
          )}

          {resetSent && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
              <CheckCircle size={16} aria-hidden="true" />
              Password reset email sent! Check your inbox.
            </div>
          )}

          <form onSubmit={showForgotPassword ? handleForgotPassword : handleSignIn} className="space-y-5" noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData((p) => ({ ...p, email: e.target.value }));
                setTouched((p) => ({ ...p, email: true }));
                if (authError) setAuthError("");
              }}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              error={errors.email}
              icon={<Mail size={18} aria-hidden="true" />}
              autoComplete="email"
            />

            {!showForgotPassword && (
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, password: e.target.value }));
                    setTouched((p) => ({ ...p, password: true }));
                    if (authError) setAuthError("");
                  }}
                  onBlur={() => setTouched((p) => ({ ...p, password: true }))}
                  error={errors.password}
                  icon={<Lock size={18} aria-hidden="true" />}
                  autoComplete="current-password"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setAuthError("");
                      setResetSent(false);
                    }}
                    className="text-sm font-medium text-royal-600 hover:text-royal-700 dark:text-royal-400 dark:hover:text-royal-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              className="mt-2"
            >
              {showForgotPassword ? "Send Reset Link" : "Sign In"}
            </Button>

            {showForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                  setAuthError("");
                }}
                className="w-full text-center text-sm text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white transition-colors"
              >
                Back to Sign In
              </button>
            )}
          </form>
        </Card>

        {!showForgotPassword && (
          <p className="text-center text-sm text-navy-500 dark:text-navy-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-royal-600 hover:text-royal-700 dark:text-royal-400 dark:hover:text-royal-300 transition-colors"
            >
              Create Account
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
