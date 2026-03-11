import React from "react";
import { Button } from "#/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "#/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Card } from "#/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { postSchema } from "#/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import InputElement from "#/components/InputElement";
import useAddPost from "#/hooks/useAddPost";
import toast from "react-hot-toast";
import type { PostType } from "#/types/post.type";
import SimpleMDE from "@uiw/react-md-editor";

export const Route = createFileRoute("/posts/new")({
  ssr: false,
  component: RouteComponent,
});

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

type FormData = Omit<
  PostType,
  "_id" | "createdAt" | "updatedAt" | "readingTime"
>;

function RouteComponent() {
  const anchor = useComboboxAnchor();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  });

  const { mutateAsync, isPending } = useAddPost();

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data);
      reset();
      // * TOAST
      toast.success("Post added successfully");
      // * REDIRECT
    } catch (error) {
      console.log(error);
      // * TOAST
    }
  };

  return (
    <section>
      <div className="py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
          Create Post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="flex flex-col gap-8  p-6 rounded-xl">
            <InputElement
              id="title"
              label="Title"
              placeholder="e.g React Performance Optimization"
              type="input"
              register={register("title")}
              error={errors.title?.message}
            />

            <InputElement
              id="excerpt"
              label="Excerpt"
              placeholder="Short description"
              type="textarea"
              register={register("excerpt")}
              error={errors.excerpt?.message}
            />

            <Field>
              <FieldLabel
                htmlFor="tags"
                className={clsx("text-base", errors.tags && "text-destructive")}
              >
                Tags
              </FieldLabel>

              <Controller
                name="tags"
                defaultValue={[]}
                control={control}
                render={({ field }) => (
                  <Combobox
                    multiple
                    autoHighlight
                    items={frameworks}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxChips
                      ref={anchor}
                      className={clsx(
                        "group w-full bg-background max-w-xs",
                        errors.tags &&
                          "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive",
                      )}
                    >
                      <ComboboxValue>
                        {(values) => (
                          <React.Fragment>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}

                            <ComboboxChipsInput className="py-1" />
                          </React.Fragment>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />

              {errors.tags && (
                <FieldDescription className="text-destructive">
                  {errors.tags.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel
                className={clsx(
                  "text-base",
                  errors.content && "text-destructive",
                )}
              >
                Content
              </FieldLabel>

              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SimpleMDE
                    value={field.value}
                    onChange={field.onChange}
                    height={400}
                    className="bg-background"
                  />
                )}
              />

              {errors.content && (
                <FieldDescription className="text-destructive">
                  {errors.content.message}
                </FieldDescription>
              )}
            </Field>

            <Button
              variant="default"
              size="lg"
              disabled={isPending}
              className="py-4 self-start cursor-pointer hover:bg-primary/90"
            >
              Submit New Post
            </Button>
          </Card>
        </form>
      </div>
    </section>
  );
}
