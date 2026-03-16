import { authClient } from "#/lib/authClient";
import type { LoginCredentials } from "#/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      console.log("OnSuccess");
      navigate({ to: "/", replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
};

export default useLogin;
