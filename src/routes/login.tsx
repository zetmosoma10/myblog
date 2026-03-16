import InputPassword from "#/components/InputPassword";
import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/authClient.client";
import { loginSchema } from "#/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: RouteComponent,
});

type FormData = z.infer<typeof loginSchema>;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null);

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate({ to: "/", replace: true });
        },
        onError: (error) => {
          console.log(error);
          if (error.response.status === 401) {
            setError(error.error.message);
          } else {
            toast.error(error.error.message);
          }
        },
      },
    );
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
              {error}
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

            <InputPassword
              id="password"
              label="Password"
              register={register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full cursor-pointer hover:bg-primary/90"
          >
            Sign In
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
