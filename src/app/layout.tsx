import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/provider/theme-provider";

export const metadata: Metadata = {
  title: "Unread Piles",
  description: "Read, search and track your favorite books!",
  icons: [{ rel: "icon", url: "/piles.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background-light transition-colors duration-1000 ease-in-out dark:bg-background-dark dark:text-white">
        <ThemeProvider>
          <SessionProvider>
            <Nav />
            <main className="flex-1">{children}</main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
