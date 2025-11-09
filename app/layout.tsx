import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ServiceWorkerRegister } from "./components/ServiceWorkerRegister";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KDS",
  description: "Kitten Digital Signage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${noto.className} antialiased overflow-hidden overscroll-none select-none p-6 lg:p-8 h-screen bg-zinc-50 dark:bg-black`}
      >
        <ServiceWorkerRegister />
        <Suspense fallback={<>Loading...</>}>{children}</Suspense>
      </body>
    </html>
  );
}
