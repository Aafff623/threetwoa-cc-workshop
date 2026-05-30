"use client";

import {AppLayout} from "@heroui-pro/react";
import {DashboardNavbar} from "./dashboard-navbar";
import {DashboardSidebar} from "./dashboard-sidebar";
import {useRouter} from "next/navigation";
import type {ReactNode} from "react";

// 标准的 Dashboard AppShell
// 自定义：如需 disableNavigation 预览模式，参考 Finances 模板实现
export function AppShell({children}: {children: ReactNode}) {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  return (
    <AppLayout
      navigate={navigate}
      navbar={<DashboardNavbar />}
      sidebar={<DashboardSidebar />}
      sidebarCollapsible="offcanvas"
    >
      {children}
    </AppLayout>
  );
}