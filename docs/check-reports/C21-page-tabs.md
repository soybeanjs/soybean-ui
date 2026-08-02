# C21 `page-tabs` 检查优化报告

> **组件编号：** C21
> **组件名称：** `page-tabs` / `SPageTabs`
> **模式：** 多槽 + Compact（泛型 `PageTabsCompact<T>` 聚合 Root + Item + Close + Pin；`scv()` 配方 `pageTabsVariants`，5 UI slots：root / item / close / pin / itemText + 6 内容槽：item / icon / label / indicator / pin-icon / close-icon）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-12

---

## 一、执行摘要

对 `SPageTabs` 完成全维度审计。组件架构清晰：headless 层拥有 5 个 SFC + `context.ts` + `hooks.ts`（`usePageTabsState` 状态组合式 + `usePageTabsScroll` 滚动组合式），泛型 `PageTabsCompact<T extends PageTabsOptionData>` 聚合数据驱动组合，`RovingFocusGroup` 提供方向键导航，`useControllableState` 双通道管理 modelValue 与 items，locale 注册表提供按钮文案。styled 层使用 `scv()` 配方 + 3 变体（chrome/card/slider）指示器。

发现并修复 2 项问题：

1. **Major (D7-05)**：close/pin 按钮的 aria-label 硬编码英文（`Close tab` / `Pin tab` / `Unpin tab`），未接入 locale 系统——关闭与固定是高频辅助操作，非英语用户（13 个内置语言）会收到错误播报。
2. **Major (D6)**：中英文文档仅有 Overview / Usage / Demos，连 API 节都缺失，更无 Features / Notes / FAQ。

测试从 7 项扩展到 28 项（新增 close/pin 按钮渲染、受控/非受控状态同步、beforeClose 同步与异步守卫、关闭活动标签兄弟回退、键盘 Enter/Backspace、固定排序 update:items、上下文菜单 contextmenu、本地化 aria-label ×2、axe 扫描 ×2）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                           |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact；泛型 `PageTabsCompact<T>`；`data-soybean-page-tabs-*` 全覆盖 + `data-active`/`data-pinned`/`data-value` 状态钩子；middleClickClose / beforeClose / pin 排序 / roving focus 键盘导航 / 自动居中滚动全部就位     |
| D2 行业对标 |  ✅  | 数据驱动 items + 关闭/固定/左-右-其他-全部关闭上下文菜单 + 中键关闭 + 键盘导航 + 自动滚动活动标签 + chrome/card/slider 三变体，与 Ant Design Tabs / Element Plus Tabs / tags-view 模式对标                                     |
| D3 API 设计 |  ✅  | 泛型 `PageTabsCompactProps<T>`；`useControllableState` 双状态（modelValue + items）；`menuFactory(tab, state)` + `PageTabsState`（8 动作 + 4 个 `*Closable` 布尔）；`beforeClose` 支持同步/异步守卫；6 个类型化槽 scoped props |
| D4 类型系统 |  ✅  | strict 通过；`PageTabsOptionData` / `PageTabsState` / `PageTabsCompactItemSlotProps<T>` / `PageTabsUiSlot` 全类型化；判别式事件签名 `(e: 'pin', pinned: boolean)`；JSDoc 齐全                                                  |
| D5 代码规范 |  ✅  | `usePageTabsState`/`usePageTabsScroll` 组合式拆分关注点；`useControllableState` 双通道；`keysOf(slots)` 动态转发；`useOmitProps` 含 class/size/ui；`nextTick` 后元素重校验防卸载竞态                                           |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（12 条）+ Notes（架构对标表 12 维度 + 运行时注意事项 7 条）+ FAQ（7 条），并补齐缺失的 API 节                                                                                                        |
|   D7 其他   |  ✅  | 28 项单元测试通过（axe-core 无违规）；SSR 安全（无 window/document 访问，滚动逻辑仅依赖元素引用）；`usePageTabsScroll` 在元素移除后安全返回                                                                                    |

---

## 二、行业对标矩阵

