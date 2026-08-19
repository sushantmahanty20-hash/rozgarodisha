"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(60);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const OTP_LENGTH = 6;

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== "")) {
      handleVerify(newOtp.join(""));
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted) {
      const newOtp = pasted.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
      setOtp(newOtp);
      if (newOtp.every((d) => d !== "")) {
        handleVerify(newOtp.join(""));
      } else {
        const nextEmpty = newOtp.findIndex((d) => d === "");
        if (nextEmpty !== -1) inputRefs.current[nextEmpty]?.focus();
      }
    }
  }

  async function handleVerify(code: string) {
    setIsVerifying(true);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Verification failed");
      }

      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    try {
      await fetch("/api/auth/resend-verification", { method: "POST" });
      setResendTimer(60);
      toast.success("Verification code resent!");
    } catch {
      toast.error("Failed to resend code");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">
          Verify your email
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the 6-digit code we sent to your email address
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={isVerifying}
            className="h-14 w-12 rounded-xl border bg-background text-center text-xl font-semibold transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
          />
        ))}
      </div>

      {isVerifying && (
        <p className="text-center text-sm text-muted-foreground">
          Verifying...
        </p>
      )}

      <div className="text-center">
        {resendTimer > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in{" "}
            <span className="font-medium text-foreground">{resendTimer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm font-medium text-primary hover:underline"
          >
            Resend code
          </button>
        )}
      </div>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
