import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["greek"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "easy-ghfetch",
  description: "created by webbedpiyush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrains_Mono.className} `}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
