import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

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
        <body className="bg-blue-800">
          <Nav />
          <main className="flex-1">{children}</main>
        </body>
      </html>

  );
}
