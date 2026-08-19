"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { toast } from "sonner";
import type { OAuthProvider } from "@/lib/oauth-providers";

const AUTH_ERRORS: Record<string, string> = {
  OAuthSignin: "Could not start sign in with the selected provider. Please try again.",
  OAuthCallback: "Something went wrong while signing in with the provider. Please try again.",
  OAuthCreateAccount: "Could not create an account with the selected provider.",
  Callback: "Something went wrong during sign in. Please try again.",
  AccessDenied: "You do not have permission to sign in.",
  Configuration: "Sign in is not configured correctly. Please contact support.",
  CredentialsSignin: "Invalid email or password.",
  Default: "Something went wrong. Please try again.",
};

function AuthErrorBanner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return null;

  return (
    <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{AUTH_ERRORS[error] ?? AUTH_ERRORS.Default}</p>
    </div>
  );
}

export function LoginForm({ oauthProviders }: { oauthProviders: OAuthProvider[] }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema) as Resolver<LoginInput>,
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(AUTH_ERRORS[result.error] ?? result.error);
        return;
      }

      const session = await getSession();
      const role = session?.user?.role;

      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        router.push("/admin");
      } else if (role === "EMPLOYER" || role === "HR_MANAGER" || role === "RECRUITER") {
        router.push("/employer");
      } else {
        router.push("/job-seeker");
      }
      toast.success("Welcome back!");
    } catch {
      toast.error(AUTH_ERRORS.Default);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <AuthErrorBanner />

      {/* Social logins */}
      <OAuthButtons providers={oauthProviders} disabled={isLoading} />

      {oauthProviders.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              or continue with email
            </span>
          </div>
        </div>
      )}

      {/* Email form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-input"
              {...register("remember")}
            />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* OTP option */}
      <div className="text-center">
        <Link
          href="/verify-email"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sign in with OTP instead
        </Link>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
