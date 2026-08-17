"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeRole, setActiveRole] = React.useState<"jobseeker" | "employer">(
    "jobseeker"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "jobseeker",
      acceptTerms: false as any,
    },
  });

  function switchRole(newRole: "jobseeker" | "employer") {
    setActiveRole(newRole);
    setValue("role", newRole);
  }

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Registration failed");
      }

      toast.success("Account created! Check your email for verification.");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  function handleOAuth(provider: string) {
    signIn(provider, { callbackUrl: "/job-seeker" });
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">Create an account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join thousands of professionals finding their dream jobs
        </p>
      </div>

      {/* Role selector */}
      <div className="grid grid-cols-2 gap-2 rounded-xl border bg-muted p-1">
        {(["jobseeker", "employer"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => switchRole(r)}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
              activeRole === r
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {r === "jobseeker" ? "Job Seeker" : "Employer"}
          </button>
        ))}
      </div>

      {/* Social signups */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" onClick={() => handleOAuth("google")}>
          Google
        </Button>
        <Button variant="outline" onClick={() => handleOAuth("linkedin")}>
          LinkedIn
        </Button>
        <Button variant="outline" onClick={() => handleOAuth("microsoft")}>
          Microsoft
        </Button>
      </div>

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("role")} value={activeRole} />

        <Input
          label="Full Name"
          placeholder="John Doe"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone (optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
          leftIcon={<Phone className="h-4 w-4" />}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-input"
            {...register("acceptTerms")}
          />
          <span className="text-sm text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" className="w-full" loading={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
