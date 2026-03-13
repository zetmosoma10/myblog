import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "#/schemas/post.schema";
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
} from "./ui/combobox";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import type { PostType } from "#/types/post.type";
import InputElement from "./InputElement";
import useAddPost from "#/hooks/useAddPost";
import ImageUpload from "./ImageUpload";
import imageCompression from "browser-image-compression";
import clsx from "clsx";
import toast from "react-hot-toast";
import SimpleMDE from "@uiw/react-md-editor";
import { Spinner } from "./ui/spinner";

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

type Props = {
  type: "Edit" | "Post";
  post?: PostType;
};

const PostForm = ({ type, post }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: type === "Edit" ? post?.title : "",
      excerpt: type === "Edit" ? post?.excerpt : "",
      tags: type === "Edit" ? post?.tags : [],
      coverImage: type === "Edit" ? post?.coverImage : "",
      content: type === "Edit" ? post?.content : "",
    },
  });

  const anchor = useComboboxAnchor();
  const { mutateAsync, isPending } = useAddPost();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    let imageBase64: string | undefined;

    try {
      if (uploadedImage) {
        // * Compress the image
        const compressedImage = await imageCompression(uploadedImage, {
          maxSizeMB: 0.5, // * Compress to 500KB
          maxWidthOrHeight: 1200, // * resize to max 1200px
          useWebWorker: true, // * Non-blocking
        });

        // * Convert it to Base64
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader(); // * Read the image file
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(compressedImage);
        });
      }

      await mutateAsync({ ...data, imageBase64 });
      reset();
      toast.success("Post added successfully");
      // * REDIRECT
    } catch (error) {
      console.log(error);
      // * TOAST
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col  gap-8  p-6 rounded-xl">
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

        {/* Tags */}
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
                    "group w-full  max-w-xs",
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

        {/* Cover Image */}
        <Field>
          <FieldLabel htmlFor="coverImage" className="text-base">
            CoverImage
          </FieldLabel>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                setUploadedImage={(img: File) => setUploadedImage(img)}
                onChange={(url: string) => field.onChange(url)}
              />
            )}
          />
        </Field>

        {/* Content */}
        <Field>
          <FieldLabel
            htmlFor="content"
            className={clsx("text-base", errors.content && "text-destructive")}
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
                textareaProps={{
                  id: "content",
                  placeholder: "Write your post...",
                  className: "bg-card h-full",
                }}
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
          className="py-4 self-start cursor-pointer hover:bg-primary/90 w-30"
        >
          {isPending ? <Spinner /> : "Submit"}
        </Button>
      </Card>
    </form>
  );
};

export default PostForm;
