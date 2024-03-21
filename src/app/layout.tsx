import "cal-sans";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
      <body className={cn("antialiased flex flex-col", inter.className)}>
        <Toaster />
        <main className="w-full max-w-7xl mx-auto mb-20 grow h-full">
          <Navbar />
          {children}
        </main>
        <footer className="fixed bottom-0 left-0 min-h-20 p-4 w-full bg-zinc-50/40 backdrop-blur-sm border-t border-zinc-200 flex flex-col items-center justify-center">
          <div className="items-center text-sm inline-flex text-zinc-500">
            <span>Made by</span>
            <Link
              href="https://imadil.dev"
              target="_blank"
              className="underline text-zinc-600 mx-1.5"
            >
              <span className="sr-only">adevinwild</span>
              <Avatar className="size-6">
                <AvatarImage src="https://github.com/adevinwild.png" />
              </Avatar>
            </Link>
          </div>
          <div className="items-center text-sm inline-flex text-zinc-500">
            <span>MIT License,</span>
            <Link
              href="https://git.new/micro-scale"
              target="_blank"
              className="underline text-zinc-600 mx-1.5"
            >
              View Source
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
