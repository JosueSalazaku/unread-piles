import { fetchGoogleBookById } from "@/services/client/book-service";
import { useQuery } from "@tanstack/react-query";
import type { GoogleBook } from "@/types";

export const useFetchGoogleBooksById = (bookIds: string[]) => {
  return useQuery({
    queryKey: ["googlebooks", bookIds],
    queryFn: async () => {
      const books = await Promise.all(
        bookIds.map(async (bookId) => {
          const book = await fetchGoogleBookById(bookId);
          return book;
        }),
      );
      return books.filter((book): book is GoogleBook => book !== null);
    },
    enabled: bookIds.length > 0,
  });
};
