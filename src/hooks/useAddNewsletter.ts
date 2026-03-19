import { subscribeToNewsletter } from "#/server/subscribeToNewsletter";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddNewsletter = () => {
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      await subscribeToNewsletter({ data: payload });
    },
    onSuccess: () => toast.success("Added to newsletter successfully"),
  });
};

export default useAddNewsletter;
