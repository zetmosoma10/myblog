import { deletePost } from "#/server/postsSeverFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isNotFound, useNavigate } from "@tanstack/react-router";
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
      navigate({ to: "/posts", search: { page: 1 }, replace: true });
    },
    onError: (error) => {
      if (isNotFound(error)) {
        toast.error("Post already deleted");
        navigate({ to: "..", replace: true });
      } else {
        toast.error(error.message);
      }
    },
  });
};

export default useDeletePost;
