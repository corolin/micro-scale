import "cal-sans";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import Navbar from "./_navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "µScale - Next.js and Replicate template",
  description: "A Next.js and Replicate template to upscale your images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <main className="max-w-7xl mx-auto mb-20">
          <Navbar />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
