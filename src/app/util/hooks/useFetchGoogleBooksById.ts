import { fetchGoogleBookById } from "@/services/client/book-service";
import { useQuery } from "@tanstack/react-query";

export const useFetchGoogleBookById = (id: string) => {
    return useQuery({
      queryKey: ["googlebooks"],
      queryFn: () => fetchGoogleBookById(id),
    });
  };