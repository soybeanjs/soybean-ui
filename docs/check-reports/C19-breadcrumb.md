# C19 `breadcrumb` 检查优化报告

> **组件编号：** C19
> **组件名称：** `breadcrumb` / `SBreadcrumb`
> **模式：** 多槽 + Compact（`scv()` 配方 `breadcrumbVariants`，7 slots：root / list / item / page / separator / ellipsis / link；headless `BreadcrumbCompact` 聚合 Root + List + Item + Link + Page + Separator + Ellipsis）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-12

---

## 一、执行摘要

对 `SBreadcrumb` 完成全维度审计。组件架构清晰：headless 层拥有 9 个 SFC + `context.ts` + `shared.ts`（`getEllipsisRange` 纯函数），`BreadcrumbCompact` 泛型组件聚合数据驱动组合，`Link` 原语复用保证路由一致性，locale 注册表提供 `nav` aria-label。styled 层使用 `scv()` 7 槽配方，6 种 size 缩放字号与间距，`focus-visible` 焦点环。

发现并修复 1 项问题：

1. **Minor (D3-12)**：`BreadcrumbCompact` 的 `handleItemClick` 无条件 emit `click`，点击 disabled 条目的非链接区域（如 `item-leading` 图标区）仍会触发事件——disabled 条目应完全惰性。
2. **Major (D6)**：中英文文档仅有 Overview / Usage / Demos / API，缺少 Features / Notes / FAQ。

测试从 4 项扩展到 21 项（新增 ellipsis 自定义范围 / disabled 点击抑制 / 自定义槽 / size 变体 / aria 属性）。

