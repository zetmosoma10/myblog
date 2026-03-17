import { authClient } from "#/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

type Payload = {
  resetCode: string;
  newPassword: string;
  email: string;
};

const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: Payload) => {
      const { error } = await authClient.emailOtp.checkVerificationOtp({
        otp: data.resetCode,
        type: "forget-password",
        email: data.email,
      });

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate({ to: "/", replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
};

export default useResetPassword;
