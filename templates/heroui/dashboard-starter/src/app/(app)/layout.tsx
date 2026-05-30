import {AppShell} from "@/components/app-shell";

// (app) 路由组：所有已认证页面共享 AppShell
export default function AppLayout({children}: {children: React.ReactNode}) {
  return <AppShell>{children}</AppShell>;
}