import { useQuery } from "@tanstack/react-query";
import { fetchGeneralBook } from "@/services/client/book-service";

export const useFetchGeneralBooks = () => {
  return useQuery({
    queryKey: ["googleBooks"],
    queryFn: fetchGeneralBook,
  });
};
