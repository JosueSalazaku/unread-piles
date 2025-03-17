import { fetchBookByInput } from "@/services/client/book-service"
import { useQuery } from "@tanstack/react-query"


export const useFetchByInput = (query: string, startIndex: number, maxResults: number) => {
    return useQuery({
        queryKey: ["bookQuery"],
        queryFn: () => fetchBookByInput(query, startIndex, maxResults)
    })
}