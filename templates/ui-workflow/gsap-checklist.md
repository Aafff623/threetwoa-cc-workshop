---
title: "GSAP Motion 实现检查清单"
type: template
status: draft
updated: 2026-05-30
owner: threetwoa
---

# GSAP Motion 实现检查清单

> 基于 `docs/ui-workflow/gsap-motion-guide.md`

---

## Stage 1: 动画规划

- [ ] 明确动画目标（引导注意力 / 反馈状态 / 增强品牌）
- [ ] 识别动画触发条件（scroll / hover / load / interaction）
- [ ] 确定动画复杂度（简单过渡 / 序列动画 / 交互响应）
- [ ] 评估性能影响（目标设备、帧率要求）

## Stage 2: 技术选型

- [ ] 选择 GSAP 插件：
  - [ ] `gsap` 核心（必选）
  - [ ] `ScrollTrigger`（滚动动画）
  - [ ] `SplitText`（文本动画）
  - [ ] `Flip`（布局过渡）
  - [ ] `MorphSVG`（SVG 变形）
- [ ] 确认 React/Vue/原生集成方式

## Stage 3: 实现

- [ ] 创建 timeline 或 tween
- [ ] 设置正确的 ease（`power2.out` 默认，避免 `linear`）
- [ ] 使用 `fromTo()` 而非 `from()`（避免 FOUC）
- [ ] 设置 `will-change: transform, opacity`（仅限动画元素）
- [ ] 使用 `transform` 和 `opacity`（避免触发 layout/paint）

## Stage 4: 性能优化

- [ ] 启用 `gsap.context()` 管理作用域
- [ ] 组件卸载时调用 `ctx.revert()`
- [ ] 使用 `ScrollTrigger.normalizeScroll(true)`（移动端）
- [ ] 避免同时运行 > 10 个 active tween
- [ ] 使用 `force3D: true` 强制 GPU 加速

## Stage 5: 可访问性

- [ ] 支持 `prefers-reduced-motion: reduce`
- [ ] 确保动画不遮挡重要内容
- [ ] 动画时长 < 5s（避免眩晕）
- [ ] 提供跳过动画的选项

## Stage 6: 测试

- [ ] 桌面端 Chrome/Firefox/Safari 测试
- [ ] 移动端 iOS Safari / Android Chrome 测试
- [ ] 性能面板验证 60fps
- [ ] Lighthouse 动画性能评分 > 90

## 常见陷阱

| 陷阱 | 后果 | 解决方案 |
|------|------|---------|
| 使用 `left/top` 做动画 | 触发 layout，卡顿 | 使用 `transform: translate()` |
| 同时动画 > 50 个元素 | 掉帧 | 分批动画，使用 `stagger` |
| 忘记 `ctx.revert()` | 内存泄漏 | 组件卸载时清理 |
| `from()` 导致 FOUC | 元素闪现 | 使用 `fromTo()` |
| 忽视 `prefers-reduced-motion` | 可访问性问题 | 条件禁用动画 |
