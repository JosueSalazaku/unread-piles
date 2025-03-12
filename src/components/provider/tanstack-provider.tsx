/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function TanstackProvider({ children }: { children: React.ReactNode }): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const [queryClient] = useState(() => new QueryClient());

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
