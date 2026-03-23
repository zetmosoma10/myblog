import { addTag } from "#/server/tagsSeverFunction";
import type { TagType } from "#/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Omit<TagType, "_id">) => {
      await addTag({ data: payload });
    },
    onSuccess: () => {
      toast.success("Tag added successfully");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useAddTag;
