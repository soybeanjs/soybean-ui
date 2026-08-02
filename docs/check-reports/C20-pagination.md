# C20 `pagination` 检查优化报告

> **组件编号：** C20
> **组件名称：** `pagination` / `SPagination`
> **模式：** 多槽 + Compact（`scv()` 配方 `paginationVariants`，8 slots：root / list / listItem / ellipsis / first / prev / next / last；headless `PaginationCompact` 聚合 Root + List + ListItem + Ellipsis + First + Prev + Next + Last）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `SPagination` 完成全维度审计。组件架构清晰：headless 层拥有 9 个 SFC + `context.ts`（`useControllableState` 管理受控/非受控 page 与 pageSize）+ `shared.ts`（`getRange`/`transform` 纯函数），`PaginationCompact` 聚合数据驱动组合，locale 注册表提供全部按钮 aria-label。styled 层使用 `scv()` 8 槽配方 + `extendBase` 复用 `paginationAction` cv 配方（4 变体 × 2 shape × 6 size），`actionAsSelected` 变体，`data-[selected]` 属性选择器，`rtl:[&>svg]:rotate-180` 图标镜像。

发现并修复 2 项问题：

1. **Major (D7-05)**：`PaginationListItem` 的 aria-label 硬编码英文 `Page ${value}`，未接入 locale 系统——页码按钮是分页最核心的交互元素，非英语用户（13 个内置语言）会被错误播报。
2. **Major (D6)**：中英文文档仅有 Overview / Usage / Demos / API，缺少 Features / Notes / FAQ。

测试从 3 项扩展到 22 项（新增边界禁用 / 受控 v-model / showFirstOrLast / 双省略号数学 / siblingCount 窗口 / 本地化 aria-label / 自定义槽 / a11y 扫描）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                   |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact；`scv()` `// @unocss-include`；`useOmitProps` 含 class/size/ui/variant/shape/actionAsSelected；`data-soybean-pagination-*` 全覆盖；`aria-current="page"` + 本地化 `aria-label`；边界禁用与整体 disabled |
| D2 行业对标 |  ✅  | 受控/非受控 page + pageSize、`showEdges` 单/双省略号、`siblingCount` 窗口、`actionAsSelected`、8 个类型化槽 + 7 组区域 props 透传、4 变体 × 2 shape × 6 size，与 shadcn-vue / Ant Design / Element Plus 对标           |
| D3 API 设计 |  ✅  | `useControllableState` 双状态（page/pageSize）；`PaginationCompactProps` 拆分 root/区域 props；`PaginationUiSlot` 8 槽；`Pages = Array<PageEllipsis \| PageItem>` 判别联合；`getRange` 纯函数集中窗口数学              |
| D4 类型系统 |  ✅  | strict 通过；`PaginationListItemProps extends ButtonProps { value }`；8 槽 + 7 组透传 props 全部类型化；JSDoc 齐全（含 `@default` 标注）                                                                               |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardListeners` + `keysOf(slots)` 动态转发；`transformPropsToContext` 上下文响应式；`extendBase` 复用 cv 配方避免重复类名；无副作用清理需求                                                     |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（12 条）+ Notes（架构对标表 12 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                                                                                     |
|   D7 其他   |  ✅  | 22 项单元测试通过（axe-core 无违规）；`getRange` 边界数学测试（page=50 双省略号 / page=5 单省略号 / siblingCount=1 窗口 / showEdges=false 仅窗口）；SSR 安全（无 window/document 访问）                                |

---

## 二、行业对标矩阵

| 能力                 |                      SoybeanUI                       | shadcn-vue `Pagination` | Ant Design `Pagination` | Element Plus `Pagination` |
| :------------------- | :--------------------------------------------------: | :---------------------: | :---------------------: | :-----------------------: |
| headless/styled 分离 |                          ✅                          |            —            |            —            |             —             |
| 数据驱动 compact API |                          ✅                          |           ✅            |           ✅            |            ✅             |
| 受控/非受控          |                          ✅                          |           ✅            |           ✅            |            ✅             |
| 省略号与固定首尾页   |                          ✅                          |           ✅            |           ✅            |            ✅             |
| 边界自动禁用         |                          ✅                          |            —            |            —            |            ✅             |
| 整体禁用             |                          ✅                          |           ✅            |           ✅            |            ✅             |
| 选中页样式           |                          ✅                          |           ✅            |           ✅            |            ✅             |
| 本地化 aria-label    |                          ✅                          |            —            |          部分           |             —             |
| 变体系统             | ✅ pure/solid/outline/soft × rounded/square × xs…2xl |            —            |           ✅            |            ✅             |
| 区域级属性透传       |                          ✅                          |           ✅            |            —            |            ✅             |
| 自定义槽             |                          ✅                          |           ✅            |            —            |            ✅             |
| RTL 图标镜像         |                          ✅                          |            —            |           ✅            |            ✅             |

---

## 三、发现的问题与处理

### 3.1 Major — 页码按钮 aria-label 硬编码英文（已修复，D7-05）

**问题：** `pagination-list-item.vue` 将页码按钮的 `aria-label` 硬编码为 `` `Page ${props.value}` ``（英文），未接入 locale 系统。分页按钮是高频交互元素，英语之外的用户（内置 13 种语言）会收到错误的无障碍播报，且无法通过 `ConfigProvider` 覆盖。

**修复：**

1. `locale/types.ts` 的 `LocalePaginationMessages` 新增 `pageLabel` key（支持 `{value}` 占位符），13 个语言文件全部补齐（`en: 'Page {value}'` / `zh-CN: '第 {value} 页'` 等）。
2. `pagination-list-item.vue` 改用 `useLocaleMessages` + `interpolate`（沿用 table `sortByColumn` 的既有插值模式）：

```ts
const messages = useLocaleMessages();

