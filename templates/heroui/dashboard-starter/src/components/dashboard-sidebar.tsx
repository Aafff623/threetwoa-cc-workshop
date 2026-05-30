"use client";

import {Sidebar} from "@heroui-pro/react";
import {NAV_ITEMS, FOOTER_ITEMS} from "@/nav-items";

// 标准 Sidebar：Header(Avatar) + Content(NavItems) + Footer(FooterItems)
// 自定义：替换 Header 区域的用户信息、调整 FooterItems
export function DashboardSidebar() {
  return (
    <Sidebar>
      {/* 头部：用户头像与信息 */}
      <Sidebar.Header>
        <div className="flex items-center gap-3 px-2 py-2">
          {/* 自定义：替换为真实 Avatar 组件 */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-200 text-xs font-semibold">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">用户名</span>
            <span className="text-xs text-default-500">user@example.com</span>
          </div>
        </div>
      </Sidebar.Header>

      {/* 导航区域：主菜单 */}
      <Sidebar.Content>
        <Sidebar.Group>
          {NAV_ITEMS.map((item) => (
            <Sidebar.MenuItem
              key={item.href}
              href={item.href}
              icon={<item.icon className="size-4" />}
            >
              {item.label}
              {item.badge && (
                <Sidebar.MenuItem.Badge>{item.badge}</Sidebar.MenuItem.Badge>
              )}
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Group>
      </Sidebar.Content>

      {/* 底部：设置与退出 */}
      <Sidebar.Footer>
        {FOOTER_ITEMS.map((item) => (
          <Sidebar.MenuItem
            key={item.href}
            href={item.href}
            icon={<item.icon className="size-4" />}
          >
            {item.label}
          </Sidebar.MenuItem>
        ))}
      </Sidebar.Footer>
    </Sidebar>
  );
}