import { addPost } from "#/server/postsSeverFunctions";
import type { PostType } from "#/types/post.type";
import { useMutation } from "@tanstack/react-query";

const useAddPost = () => {
  return useMutation({
    mutationFn: (post: PostType) => addPost({ data: post }),
  });
};

export default useAddPost;