const pageLabel = computed(() => interpolate(messages.value.pagination.pageLabel, { value: String(props.value) }));
```

```vue
:aria-label="pageLabel"
```

### 3.2 Major — 文档缺少 Features / Notes / FAQ（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**修复：** 中英文文档新增 Features（12 条）、Notes（架构对标表 12 维度 + 运行时注意事项 7 条）、FAQ（7 条），保留原有 `<UsageCode>` / `<PlaygroundGallery>` / `<ComponentApi>` 结构。

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                    |
| :----------------- | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-12** 槽组合   |  ✅  | headless `PaginationCompact` 提供 8 个槽（default 列表 / leading / trailing / first / prev / next / last / ellipsis）；UI wrapper 用 `keysOf(slots)` + `v-for` 动态转发全部槽（[pagination.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/pagination/pagination.vue#L43-L48)） |
| **D2-11** 防篡改   |  —   | 分页为导航控件，无遮罩/水印等防篡改需求；`PaginationRootProps` 与 Compact 数据驱动 API 覆盖 `D2-02` 对标                                                                                                                                                                                                                |
| **D3-01** 状态管理 |  ✅  | `useControllableState` 双状态：page（`props.page` ↔ `update:page` ↔ `defaultPage`）、pageSize（同构）；`transformPropsToContext` 将 total/siblingCount/disabled/showEdges 注入上下文；`pageCount = Math.max(1, ceil(total/pageSize))` 防空列表                                                                          |
| **D7-05** 本地化   |  ✅  | 5 类按钮文案全部接入 locale：firstPage / prevPage / nextPage / lastPage（静态）+ pageLabel（`{value}` 插值）；缺失 key 经 `defu(userMessages, baseMessages)` 回退英文包；**已修复页码 aria-label 硬编码英文的 bug**                                                                                                     |

---

## 五、架构亮点

### `getRange` 纯函数（`shared.ts`）

窗口数学集中在一个纯函数中，`showEdges` 分支决定单/双省略号：

```ts
const showLeftEllipsis =
  leftSiblingIndex > firstPageIndex + 2 && // 默认条件
  Math.abs(lastPageIndex - itemCount - firstPageIndex + 1) > 2 && // 靠近末尾时退化
  Math.abs(leftSiblingIndex - firstPageIndex) > 2; // 靠近开头时退化

