import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import Navbar from "@/components/Navbar";

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
        <main className="container">
          <SessionAuthProvider>
            <Navbar />
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
