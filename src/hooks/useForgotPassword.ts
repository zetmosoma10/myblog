import { authClient } from "#/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await authClient.emailOtp.requestPasswordReset({
        email,
      });

      if (error) throw new Error(error.message);
    },
    onSuccess: () =>
      toast.success("You will receive reset link if the email exist"),
    onError: () =>
      toast.success("You will receive reset link if the email exist"),
  });
};

export default useForgotPassword;
