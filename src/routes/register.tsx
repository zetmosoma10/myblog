import InputPassword from "#/components/InputPassword";
import InputText from "#/components/InputText";
import toast from "react-hot-toast";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/authClient.client";
import { registerSchema } from "#/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/register")({
  ssr: false,
  component: RouteComponent,
});

type FormData = z.infer<typeof registerSchema>;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("User registered successfully.");
          navigate({ to: "/", replace: true });
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Signup</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign up to manage your blog
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-border bg-card p-6"
        >
          {/* {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )} */}

          <div className="space-y-5 mb-7">
            <InputText
              id="name"
              label="FullName"
              type="text"
              register={register("name")}
              error={errors.name?.message}
              placeholder="e.g John Doe"
            />

            <InputText
              id="email"
              label="Email"
              type="email"
              register={register("email")}
              error={errors.email?.message}
              placeholder="admin@example.com"
            />

            <InputPassword
              id="password"
              label="Password"
              register={register("password")}
              error={errors.password?.message}
            />

            <InputPassword
              id="confirmPassword"
              label="Confirm Password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
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
          Already have account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
