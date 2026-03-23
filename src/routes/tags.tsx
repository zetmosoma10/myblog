import BackLink from "#/components/BackLink";
import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { tagSchema } from "#/schemas/post.schema";
import type { Tag } from "#/types/post.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/tags")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Tag>({ resolver: zodResolver(tagSchema) });

  const onSubmit = (data: { tag: string }) => {
    console.log(data);
    reset();
  };

  return (
    <section className="max-container h-screen pt-12">
      <BackLink>Back to posts</BackLink>
      <div className="mt-4 max-w-114.75 mx-auto">
        <h2 className="text-center font-semibold text-xl mb-5">Create Tag</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <InputText
            id="tag"
            label="Add Tag"
            placeholder="e.g react"
            type="text"
            register={register("tag")}
            error={errors.tag?.message}
          />
          <Button size="lg" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}