| 能力                                   | SoybeanUI | Ant Design `Tabs` | Element Plus `Tabs` | tags-view（vue-element-admin 风格） |
| :------------------------------------- | :-------: | :---------------: | :-----------------: | :---------------------------------: |
| headless/styled 分离                   |    ✅     |         —         |          —          |                  —                  |
| 数据驱动 compact API                   |    ✅     |        ✅         |         ✅          |                 ✅                  |
| 受控/非受控                            |    ✅     |        ✅         |         ✅          |                  —                  |
| 可关闭 + 异步守卫                      |    ✅     |        ✅         |         ✅          |                 ✅                  |
| 固定/取消固定 + 自动排序               |    ✅     |         —         |          —          |                 ✅                  |
| 上下文菜单（左/右/其他/全部）          |    ✅     |         —         |          —          |                 ✅                  |
| 中键点击关闭                           |    ✅     |         —         |          —          |                 ✅                  |
| 键盘（roving focus + Enter/Backspace） |    ✅     |        ✅         |         ✅          |                  —                  |
| 活动标签自动滚动                       |    ✅     |        ✅         |          —          |                 ✅                  |
| 变体系统                               |    ✅     |        ✅         |         ✅          |                  —                  |
| 本地化 aria-label                      |    ✅     |       部分        |          —          |                  —                  |
| 自定义槽                               |    ✅     |        ✅         |         ✅          |                  —                  |

---

## 三、发现的问题与处理

### 3.1 Major — close/pin 按钮 aria-label 硬编码英文（已修复，D7-05）

**问题：** `page-tabs-close.vue` 将关闭按钮 aria-label 硬编码为 `'Close tab'`，`page-tabs-pin.vue` 硬编码为 `'Pin tab'` / `'Unpin tab'`。关闭与固定是标签页的高频辅助操作，英语之外的用户（内置 13 种语言）会收到错误的无障碍播报，且无法通过 `ConfigProvider` 覆盖。

**修复：**

1. `locale/types.ts` 新增 `LocalePageTabsMessages`（`closeTab` / `pinTab` / `unpinTab`），13 个语言文件全部补齐翻译。
2. 两个组件改用 `useLocaleMessages`：

```ts
// page-tabs-close.vue
const messages = useLocaleMessages();
const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? messages.value.pageTabs.closeTab);
```

```ts
// page-tabs-pin.vue
const ariaLabel = computed(
  () =>
    (attrs['aria-label'] as string) ??
    (pinned.value ? messages.value.pageTabs.unpinTab : messages.value.pageTabs.pinTab)
);
```

显式 `aria-label` 属性优先于 locale 回退，兼容既有用法。

