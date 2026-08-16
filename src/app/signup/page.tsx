"use client";

/**
 * Sign Up Screen — Sprint 2
 * Firebase Authentication with real-time validation
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
import { cn, isValidEmail, isValidPassword } from "@/lib/utils";
import { User, Mail, Lock, Globe, ArrowLeft, Loader2 } from "lucide-react";
import type { SignUpFormData, FormErrors } from "@/types";
import Image from "next/image";

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Nigeria",
  "South Africa", "India", "Germany", "France", "Brazil", "Mexico",
  "Japan", "South Korea", "Singapore", "United Arab Emirates", "Other",
];

export default function SignUpPage() {
  useAuthGuard({ requireAuth: false, redirectTo: "/dashboard" });
  const { signUp, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    password: "",
    country: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  // Real-time validation
  useEffect(() => {
    const newErrors: FormErrors = {};
    if (touched.fullName && !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (touched.email && formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (touched.password && formData.password && !isValidPassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with a letter and a number";
    }
    if (touched.country && !formData.country) {
      newErrors.country = "Please select your country";
    }
    setErrors(newErrors);
  }, [formData, touched]);

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!isValidPassword(formData.password)) newErrors.password = "Password must be at least 8 characters with a letter and a number";
    if (!formData.country) newErrors.country = "Please select your country";
    setErrors(newErrors);
    setTouched({ fullName: true, email: true, password: true, country: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!validateAll()) return;

    setIsSubmitting(true);
    const result = await signUp(formData.email, formData.password, formData.fullName);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setAuthError(result.error || "Failed to create account. Please try again.");
    }
  };

  const handleChange = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (authError) setAuthError("");
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
            Create Account
          </h1>
          <p className="text-navy-500 dark:text-navy-400 text-sm">
            Start your journey to financial growth
          </p>
        </div>

        <Card variant="default" padding="lg">
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, fullName: true }))}
              error={errors.fullName}
              icon={<User size={18} aria-hidden="true" />}
              autoComplete="name"
              aria-describedby={errors.fullName ? "fullname-error" : undefined}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              error={errors.email}
              icon={<Mail size={18} aria-hidden="true" />}
              autoComplete="email"
              aria-describedby={errors.email ? "email-error" : undefined}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              error={errors.password}
              icon={<Lock size={18} aria-hidden="true" />}
              autoComplete="new-password"
              aria-describedby={errors.password ? "password-error" : undefined}
            />

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                Country
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true">
                  <Globe size={18} />
                </div>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, country: true }))}
                  className={cn(
                    "w-full rounded-2xl border bg-white px-4 py-3.5 text-navy-900 appearance-none",
                    "transition-all duration-200 ease-out",
                    "focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-200",
                    "dark:border-navy-600 dark:bg-navy-800 dark:text-white",
                    "dark:focus:border-royal-400 dark:focus:ring-royal-900",
                    "pl-11",
                    errors.country ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-navy-200"
                  )}
                  aria-describedby={errors.country ? "country-error" : undefined}
                >
                  <option value="" disabled>Select your country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy-400" aria-hidden="true">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors.country && (
                <p id="country-error" className="mt-1.5 text-sm text-red-500 font-medium">{errors.country}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              className="mt-2"
            >
              Create Account
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-navy-500 dark:text-navy-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-royal-600 hover:text-royal-700 dark:text-royal-400 dark:hover:text-royal-300 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
