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
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { articleSchema } from "#/schemas/articleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ArticleType } from "#/types/ArticleType";
import clsx from "clsx";
import InputElement from "#/components/InputElement";

export const Route = createFileRoute("/articles/new")({
  component: RouteComponent,
});

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

function RouteComponent() {
  const anchor = useComboboxAnchor();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ArticleType>({
    resolver: zodResolver(articleSchema),
  });

  const onSubmit = (data: ArticleType) => {
    console.log(data);
    reset();
  };

  return (
    <section>
      <h1 className="font-bold text-2xl mb-6">Create Article</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 border p-6 rounded-xl bg-accent"
      >
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

        <InputElement
          id="content"
          label="Content"
          placeholder="Write your article content here..."
          type="textarea"
          register={register("content")}
          error={errors.content?.message}
        />

        <Button
          variant="default"
          size="lg"
          className="py-4 self-start cursor-pointer hover:bg-primary/90"
        >
          Submit New Article
        </Button>
      </form>
    </section>
  );
}
