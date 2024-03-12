import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3ModalProvider } from "../contexts/Web3Modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}

import "./globals.css";
