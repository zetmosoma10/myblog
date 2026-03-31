import { authClient } from "#/lib/authClient";
import type { LoginCredentials } from "#/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      navigate({ to: "/", replace: true });
      queryClient.clear();
    },
    onError: (error) => toast.error(error.message),
  });
};

export default useLogin;
