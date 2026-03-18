import { useForm } from "react-hook-form";
import InputText from "./InputText";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Newsletter = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <section className="flex items-center justify-center">
      <Card className="max-w-150 p-8 bg-primary/10 border border-primary/40">
        <p className="text-primary">newsletter</p>
        <h2 className="text-card-foreground font-semibold text-2xl">
          Stay in the <span className="text-primary">loop</span>
        </h2>

        <p className="text-muted-foreground">
          Weekly articles on React, TypeScript, TanStack, and the modern web. No
          spam just things I actually find useful and worth sharing.
        </p>

        <form className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <InputText
            id="email"
            type="email"
            placeholder="your@email.com"
            className="bg-white shadow"
            register={register("email")}
            error=""
          />
          <Button size="lg" className="cursor-pointer py-5">
            Subscribe →
          </Button>
        </form>

        <div className="text-xs text-primary/80 mt-4 flex items-center gap-2">
          <p>weekly posts</p>
          <p>no spam</p>
          <p>unsubscribe anytime</p>
        </div>
      </Card>
    </section>
  );
};

export default Newsletter;
