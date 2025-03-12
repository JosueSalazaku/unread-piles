import { saveUserBook } from "@/services/backend/book-service";
import { useQuery } from "@tanstack/react-query";

export const useSaveBooks = (id: string) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => saveUserBook(id),
  });
};
