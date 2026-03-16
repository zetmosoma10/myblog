import { authClient } from "#/lib/authClient.client";
import type { RegisterCredentials } from "#/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data, error } = await authClient.signUp.email({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw new Error(error.message);

      return data;
    },

    onSuccess: () => navigate({ to: "/", replace: true }),
    onError: (error) => toast.error(error.message),
  });
};

export default useRegister;
