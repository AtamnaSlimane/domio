import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

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
