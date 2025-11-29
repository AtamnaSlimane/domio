import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get<User>("/user");
      return response.data;
    },
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useSidebar();
  const router = useRouter();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axios.post("/logout");
      return response.data;
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Logout failed");
    },
    onSuccess: () => {
      Cookies.remove("token");
      queryClient.setQueryData(["user"], null);
      setOpen(false);
      toast.success("Logout successful");
      router.push("/");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login successful");
      router.replace("/explore");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      phone: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br",
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Sign up successful");
      router.replace("/explore");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