### 3.2 Major — 文档缺失 Features / Notes / FAQ 与 API 节（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**修复：** 中英文文档补齐 `<ComponentApi>` 节，新增 Features（12 条）、Notes（架构对标表 12 维度 + 运行时注意事项 7 条）、FAQ（7 条）。

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------- | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-08** 键盘导航 |  ✅  | `PageTabsRoot` 基于 `RovingFocusGroup`（`orientation="horizontal"`，loop 默认 true）提供方向键 roving focus；`PageTabsItem` 的 `@keydown.enter.backspace` 实现 Enter 激活 / Backspace 关闭；close/pin 按钮 `tabindex="-1"` 避免打断 roving 循环（[page-tabs-item.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/page-tabs/page-tabs-item.vue#L37-L46)） |
| **D2-11** 防篡改   |  —   | 标签页为导航控件，无遮罩/水印等防篡改需求；数据驱动 compact API（items/menuFactory/selectContextMenu）覆盖 `D2-02` 对标                                                                                                                                                                                                                                                                                |
| **D3-12** API 设计 |  ✅  | `menuFactory(tab, state)` 返回 `PageTabsContextMenuOptionData[]`；`PageTabsState` 暴露 8 动作 + 4 个 `*Closable` 布尔（close/closeLeft/closeRight/closeOther/closeAll/pin/unpin + 对应可关闭性），`selectContextMenu(menu, tab)` 事件携带动作与目标标签；`beforeClose` 支持 `MaybePromise<boolean \| void>`（已测同步 false 与异步 true 双路径）                                                       |

---

## 五、架构亮点

### `usePageTabsState` 组合式（`hooks.ts`）

关闭/固定/排序/上下文状态全部收敛为一个组合式，纯函数式 API 返回给 `menuFactory` 消费：

```ts
const getState = (tab: T): PageTabsState => ({
  pin: () => {
    tab.pinned = true;
    sortTabs();
  },
  unpin: () => {
    tab.pinned = false;
    sortTabs();
  },
  closable: canCloseTab(value),
  close: async () => {
    await closeTab(value);
  },
  leftClosable: canCloseLeftTabs(value),
  closeLeft: () => {
    closeLeftTabs(value);
  }
  // ... right / other / all
});
```

- `closeTab` 支持异步 `beforeClose` 守卫，守卫通过后才移除并回退激活兄弟标签
- `sortTabs` 按 隐藏固定图标 → 固定 → 普通 排序，仅在变化时写入（`hasChanged` 短路）
- `getLeftClosableTabs`/`getRightClosableTabs` 基于 `pinned` 过滤，保证固定标签永不被批量关闭

### `usePageTabsScroll` 组合式（`hooks.ts`）

```ts
watchEffect(async () => {
  if (!rootElement.value || !activeValue.value) return;
  await nextTick();
  if (!rootElement.value) return; // await 后元素可能已被移除
  const activeElement = rootElement.value.querySelector(`[data-value="${activeValue.value}"]`);
  const offsetX = activeElement.offsetLeft + activeElement.offsetWidth / 2 - centerX;
  rootElement.value.scrollTo({ left: offsetX, behavior: 'smooth' });
});
```

活动标签变化后平滑滚动居中；`nextTick` 后二次校验防止元素移除竞态（[hooks.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/page-tabs/hooks.ts#L22-L38)）。

### 泛型 Compact + 双受控状态（`page-tabs-compact.vue`）

`PageTabsCompact<T extends PageTabsOptionData>` 用 `useControllableState` 管理 `modelValue` 与 `items` 双通道；`watchEffect(() => sortTabs())` 保证任意 items 变更后立即重排；插槽默认内容完整（图标 + 标签 + pin + close + indicator），全部可被 6 个类型化槽覆盖。

### `data-active` 状态钩子

`:data-active="isActive"` 输出 `data-active="true"/"false"`，样式配方通过 `data-[active=true]:` / `data-[active=false]:` 属性选择器分流选中态与悬停态，chrome 变体的圆角 SVG 也复用 `group-data-[active=true]/item:` 实现切角效果。

---

## 六、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                                                                                                                                               |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/page-tabs/page-tabs-close.vue`                          | 修复 aria-label 硬编码英文：改用 `useLocaleMessages` 回退 `pageTabs.closeTab`                                                                                                                                                          |
| `packages/headless/src/components/page-tabs/page-tabs-pin.vue`                            | 修复 aria-label 硬编码英文：改用 `useLocaleMessages` 按 pinned 状态回退 `pageTabs.unpinTab` / `pageTabs.pinTab`                                                                                                                        |
| `packages/headless/src/locale/types.ts`                                                   | 新增 `LocalePageTabsMessages`（closeTab/pinTab/unpinTab）并挂入 `LocaleMessages.pageTabs`                                                                                                                                              |
| `packages/headless/src/locale/langs/{en,zh-CN,zh-TW,ja,ko,de,fr,es,pt-BR,ru,tr,id,ar}.ts` | 13 个语言文件新增 `pageTabs` 翻译                                                                                                                                                                                                      |
| `packages/ui/test/specs/components/page-tabs.spec.ts`                                     | 从 7 项扩展到 28 项（close/pin 按钮渲染 ×2 / chrome/slider 指示器 / 受控与非受控状态同步 / beforeClose 同步+异步 / 关闭活动标签兄弟回退 / Enter+Backspace / 固定排序 update:items / contextmenu 悬停 / 本地化 aria-label ×2 / axe ×2） |
| `apps/docs/src/docs/en/components/page-tabs.md`                                           | 补齐 API 节；新增 Features（12 条）+ Notes（架构对标表 12 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                                                                                                    |
| `apps/docs/src/docs/zh-CN/components/page-tabs.md`                                        | 补齐 API 节；新增功能（12 条）+ 备注（架构对标表 12 维度 + 运行时注意事项 7 条）+ 常见问题（7 条）                                                                                                                                     |
| `docs/check.md`                                                                           | 标记 C21 各维度为 ✅                                                                                                                                                                                                                   |

---

## 七、验证命令

```bash
# 单元测试（28 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/page-tabs.spec.ts
# → Test Files 1 passed (1) | Tests 28 passed (28)

# 类型检查（全工作区通过）
pnpm typecheck
# → 全部 Done

# Lint
pnpm lint
# → Found 0 warnings and 0 errors.
```

---

## 八、遗留 P3 增强项

- **`contextmenu` 事件语义**：`PageTabsCompact` 在 pointerenter（悬停）时即发出名为 `contextmenu` 的事件（用于标记右键菜单目标），并非真正的右键触发。语义命名易混淆，可考虑改名或补充独立的右键事件。记录为增强项，非阻塞。
- **内联固定按钮仅支持取消固定**：`PageTabsPin` 仅在 `pinned` 时渲染（点击取消固定），"固定"动作需通过上下文菜单完成。可考虑增加 prop 允许未固定标签也显示内联固定按钮。记录为增强项，非阻塞。
- **e2e 键盘导航**：`page-tabs` 在 check.md 的 D7-19/D7-20 e2e 范围内（键盘导航类），当前依赖单元测试 + axe 静态扫描；roving focus 方向键的端到端验证留待 e2e 专项补充，非 Blocker（组件无依赖 happy-dom 必须模拟的平台 API）。
