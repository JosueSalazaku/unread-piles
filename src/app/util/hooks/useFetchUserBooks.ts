import { fetchUserBooks } from "@/services/backend/book-service";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserBooks = (id: string) => {
    return useQuery({
      queryKey: ["userBooks"],
      queryFn: () => fetchUserBooks(id),
    });
  };
  