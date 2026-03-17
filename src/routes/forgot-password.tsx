import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { loginSchema } from "#/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
});

const schema = loginSchema.pick({ email: true });

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: { email: string }) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
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
            className="w-full cursor-pointer hover:bg-primary/90"
          >
            Sign In
          </Button>
        </form>

        <p className="text-foreground text-center mt-5">
          Remember your password?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
