// Dashboard 首页
// 自定义：替换为你的首页内容，建议拆分到 views/dashboard-page.tsx

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-4">
      {/* KPI 行占位 */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">仪表盘</h1>
        <p className="text-sm text-default-500">
          在这里添加 KPI 卡片、图表和数据表格
        </p>
      </div>

      {/* 自定义：引入 KpiRow / SalesPerformanceCard 等 widgets */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({length: 4}).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-default-100 p-4 text-center text-default-400"
          >
            KPI {i + 1} 占位
          </div>
        ))}
      </div>
    </div>
  );
}