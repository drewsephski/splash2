import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RippleCursor from "@/components/ui/effects/ripple-cursor";
import { FloatingDockDemo } from "@/components/organisms/floating-dock-demo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Splash2 Portfolio",
  description: "Modern portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-b from-blue-950 via-grey-900 to-black text-white pb-20`}>
        <RippleCursor />
        {children}
        <FloatingDockDemo />
      </body>
    </html>
  );
}
