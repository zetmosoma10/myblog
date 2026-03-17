import InputPassword from "#/components/InputPassword";
import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import useForgotPassword from "#/hooks/useForgotPassword";
import { loginSchema } from "#/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
});

const forgotPasswordSchema = loginSchema.pick({ email: true });

function RouteComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [step, setStep] = useState<"email" | "otp">("email");
  const { mutateAsync, isPending } = useForgotPassword();

  const onSubmit = async (data: { email: string }) => {
    setStep("otp");
    // reset();
    // await mutateAsync(data.email);
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

        {step === "email" && (
          <div>
            <div className="text-center mb-8">
              <p className="mb-5">// Step 1</p>
              <h1 className="text-2xl font-bold text-foreground">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl border border-border bg-card p-6 space-y-5"
            >
              <InputText
                id="email"
                label="Email"
                type="email"
                register={register("email")}
                error={errors.email?.message}
                placeholder="admin@example.com"
              />

              <Button
                type="submit"
                size="lg"
                disabled={isPending}
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
      </div>
    </div>
  );
}

// <div className="min-h-screen flex items-center justify-center bg-background">
//   <div className="w-full max-w-md border border-border rounded-lg bg-card p-8">
//     {/* Step indicator */}
//     <div className="flex items-center gap-2 mb-6">
//       <div
//         className={`h-1 flex-1 rounded-full transition-colors ${
//           step === "email" ? "bg-primary" : "bg-primary"
//         }`}
//       />
//       <div
//         className={`h-1 flex-1 rounded-full transition-colors ${
//           step === "otp" ? "bg-primary" : "bg-muted"
//         }`}
//       />
//     </div>

//     {/* ── STEP 1 — Enter email ── */}
//     {step === "email" && (
//       <>
//         <div className="mb-6">
//           <p className="font-mono text-xs text-primary tracking-widest mb-2">
//             // step 01
//           </p>
//           <h1 className="font-mono text-2xl font-bold text-foreground">
//             Forgot password
//           </h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             Enter your email to receive a reset code.
//           </p>
//         </div>

//         <form
//           // onSubmit={emailForm.handleSubmit((data) => requestOTP(data))}
//           className="flex flex-col gap-4"
//         >
//           <div className="flex flex-col gap-1.5">
//             <InputText
//               id="email"
//               type="email"
//               label="Email"
//               placeholder="you@example.com"
//               register={register("email")}
//               error=""
//               // className={
//               //   emailForm.formState.errors.email ? "border-destructive" : ""
//               // }
//             />
//             {/* {emailForm.formState.errors.email && (
//               <p className="font-mono text-xs text-destructive">
//                 // {emailForm.formState.errors.email.message}
//               </p>
//             )} */}
//           </div>

//           <Button
//             type="submit"
//             // disabled={isRequesting}
//             className="w-full font-mono"
//           >
//             Send reset code
//           </Button>
//         </form>
//       </>
//     )}

//     {/* ── STEP 2 — Enter OTP + new password ── */}
//     {step === "otp" && (
//       <>
//         <div className="mb-6">
//           <p className="font-mono text-xs text-primary tracking-widest mb-2">
//             // step 02
//           </p>
//           <h1 className="font-mono text-2xl font-bold text-foreground">
//             Reset password
//           </h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             Enter the code sent to{" "}
//             <span className="text-primary font-mono">email.com</span>
//           </p>
//         </div>

//         <form
//           // onSubmit={resetForm.handleSubmit((data) => resetPassword(data))}
//           className="flex flex-col gap-4"
//         >
//           {/* OTP */}
//           <div className="flex flex-col gap-1.5">
//             <InputText
//               id="resetCode"
//               type="text"
//               label="Reset Code"
//               placeholder="6-digit-code"
//               register={register("resetCode")}
//               error=""
//               // className={
//               //   emailForm.formState.errors.email ? "border-destructive" : ""
//               // }
//             />

//             {/* <InputText
//               id="otp"
//               placeholder="6-digit code"
//               maxLength={6}
//               {...resetForm.register("otp")}
//               className={`font-mono tracking-widest text-center text-lg ${
//                 resetForm.formState.errors.otp ? "border-destructive" : ""
//               }`}
//             />
//             {resetForm.formState.errors.otp && (
//               <p className="font-mono text-xs text-destructive">
//                 // {resetForm.formState.errors.otp.message}
//               </p>
//             )} */}
//           </div>

//           {/* New password */}
//           <div className="flex flex-col gap-1.5">
//             <InputPassword
//               id="newPassword"
//               // type="text"
//               label="New Password"
//               // placeholder="e.g 123456"
//               register={register("newPassword")}
//               error=""
//               // className={
//               //   emailForm.formState.errors.email ? "border-destructive" : ""
//               // }
//             />
//           </div>

//           {/* Confirm password */}
//           <div className="flex flex-col gap-1.5">
//             <InputPassword
//               id="confirmPassword"
//               // type="text"
//               label="Confirm Password"
//               // placeholder="e.g 123456"
//               register={register("confirmPassword")}
//               error=""
//               // className={
//               //   emailForm.formState.errors.email ? "border-destructive" : ""
//               // }
//             />
//           </div>

//           <Button
//             type="submit"
//             // disabled={isResetting}
//             className="w-full font-mono"
//           >
//             Reset password
//           </Button>

//           {/* Back button */}
//           <button
//             type="button"
//             onClick={() => setStep("email")}
//             className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors text-center"
//           >
//             ← resend code
//           </button>
//         </form>
//       </>
//     )}
//   </div>
// </div>

//
