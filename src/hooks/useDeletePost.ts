import { deletePost } from "#/server/postsSeverFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

// * After deleting the post we should request new posts data where deleted post is deleted.

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id?: string) => deletePost({ data: id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully.");
      navigate({ to: "/posts" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useDeletePost;
