import InputPassword from "#/components/InputPassword";
import InputText from "#/components/InputText";
import useForgotPassword from "#/hooks/useForgotPassword";
import useResetPassword from "#/hooks/useResetPassword";
import { Button } from "#/components/ui/button";
import type { ResetPasswordCredentials } from "#/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "#/schemas/auth.schema";
import { getSession } from "#/server/authServerFunctions";
import { Spinner } from "#/components/ui/spinner";

export const Route = createFileRoute("/forgot-password")({
  beforeLoad: async () => {
    const { user } = await getSession();
    if (user) throw redirect({ to: "/" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const resetForm = useForm({ resolver: zodResolver(resetPasswordSchema) });
  const forgotForm = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [step, setStep] = useState<"email" | "otp">("email");
  const forgotMutation = useForgotPassword();
  const resetMutation = useResetPassword();

  const onSubmitForgotForm = async (data: { email: string }) => {
    setStep("otp");
    forgotMutation.mutateAsync(data.email);
  };

  const onSubmitResetForm = async (data: ResetPasswordCredentials) => {
    const payload = {
      resetCode: data.otp,
      newPassword: data.newPassword,
      email: forgotForm.getValues("email"),
    };

    await resetMutation.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* INDICATOR */}
      <div className="w-full max-w-md">
        <div className="flex items-center  gap-2 mb-6">
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              step === "email" ? "bg-primary" : "bg-primary"
            }`}
          />
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              step === "otp" ? "bg-primary" : "bg-muted"
            }`}
          />
        </div>

        {/* ── STEP 1 — Enter email ── */}
        {step === "email" && (
          <div>
            <div className="text-center mb-8">
              <p className="mb-5">// Step 01</p>
              <h1 className="text-2xl font-bold text-foreground">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form
              onSubmit={forgotForm.handleSubmit(onSubmitForgotForm)}
              className="rounded-xl border border-border bg-card p-6 space-y-5"
            >
              <InputText
                id="email"
                label="Email"
                type="email"
                register={forgotForm.register("email")}
                error={forgotForm.formState.errors.email?.message}
                placeholder="admin@example.com"
              />

              <Button
                type="submit"
                size="lg"
                // disabled={isPending}
                className="w-full cursor-pointer hover:bg-primary/90"
              >
                Send reset code
              </Button>
            </form>

            <p className="text-foreground text-center mt-5">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>{" "}
            </p>
          </div>
        )}

        {/* ── STEP 2 — Enter OTP + new password ── */}
        {step === "otp" && (
          <div>
            <div className="text-center mb-8">
              <p className="mb-5">// Step 02</p>
              <h1 className="text-2xl font-bold text-foreground">
                Reset Password
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Enter the code sent to //{" "}
                <span className="text-primary">
                  {forgotForm.getValues("email")}
                </span>
              </p>
            </div>

            <form
              onSubmit={resetForm.handleSubmit(onSubmitResetForm)}
              className="rounded-xl border border-border bg-card p-6 space-y-5"
            >
              {resetMutation.error && (
                <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive mb-4">
                  {resetMutation.error.message}
                </div>
              )}

              <div className="space-y-4">
                <InputText
                  id="otp"
                  label="OTP"
                  type="text"
                  register={resetForm.register("otp")}
                  error={resetForm.formState.errors.otp?.message}
                  placeholder="6-digit-code"
                />
                <InputPassword
                  id="newPassword"
                  label="New Password"
                  register={resetForm.register("newPassword")}
                  error={resetForm.formState.errors.newPassword?.message}
                />
                <InputPassword
                  id="confirmPassword"
                  label="Confirm Password"
                  register={resetForm.register("confirmPassword")}
                  error={resetForm.formState.errors.confirmPassword?.message}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={resetMutation.isPending}
                className="w-full cursor-pointer hover:bg-primary/90"
              >
                {resetMutation.isPending ? <Spinner /> : "Reset password"}
              </Button>

              {/* Back Button */}
              <div className="flex items-center justify-center">
                <button
                  disabled={resetMutation.isPending}
                  onClick={() => setStep("email")}
                  className="flex items-center gap-2 cursor-pointer text-center text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>resend code</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
