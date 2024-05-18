import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Con-tack",
  description: "Sistema de gestion de numeros de contacto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-[#f8f8f2] w-full min-h-screen">
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