|    维度     | 状态 | 说明                                                                                                                                                                                               |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact；`scv()` `// @unocss-include`；`useOmitProps` 含 class/size/ui；`data-soybean-breadcrumb-*` 全覆盖；`aria-current="page"` + `aria-disabled` + `aria-hidden` + `role="presentation"` |
| D2 行业对标 |  ✅  | 数据驱动 `items` + `ellipsis`（true/自定义范围）+ 链接/当前页语义 + 点击事件携带条目数据 + 8 个类型化槽 + 区域级透传 + size 缩放，与 shadcn-vue / Ant Design / Element Plus 对标                   |
| D3 API 设计 |  ✅  | generic `T extends BreadcrumbOptionData`；`ellipsis: true \| [number, number] \| null`；`click(item)` 事件；6 组区域 props 透传；**已修复 disabled 条目点击仍 emit 的 bug**                        |
| D4 类型系统 |  ✅  | strict 通过；`BreadcrumbCompactSlots<T>` 8 槽全部类型化 scoped props；`BreadcrumbUiSlot` 7 槽；`IconValue` 类型；JSDoc 齐全                                                                        |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardListeners` + `keysOf(slots)` 动态转发；`computed` 缓存派生值（ellipsisRange/visibleItems/ellipsisItems/startIndex）；无副作用清理需求                                  |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（11 条）+ Notes（架构对标表 10 维度 + 运行时注意事项 6 条）+ FAQ（7 条）                                                                                                 |
|   D7 其他   |  ✅  | 21 项单元测试通过；纯函数 `getEllipsisRange` 边界测试（start 0→1 / end length→length-1 / <5 条不折叠）；SSR 安全（无 window/document 访问）                                                        |

---

## 二、行业对标矩阵

| 能力                 |     SoybeanUI      | shadcn-vue `Breadcrumb` | Ant Design `Breadcrumb` | Element Plus `Breadcrumb` |
| :------------------- | :----------------: | :---------------------: | :---------------------: | :-----------------------: |
| headless/styled 分离 |         ✅         |            —            |            —            |             —             |
| 数据驱动 compact API |         ✅         |            —            |           ✅            |            ✅             |
| 省略号折叠           | ✅ true/自定义范围 |            —            |           ✅            |             —             |
| 链接 vs 当前页       |         ✅         |           ✅            |           ✅            |            ✅             |
| 携带数据的点击事件   |         ✅         |            —            |           ✅            |            ✅             |
| 禁用条目             |         ✅         |            —            |           ✅            |             —             |
| 本地化 aria-label    |         ✅         |            —            |            —            |             —             |
| 区域级属性透传       |         ✅         |           ✅            |            —            |             —             |
| 自定义槽             |         ✅         |           ✅            |            —            |            ✅             |
| 尺寸缩放             |         ✅         |            —            |           ✅            |             —             |

---

## 三、发现的问题与处理

### 3.1 Minor — disabled 条目点击仍 emit click（已修复，D3-12）

**问题：** `breadcrumb-compact.vue` 的 `handleItemClick` 无条件执行 `emit('click', item)`。虽然 disabled 条目的链接被 Link 原语禁用，但点击条目的非链接区域（`item-leading` 图标、padding 区域等）仍会冒泡触发 `click` 事件——disabled 语义不完整。

**修复：**

```ts
const handleItemClick = (item: T) => {
  if (item.disabled) {
    return;
  }

  emit('click', item);
};
```

### 3.2 Major — 文档缺少 Features / Notes / FAQ（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**修复：** 中英文文档新增 Features（11 条）、Notes（架构对标表 10 维度 + 运行时注意事项 6 条）、FAQ（7 条），保留原有 `<UsageCode>` / `<PlaygroundGallery>` / `<ComponentApi>` 结构。

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                                                                          |
| :----------------- | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **D1-12** 槽组合   |  ✅  | 8 个 headless 原语（Root/List/Item/Link/Page/Separator/Ellipsis + Compact 泛型聚合）；Compact 提供 8 个类型化槽（default/ellipsis/ellipsis-icon/separator/item-leading/item-link/item-label/item-trailing）；UI wrapper 用 `keysOf(slots)` + `v-for` 动态转发全部槽（[breadcrumb.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/breadcrumb/breadcrumb.vue#L31-L36)） |
| **D2-11** 防篡改   |  —   | 面包屑为导航组件，无遮罩层/水印等防篡改需求；与 shadcn-vue 一致。数据驱动 compact API（items/ellipsis/click）覆盖 `D2-02` 数据驱动对标                                                                                                                                                                                                                                                                        |
| **D3-12** API 设计 |  ✅  | `ellipsis: true \| [number, number] \| null` + `getEllipsisRange` 边界归一化（start 0→1、end length→length-1、<5 条返回 null）；6 组区域 props 透传；`click(item)` 携带完整条目数据；已修复 disabled 点击泄漏                                                                                                                                                                                                 |

---

## 五、架构亮点

### `getEllipsisRange` 纯函数（`shared.ts`）

```ts
export function getEllipsisRange<T extends BreadcrumbOptionData>(items, ellipsis) {
  const MIN_ITEM_COUNT_WITH_ELLIPSIS = 5;
  if (!ellipsis || items.length < MIN_ITEM_COUNT_WITH_ELLIPSIS) return null;
  if (ellipsis === true) return [1, items.length - 2] as const;
  let [start, end] = ellipsis;
  if (start === 0) start = 1;
  if (end === items.length) end = items.length - 1;
  return [start, end] as const;
}
```

- `true` → `[1, len-2]`（折叠全部中间项）
- 自定义范围端点归一化，保证首尾始终可见
- 输出被三个 `computed`（`startIndex` / `visibleItems` / `ellipsisItems`）消费

### 省略号渲染位置（`breadcrumb-compact.vue`）

`visibleItems` 是 `[...slice(0, start), ...slice(end)]` 的拼接数组，模板中 `index === startIndex` 时渲染省略号 + 分隔符——即省略号恰好出现在首个折叠后可见条目之前，视觉位置正确。

### 链接与当前页分流

`item.to || item.href` → `BreadcrumbLink`（Link 原语：路由/锚点/external/target/disabled）；否则 → `BreadcrumbPage`（`role="link"` + `aria-disabled="true"` + `aria-current="page"`）。带 `item.icon` 时经 `item-leading` 槽默认渲染图标。

---

## 六、变更文件清单

| 文件                                                                 | 变更类型                                                                                                                              |
| :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/headless/src/components/breadcrumb/breadcrumb-compact.vue` | 修复 disabled 条目点击泄漏：`handleItemClick` 增加 `item.disabled` 短路                                                               |
| `packages/ui/test/specs/components/breadcrumb.spec.ts`               | 从 4 项扩展到 21 项（ellipsis 自定义范围 / 端点归一化 / <5 条不折叠 / disabled 点击抑制 / 自定义槽 ×3 / size 变体 ×6 / aria 属性 ×3） |
| `apps/docs/src/docs/en/components/breadcrumb.md`                     | 新增 Features（11 条）+ Notes（架构对标表 10 维度 + 运行时注意事项 6 条）+ FAQ（7 条）                                                |
| `apps/docs/src/docs/zh-CN/components/breadcrumb.md`                  | 新增功能（11 条）+ 注意事项（架构对标表 10 维度 + 运行时注意事项 6 条）+ 常见问题（7 条）                                             |
| `docs/check.md`                                                      | 标记 C19 各维度为 ✅                                                                                                                  |

---

## 七、验证命令

```bash
# 单元测试（21 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/breadcrumb.spec.ts
# → Test Files 1 passed (1) | Tests 21 passed (21)

# 类型检查（全工作区通过）
pnpm typecheck
# → 全部 Done

# Lint
pnpm lint
# → Found 0 warnings and 0 errors.
```

---

## 八、遗留 P3 增强项

- **RTL 分隔符方向**：默认 `separator` 图标为 `lucide:chevron-right`，在 RTL 布局下不反转（与 Ant Design 默认行为一致——字符/图标不随方向反转，用户可通过 `separator` 槽自定义）。记录为增强项，非阻塞。
