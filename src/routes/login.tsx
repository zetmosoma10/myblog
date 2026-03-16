import InputPassword from "#/components/InputPassword";
import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import useLogin from "#/hooks/useLogin";
import { loginSchema } from "#/schemas/auth.schema";
import type { LoginCredentials } from "#/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({ resolver: zodResolver(loginSchema) });

  const { mutateAsync, isPending, error } = useLogin();

  const onSubmit = async (data: LoginCredentials) => {
    await mutateAsync({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage your blog
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-border bg-card p-6"
        >
          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive mb-4">
              {error.message}
            </div>
          )}

          <div className="space-y-5 mb-7">
            <div>
              <InputText
                id="email"
                label="Email"
                type="email"
                register={register("email")}
                error={errors.email?.message}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <InputPassword
                id="password"
                label="Password"
                register={register("password")}
                error={errors.password?.message}
              />

              <Link
                to="/forgot-password"
                className="block text-sm text-end text-primary hover:underline mt-2 "
              >
                Forgot Password
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full cursor-pointer hover:bg-primary/90"
          >
            {isPending ? <Spinner /> : "Sign In"}
          </Button>
        </form>

        <p className="text-foreground text-center mt-5">
          Don't have account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
