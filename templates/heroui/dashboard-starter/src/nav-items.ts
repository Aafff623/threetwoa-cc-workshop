import {House, ListCheck, CircleQuestion, ArrowRightFromSquare} from "@gravity-ui/icons";
import type {ComponentType} from "react";

// 导航项类型定义
// 自定义：添加更多路由项，每项对应 (app)/ 下的一个目录
export type NavItem = {
  readonly href: string;
  readonly label: string;
  readonly icon: ComponentType<{className?: string}>;
  readonly badge?: string;
};

// 主导航菜单
// 自定义：根据业务需求修改，确保 (app)/ 下有对应的路由目录
export const NAV_ITEMS: readonly NavItem[] = [
  {href: "/", icon: House, label: "Dashboard"},
  {href: "/tracker", icon: ListCheck, label: "Tracker", badge: "New"},
] as const;

// 底部导航菜单（设置、帮助、退出等）
// 自定义：调整底部功能入口
export const FOOTER_ITEMS: readonly NavItem[] = [
  {href: "/help", icon: CircleQuestion, label: "Help & Information"},
  {href: "/logout", icon: ArrowRightFromSquare, label: "Log out"},
] as const;