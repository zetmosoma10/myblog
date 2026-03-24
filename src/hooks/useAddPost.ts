import { addPost } from "#/server/postsSeverFunctions";
import type { CreatePostType } from "#/types/post.type";
import { useMutation } from "@tanstack/react-query";

// * When adding a post, the post does not yet have some properties like _id,createdAt,updatedAt ect. Thats why we omit them from the Post Type.

const useAddPost = () => {
  return useMutation({
    mutationFn: async (post: CreatePostType) => await addPost({ data: post }),
  });
};

export default useAddPost;
