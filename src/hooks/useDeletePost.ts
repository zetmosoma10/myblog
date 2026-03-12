import { deletePost } from "#/server/postsSeverFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id?: string) => deletePost({ data: id }),
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
