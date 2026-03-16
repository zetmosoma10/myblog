import { authClient } from "#/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => navigate({ to: "/", replace: true }),
    onError: (error) => toast.error(error.message),
  });
};

export default useLogout;
