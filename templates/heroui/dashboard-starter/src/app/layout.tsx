import type {Metadata} from "next";
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import "./globals.css";

// 自定义：替换为你的应用元数据
export const metadata: Metadata = {
  title: "Dashboard Starter",
  description: "HeroUI Pro v3 Dashboard starter template",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <HeroUIProvider>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}