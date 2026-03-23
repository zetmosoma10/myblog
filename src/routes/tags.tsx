import BackLink from "#/components/BackLink";
import InputText from "#/components/InputText";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import useAddTag from "#/hooks/useAddTag";
import { tagSchema } from "#/schemas/post.schema";
import type { TagType } from "#/types/post.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const Route = createFileRoute("/tags")({
  ssr: false,
  component: RouteComponent,
});

type FormData = Omit<TagType, "_id">;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(tagSchema) });

  const { mutateAsync, isPending } = useAddTag();

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section className="max-container h-screen pt-12">
      <BackLink>Back to posts</BackLink>
      <div className="mt-4 max-w-114.75 mx-auto">
        <h2 className="text-center font-semibold text-xl mb-5">Create Tag</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <InputText
            id="name"
            label="Add Tag"
            placeholder="e.g react"
            type="text"
            register={register("name")}
            error={errors.name?.message}
          />
          <Button size="lg" className="cursor-pointer" disabled={isPending}>
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
}