const showRightEllipsis =
  rightSiblingIndex < lastPageIndex - 2 &&
  Math.abs(lastPageIndex - itemCount) > 2 &&
  Math.abs(lastPageIndex - rightSiblingIndex) > 2;
```

- 双省略号仅在当前页远离两端时出现（如 100 页中的第 50 页 → `[1, ⋯, 48,49,50,51,52, ⋯, 100]`）
- 单省略号退化分支：`[1..itemCount, ⋯, last]` 或 `[first, ⋯, last-itemCount+1..last]`
- `showEdges: false` 时 `itemCount = siblingCount * 2 + 1` 纯窗口

### `extendBase` 复用 cv 配方（`styles/pagination.ts`）

```ts
export const paginationVariants = scv({
  extendBase: props => {
    const variant = props.actionAsSelected ? props.variant : undefined;
    return {
      first: paginationAction({ size, variant, shape }),
      prev: paginationAction({ size, variant, shape })
      // ...
    };
  }
  // ...
});
```

first/prev/next/last 四个操作按钮复用 `paginationAction` cv 配方，`actionAsSelected` 决定是否套用选中 variant——避免在 scv 中重复声明 4 组相同类名。

### 受控状态双通道（`pagination-root.vue`）

`page` 与 `pageSize` 各自走 `useControllableState` 受控/非受控双通道，根节点通过 scoped slot 暴露 `{ page, pageCount }`，让自定义列表布局无需重新实现窗口算法。

---

## 六、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                                                                                                                                       |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/pagination/pagination-list-item.vue`                    | 修复 aria-label 硬编码英文：改用 `useLocaleMessages` + `interpolate` 接入 locale `pageLabel` 模板                                                                                                                              |
| `packages/headless/src/locale/types.ts`                                                   | `LocalePaginationMessages` 新增 `pageLabel` key（`{value}` 占位符，带 JSDoc）                                                                                                                                                  |
| `packages/headless/src/locale/langs/{en,zh-CN,zh-TW,ja,ko,de,fr,es,pt-BR,ru,tr,id,ar}.ts` | 13 个语言文件 `pagination` 对象新增 `pageLabel` 翻译                                                                                                                                                                           |
| `packages/ui/test/specs/components/pagination.spec.ts`                                    | 从 3 项扩展到 22 项（渲染结构 / 受控 v-model:page / 边界禁用与整体 disabled / prev-next 与 first-last 导航 / showFirstOrLast / 双省略号数学 page=50 / siblingCount 窗口 / 本地化 aria-label ×3 / 自定义槽 ×2 / axe 无违规 ×2） |
| `apps/docs/src/docs/en/components/pagination.md`                                          | 新增 Features（12 条）+ Notes（架构对标表 12 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                                                                                                         |
| `apps/docs/src/docs/zh-CN/components/pagination.md`                                       | 新增功能（12 条）+ 备注（架构对标表 12 维度 + 运行时注意事项 7 条）+ 常见问题（7 条）                                                                                                                                          |
| `docs/check.md`                                                                           | 标记 C20 各维度为 ✅                                                                                                                                                                                                           |

---

## 七、验证命令

```bash
# 单元测试（22 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/pagination.spec.ts
# → Test Files 1 passed (1) | Tests 22 passed (22)

# 类型检查（全工作区通过）
pnpm typecheck
# → 全部 Done

# Lint
pnpm lint
# → Found 0 warnings and 0 errors.
```

---

## 八、遗留 P3 增强项

- **`pageSize` 切换器**：当前 `pageSize` 支持受控/非受控状态与 `update:pageSize` 事件，但 Compact 未内置 pageSize 选择器 UI（与 Ant Design `showSizeChanger` 对标）。记录为增强项，非阻塞。
- **e2e 键盘导航**：`pagination` 在 check.md 的 D7-19/D7-20 e2e 范围内（键盘导航类），当前依赖单元测试 + axe 静态扫描；键盘翻页的端到端验证留待 e2e 专项补充，非 Blocker（组件无依赖 happy-dom 必须模拟的平台 API）。
