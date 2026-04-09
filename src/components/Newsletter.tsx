import { useForm } from "react-hook-form";
import InputText from "./InputText";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddNewsletter from "#/hooks/useAddNewsletter";
import { Spinner } from "./ui/spinner";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email().nonempty({ error: "email required" }),
});

const Newsletter = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { mutateAsync, isPending } = useAddNewsletter();

  const onSubmit = async (data: { email: string }) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (error: any) {
      console.log(error);
      if (error.status === 409) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="flex items-center justify-center">
      <Card className="max-w-150 p-8 bg-primary/10 border border-primary/40">
        <div>
          <p className="text-primary">newsletter</p>
          <h2 className="text-card-foreground font-semibold text-2xl mt-1">
            Stay in the <span className="text-primary">loop</span>
          </h2>

          <p className="text-muted-foreground mt-3">
            Weekly articles on React, Next, TypeScript, TanStack, and the modern
            web. No spam just things I actually find useful and worth sharing.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-3"
          >
            <InputText
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-white shadow"
              register={register("email")}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="cursor-pointer py-5"
            >
              {isPending ? <Spinner /> : "Subscribe →"}
            </Button>
          </form>

          <p className="text-xs text-center text-primary/80 flex items-center gap-2 mt-2">
            unsubscribe anytime
          </p>
        </div>
      </Card>
    </section>
  );
};

export default Newsletter;
