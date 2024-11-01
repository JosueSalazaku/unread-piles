import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Nav } from "@/Components/Nav";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className='bg-blue-800'
        >
          <Nav />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  ); 
}