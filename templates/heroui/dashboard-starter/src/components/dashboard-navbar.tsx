"use client";

import {Navbar} from "@heroui/react";
import {usePathname} from "next/navigation";
import {NAV_ITEMS, FOOTER_ITEMS} from "@/nav-items";

// 路由标题推导（O(1) Map 查找）
const ROUTE_LABELS = new Map(
  [...NAV_ITEMS, ...FOOTER_ITEMS].map((item) => [item.href, item.label]),
);

// 默认问候语（首页）
const HOME_GREETING = "Dashboard";

export function DashboardNavbar() {
  const pathname = usePathname();

  // 推导导航栏标题：精确匹配 → 问候语
  const relative = pathname || "/";
  const title = ROUTE_LABELS.get(relative) ?? HOME_GREETING;

  return (
    <Navbar maxWidth="full">
      {/* 自定义：添加搜索框、用户头像、通知铃铛等 */}
      <p className="text-lg font-semibold">{title}</p>
    </Navbar>
  );
}