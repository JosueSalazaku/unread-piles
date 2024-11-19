import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Unread Piles",
  description: "Read, search and track your favorite books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Nav />
            <main className="flex-1">{children}</main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
