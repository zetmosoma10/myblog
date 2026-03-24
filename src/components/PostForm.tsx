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
import type { CreatePostType, ResponsePostType } from "#/types/post.type";
import { Spinner } from "./ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import InputText from "./InputText";
import useAddPost from "#/hooks/useAddPost";
import useUpdatePost from "#/hooks/useUpdatePost";
import ImageUpload from "./ImageUpload";
import imageCompression from "browser-image-compression";
import clsx from "clsx";
import toast from "react-hot-toast";
import SimpleMDE from "@uiw/react-md-editor";
import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const frameworks = [
  {
    _id: "1",
    name: "Next.js",
  },
  {
    _id: "2",
    name: "SvelteKit",
  },
  {
    _id: "3",
    name: "Nuxt.js",
  },
  {
    _id: "4",
    name: "Remix",
  },
] as const;

type Props = {
  type: "Edit" | "Post";
  post?: ResponsePostType;
};

const PostForm = ({ type, post }: Props) => {
  // * Manage Form data with React-hook-form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePostType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: type === "Edit" ? post?.title : "",
      excerpt: type === "Edit" ? post?.excerpt : "",
      tags: type === "Edit" ? post?.tags : [],
      coverImage: type === "Edit" ? post?.coverImage : "",
      content: type === "Edit" ? post?.content : "",
      status: type === "Edit" ? post?.status! : "draft",
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const anchor = useComboboxAnchor();
  const { mutateAsync: addMutationAsync, isPending } = useAddPost();
  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useUpdatePost();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const onSubmit = async (data: CreatePostType) => {
    console.log(data);
    // let imageBase64: string | undefined;

    // try {
    //   // * If Image Exist Compress it
    //   if (uploadedImage) {
    //     const compressedImage = await imageCompression(uploadedImage, {
    //       maxSizeMB: 0.5, // * Compress to 500KB
    //       maxWidthOrHeight: 1200, // * resize to max 1200px
    //       useWebWorker: true, // * Non-blocking
    //     });

    //     // * Convert it to Base64
    //     imageBase64 = await new Promise<string>((resolve, reject) => {
    //       const reader = new FileReader(); // * Read the image file
    //       reader.onload = () => resolve(reader.result as string);
    //       reader.onerror = reject;
    //       reader.readAsDataURL(compressedImage);
    //     });
    //   }

    //   if (type === "Post") {
    //     await addMutationAsync({ ...data, imageBase64 });
    //     reset();
    //     toast.success("Post added successfully");
    //     queryClient.invalidateQueries({ queryKey: ["post", post?._id] }); //* re-fetch post/id data
    //     queryClient.invalidateQueries({ queryKey: ["posts"] }); //* re-fetch posts
    //     navigate({ to: "/posts", search: { page: 1 } });
    //     //
    //   } else if (type === "Edit") {
    //     //
    //     await updateMutateAsync({ _id: post?._id!, imageBase64, ...data });
    //     toast.success("Post updated successfully");
    //     queryClient.invalidateQueries({ queryKey: ["post", post?._id] }); //* re-fetch post/id data
    //     queryClient.invalidateQueries({ queryKey: ["post"] }); //* re-fetch post data
    //     navigate({ to: "/posts/$slug", params: { slug: post?.slug! } });
    //   }
    // } catch (error: any) {
    //   console.log(error);
    //   toast.error(error.message);
    // }
  };

  return (
    <Card className="shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-8  p-6"
      >
        <InputText
          id="title"
          label="Title"
          placeholder="e.g React Performance Optimization"
          type="text"
          register={register("title")}
          error={errors.title?.message}
        />

        <InputText
          id="excerpt"
          label="Excerpt"
          placeholder="Short description"
          type="textarea"
          register={register("excerpt")}
          error={errors.excerpt?.message}
        />

        <div className="flex flex-col gap-y-8 md:flex-row md:gap-y-0 sm:justify-between md: gap-5">
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
                  items={frameworks.map((i) => i.name)}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxChips
                    ref={anchor}
                    className={clsx(
                      "group w-full  focus-within:ring-primary/50 focus-within:border-primary",
                      errors.tags &&
                        "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive",
                    )}
                  >
                    <ComboboxValue>
                      {(values) => {
                        console.log("ComboboxValue :", values);

                        return (
                          <React.Fragment>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}

                            <ComboboxChipsInput className="py-1" />
                          </React.Fragment>
                        );
                      }}
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

          {/* Select Box*/}
          <Field>
            <FieldLabel className="text-base">Status</FieldLabel>
            <Controller
              name="status"
              control={control}
              defaultValue="draft"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full py-5!">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>

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
          disabled={isPending || isUpdatePending}
          className="py-4 self-start cursor-pointer hover:bg-primary/90 w-30"
        >
          {isPending || isUpdatePending ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Card>
  );
};

export default PostForm;
