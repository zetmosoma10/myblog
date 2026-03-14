import InputPassword from "#/components/InputPassword";
import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { loginSchema } from "#/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

type FormData = z.infer<typeof loginSchema>;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage your blog
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-border bg-card p-6 space-y-5"
        >
          {/* {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )} */}

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

          <Button
            type="submit"
            size="lg"
            className="w-full cursor-pointer hover:bg-primary/90"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
