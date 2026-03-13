import { updatePost } from "#/server/postsSeverFunctions";
import type { UpdatePostType } from "#/types/post.type";
import { useMutation } from "@tanstack/react-query";

const useUpdatePost = () => {
  return useMutation({
    mutationFn: (post: UpdatePostType) => updatePost({ data: post }),
  });
};

export default useUpdatePost;
