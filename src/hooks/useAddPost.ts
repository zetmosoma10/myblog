import { addPost } from "#/server/postsSeverFunctions";
import type { PostType } from "#/types/post.type";
import { useMutation } from "@tanstack/react-query";

type PostOmit = Omit<
  PostType,
  "_id" | "createdAt" | "updatedAt" | "readingTime"
>;

const useAddPost = () => {
  return useMutation({
    mutationFn: (post: PostOmit) => addPost({ data: post }),
  });
};

export default useAddPost;
