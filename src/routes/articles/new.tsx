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
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

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

  return (
    <section>
      <h1 className="font-bold text-4xl mb-6 ">Create Article</h1>
      <div className="flex flex-col gap-8">
        <Field>
          <FieldLabel htmlFor="title" className="text-base">
            Title
          </FieldLabel>
          <Input
            id="title"
            placeholder="e.g React Performance Optimization"
            className="py-5 text-xl"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="excerpt" className="text-base">
            Excerpt
          </FieldLabel>
          <Textarea
            id="excerpt"
            placeholder="Short description"
            className="min-h-20 text-xl"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="tags" className="text-base">
            Tags
          </FieldLabel>
          <Combobox multiple autoHighlight items={frameworks} defaultValue={[]}>
            <ComboboxChips ref={anchor} className="w-full max-w-xs">
              <ComboboxValue>
                {(values) => (
                  <React.Fragment>
                    {values.map((value: string) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput className="py-1 " />
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
        </Field>

        <Field>
          <FieldLabel htmlFor="content" className="text-base">
            Content
          </FieldLabel>
          <Textarea
            id="content"
            placeholder="Write your article content here..."
            className="min-h-80 text-xl"
          />
        </Field>

        <Button
          variant="default"
          size="lg"
          className="py-4 cursor-pointer hover:bg-primary/90"
        >
          Submit
        </Button>
      </div>
    </section>
  );
}
