import "./globals.css";
import "cal-sans";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body
        className={cn("antialiased max-w-7xl mx-auto mb-20", inter.className)}
      >
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
