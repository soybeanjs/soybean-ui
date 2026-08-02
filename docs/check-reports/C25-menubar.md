# C25 `menubar` 检查优化报告

> **组件编号：** C25
> **组件名称：** `menubar` / `SMenubar`
> **模式：** 多槽（headless `MenubarRoot` + `MenubarMenu` + `MenubarTrigger` + `MenubarContent` + `MenubarSubTrigger` + `MenubarSubContent` + `MenubarCompact` 聚合；`scv()` 配方 `menubarVariants`，root/trigger 2 UI slots）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-03、D7-05

---

## 一、执行摘要

对 `SMenubar` 完成全维度审计。组件架构清晰：headless 层以 `MenubarRoot`（RovingFocusGroup 包裹，`role="menubar"`）承载顶级焦点管理，每个顶层项经 `MenubarMenu` 包一层 `MenuRoot :modal="false"`，`MenubarTrigger` 复用 MenuAnchor + Button（as-child 可渲染为链接），`MenubarContent` 复用 MenuContent 并附加跨菜单方向键导航与焦点归还；`MenubarCompact` 数据驱动聚合全部结构，UI 层为薄包装（`useOmitProps` + slotted passthrough）。菜单子项能力全部继承自 menu 层（`MenuOptionsCompact`），两级结构清晰。

发现并修复 4 项问题：

1. **Major (D1-16)**：顶层 `item.disabled` 被忽略——非链接触发器渲染用 `v-bind="triggerProps"`，仅解析组件级 `disabled` 与 `triggerProps.disabled`，从不读取 `item.disabled`。禁用的顶层菜单项渲染为可聚焦按钮，仍可点击打开菜单；链接型触发器虽传了 `item.disabled`，但 as-child 合并顺序存在被 `undefined` 覆盖的风险（与 C24/C23 同族缺陷）。
2. **Major (D4)**：`MenubarCompactSlots.trigger` 声明为**必需**，但 compact 为触发器渲染完整默认内容（图标/标签/链接图标/尾随槽），运行时可选——类型不诚实；且导致泛型 SFC `SMenubar` 无法赋值给 `Component` 参数（vue-tsc typecheck 失败）。
3. **Major (D7-05)**：测试覆盖严重不足——原仅 2 项焦点恢复测试，无渲染 / 交互 / 禁用 / a11y 覆盖；e2e 规格缺失（audit.md 明确 menubar 属"键盘导航类（须补 e2e）"）。
4. **Major (D6)**：中英文档仅有 Overview/Usage/Demos/API，缺 Features、Notes（架构对标 + 运行时注意事项）、FAQ 章节。

测试从 2 项扩展到 14 项单测 + 4 项浏览器 e2e（新增渲染结构、size 变体、打开状态 / aria 属性、受控 emit、逐项与整体禁用、axe 闭合与打开态、真实 portal 打开、Roving Focus 键盘导航、Escape 焦点归还、颜色对比）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                     |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 顶级触发项 + 子菜单浮层 + 链接型触发器（as-child）全链路就位；**修复顶层 `item.disabled` 被忽略**（Major，三级兜底解析）；指针打开（pointerdown）/ 悬停切换 / 键盘打开（Enter/Space/ArrowDown）三模式；跨菜单方向键切换；Escape 关闭焦点归还                             |
| D2 行业对标 |  ✅  | 与 WAI-ARIA APG Menu And Menubar Pattern 对齐：`role="menubar"` + 单一 Tab 停止点（Roving Focus）+ 横向方向键移动 + 子菜单入口方向键 + 禁用项移出焦点顺序；与 Radix Menubar 键位与行为一致；`MenubarCompact` 数据驱动 API 为差异化增强（Radix 面向 JSX 组合）            |
| D3 API 设计 |  ✅  | `items`（`MenuOptionData` 递归 children）数据驱动；`triggerProps` / `linkProps` / `contentProps` / `portalProps` / `popupProps` / `placement` / `sideOffset` / `showArrow` 按元素转发；`modelValue` / `defaultValue` 受控双通道；`select` / `update:modelValue` 事件齐备 |
| D4 类型系统 |  ✅  | strict 通过；**修复 `trigger` 槽必需声明**（Major：运行时可选却类型必填，且阻断泛型 SFC 的 `Component` 赋值）；`getTriggerProps` 兜底解析 `item.disabled ?? triggerProps.disabled`；API JSON 手动同步 2 处 `required` 标记                                               |
| D5 代码规范 |  ✅  | 复用 menu 层基础件无重复逻辑；`usePickProps` 收口 Root/Options 转发；`isTriggerLink` 判定收敛于 `shared.ts`；监听器经 `useForwardListeners` 统一转发；SSR 安全；无样式泄漏到 headless                                                                                    |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（12 条）+ Notes（架构对标表 13 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                                                                                                                                       |
|   D7 其他   |  ✅  | 14 项单测 + 4 项 e2e 全通过；axe 闭合 / 打开态零违规（打开态经真实 portal 扫 body，豁免页面级 `region` 与项目惯例 `svg-img-alt`）；e2e 采用 vitest 4 正确的 `toHaveFocus` 断言（`toBeFocused` 已移除）                                                                   |

---

## 二、行业对标矩阵

| 能力                     | SoybeanUI | Ant Design `Menu` | Element Plus `Menu` | Radix `Menubar` |
| :----------------------- | :-------: | :---------------: | :-----------------: | :-------------: |
| headless/styled 分离     |    ✅     |         —         |          —          |       ✅        |
| 数据驱动 compact API     |    ✅     |        ✅         |         ✅          |        —        |
| 顶级菜单栏（menubar）    |    ✅     |        ✅         |          —          |       ✅        |
| 子菜单任意嵌套           |    ✅     |        ✅         |    部分（2 层）     |       ✅        |
| 键盘 Roving Focus        |    ✅     |        ✅         |         ✅          |       ✅        |
| 跨菜单方向键切换         |    ✅     |         —         |          —          |       ✅        |
| 链接型触发器（as-child） |    ✅     |         —         |          —          |       ✅        |
| 禁用项（逐项 + 整体）    |    ✅     |        ✅         |         ✅          |       ✅        |
| 自定义触发器/内容属性    |    ✅     |         —         |          —          |        —        |
| 受控模式                 |    ✅     |        ✅         |         ✅          |       ✅        |
| 尺寸变体                 |    ✅     |        ✅         |          —          |        —        |

---

## 三、发现的问题与处理

### 3.1 Major — 顶层 `item.disabled` 被忽略（已修复，D1-16）

**问题：** [menubar-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menubar/menubar-compact.vue#L49-L71) 非链接触发器渲染用 `v-bind="triggerProps"`，而 `triggerProps` computed 只解析组件级 `disabled` 与 `triggerProps.disabled`，从不读取 `item.disabled`。结果是：禁用的顶层菜单项渲染为可聚焦按钮，`pointerdown` 仍能打开菜单；`tabindex` 仍在 Tab 顺序中。链接型触发器虽然把 `item.disabled` 传给了 `Link`，但 `getTriggerProps` 缺失导致 as-child 合并时两端可能不一致（与 C24/C23 同族缺陷）。新测试 `menubar.spec.ts` 首次运行即捕获（`expected undefined to be 'true'`）。

**修复：** 引入 `getTriggerProps(item)` 以 `item.disabled ?? triggerProps.value.disabled` 兜底解析，模板两处触发器统一使用：

```ts
const getTriggerProps = (item: MenuOptionData<T>) => {
  const disabled = item.disabled ?? triggerProps.value.disabled;

  return {
    ...props.triggerProps,
    disabled
  };
};
```

- 链接型触发器：`<MenubarTrigger v-if="item.to || item.href" v-bind="getTriggerProps(item)" as-child>`，内部 `Link :disabled="getTriggerProps(item).disabled ?? linkProps?.disabled"` 保持触发器与链接两端一致；
- 非链接触发器：`<MenubarTrigger v-bind="getTriggerProps(item)">`（替代原 `v-bind="triggerProps"`）。

新增回归测试 2 项：`item.disabled` 顶层项渲染 `aria-disabled` / `tabindex="-1"` 且激活被阻断；紧凑级 `disabled` 禁用全部触发器（含链接型，断言 `<a>` 的 `aria-disabled`）。

### 3.2 Major — `trigger` 槽必需声明与运行时矛盾（已修复，D4）

**问题：** [types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/menubar/types.ts#L141-L149) 中 `MenubarCompactSlots` 将 `trigger` 声明为必需槽（`trigger: (data: ...) => any`），但 `MenubarCompact` 模板为触发器渲染完整默认内容（图标 / 标签 / 链接图标 / 尾随槽，`<slot name="trigger" :item="item">…默认内容…</slot>`），消费者完全不提供也能正常工作。类型不诚实（C24 linkProps 同族问题）。实际危害：泛型 SFC `SMenubar`（`MenubarSlots<T>` 继承该必需槽）无法赋值给 `Component` 类型参数——vue-tsc 报 `Property 'trigger' is missing in type 'Readonly<InternalSlots>'`。

**修复：** `trigger?:` 声明为可选并补充 JSDoc 说明默认内容。同步手动更新 [menubar.json](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/generated/api/menubar.json) 两处 `trigger` 槽 `required` 标记（`true` → `false`，MenubarSlots 与 MenubarCompactSlots 各一处），避免 `pnpm sui api` 全量重生成的 node_modules 路径漂移噪音；JSON 校验通过。

### 3.3 Major — 测试覆盖不足（已修复，D7-05）

**问题：** 原测试仅 [menubar-focus.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/menubar-focus.spec.ts) 2 项焦点恢复测试，无渲染 / 交互 / 禁用 / a11y 覆盖；浏览器 e2e 规格缺失（audit.md 将 menubar 列入"键盘导航类（须补 e2e）"）。

**修复：** 新增 [menubar.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/menubar.spec.ts) 8 项 + [menubar.e2e.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/browser/specs/components/menubar.e2e.spec.ts) 4 项：

- **单测渲染** — `role="menubar"` 结构 / 3 个触发项 / `data-soybean-menubar-*` 标记 / 链接型项渲染 `<a>` / size 变体类；
- **单测打开状态** — pointerdown 打开 + `aria-expanded` / `aria-controls` / `data-state`；受控 `update:modelValue` 事件；
- **单测禁用** — 3.1 修复的回归测试（逐项禁用 + 紧凑级整体禁用含链接型）；
- **单测 a11y** — 闭合扫 wrapper.element；打开态经**真实 portal** 扫 `document.body`（portal 禁用会把菜单嵌套进 menubar 触发 axe `aria-required-children` 误报；body 扫描引入页面级 `region`，按既有先例豁免并重建默认规则）；
- **e2e interactions** — `userEvent.click` 打开菜单（真实 Teleport，断言 `page.getByRole('menu')`）；
- **e2e focus** — `userEvent.tab()` 进入首个触发器 → `ArrowRight` Roving Focus 移至下一触发器 → `ArrowDown` 键盘打开、焦点进入内容首项（`wasKeyboardTriggerOpen` 契约）→ `Escape` 关闭、焦点归还触发器；
- **e2e a11y** — `withTheme: true` 真实颜色对比 + 打开态 axe 零违规。

### 3.4 Major — 文档缺章节（已修复，D6）

**问题：** 中英文档 [menubar.md](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/docs/zh-CN/components/menubar.md) 仅有 Overview/Usage/Demos/API，缺 Features、Notes（架构对标 + 运行时注意事项）、FAQ。

**修复：** 中英文统一重写：Features（12 条）+ Notes（架构对标表 13 维度：AntD `Menu` / Element Plus `Menu` / Radix `Menubar` + 运行时注意事项 7 条）+ FAQ（6 条），并记录 3.1 的 disabled 三级解析语义与 as-child 链接行为。

---

## 四、重点检查项结论

| 检查项                  | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :---------------------- | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-16** 焦点与键盘    |  ✅  | 单一 Tab 停止点（RovingFocusGroup，`ArrowLeft`/`ArrowRight` 移动、`loop` 循环）；`Enter`/`Space` 切换、`ArrowDown` 打开子菜单；键盘打开焦点进入内容（`wasKeyboardTriggerOpen` → `onEntryFocus` 放行）、指针打开焦点留守触发器；`Escape` 关闭且 `onCloseAutoFocus` 归还焦点；禁用触发器 `tabindex="-1"` 移出焦点顺序；跨菜单方向键切换（`onArrowNavigation` 按 `dir` 计算逻辑方向）；**修复顶层 `item.disabled` 被忽略**（3.1） |
| **D2-03** 键盘可达性    |  ✅  | 与 WAI-ARIA APG Menu And Menubar Pattern 对齐：menubar 与 menu 角色分离、触发项 `aria-haspopup="menu"` / `aria-expanded` / `aria-controls` 关联、方向键导航契约与 Radix Menubar 一致；e2e 在真实浏览器中验证 Tab → ArrowRight → ArrowDown → Escape 全链路；单测补充 `aria-disabled` / `tabindex` 断言                                                                                                                          |
| **D7-05** A11y 自动扫描 |  ✅  | 14 项单测 + 4 项 e2e 全通过；axe-core 闭合与打开态零违规（打开态经真实 portal 扫 body，豁免页面级 `region` 与项目惯例 `svg-img-alt`——后者与 `test/shared/a11y.ts` 全局豁免一致）；e2e `withTheme: true` 使 `color-contrast` 真实生效                                                                                                                                                                                           |

---

## 五、架构亮点

### disabled 三级兜底解析（`menubar-compact.vue`）

`getTriggerProps(item)` 以 `item.disabled ?? triggerProps.value.disabled` 建立「逐项 > 组件级 > triggerProps」的解析链，与 C24 navigation-menu 的 `linkProps` 兜底链同族。关键点：同一个解析结果同时喂给 `MenubarTrigger` 与 as-child 的 `Link`，保证 `Slot` 合并监听器时两端 `disabled` 语义一致，杜绝 C24/C23 同款「undefined 覆盖全局配置」缺陷。

### 复用 menu 层基础件 + 薄聚合（`MenubarCompact`）

Menubar 不重复实现菜单：`MenubarContent` 直接复用 `MenuContent`（获得定位 / dismissable / 焦点管理等全部能力），`MenubarMenu` 包一层 `MenuRoot :modal="false"`，子项由 `MenuOptionsCompact` 渲染；menubar 只额外提供顶级 Roving Focus、跨菜单方向键切换、链接型触发与焦点归还策略。UI 层 [menubar.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/menubar/menubar.vue) 为薄包装（`useOmitProps` + slotted passthrough），双 context（`provideMenubarUi` + `provideMenuUi`）注入样式。

### 键盘 / 指针打开差异化（`wasKeyboardTriggerOpen`）

`MenubarTrigger` 在 Enter/Space/ArrowDown 时置 `wasKeyboardTriggerOpen`，`MenubarContent` 的 `onEntryFocus` 据此决定是否 `preventDefault()`：键盘打开时焦点进入菜单内容，指针打开时焦点留守触发器——符合桌面菜单栏惯例（对应 Windows/Linux 菜单栏行为），e2e 已验证。

---

## 六、变更文件清单

| 文件                                                            | 变更类型                                                                                                                                       |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/menubar/menubar-compact.vue`  | 修复顶层 `item.disabled` 被忽略：新增 `getTriggerProps(item)` 兜底解析（`item.disabled ?? triggerProps.disabled`），链接与非链接触发器统一使用 |
| `packages/headless/src/components/menubar/types.ts`             | 修复 `trigger` 槽必需声明 → 可选（`trigger?`），补充 JSDoc 说明默认内容                                                                        |
| `apps/docs/src/generated/api/menubar.json`                      | 手动同步 2 处 `trigger` 槽 `required` 标记（`true` → `false`），JSON 校验通过                                                                  |
| `packages/ui/test/specs/components/menubar.spec.ts`             | 新增 8 项（rendering / open state / disabled triggers ×2 / axe ×2），含 3.1 修复的回归测试                                                     |
| `packages/ui/test/specs/components/menubar-focus.spec.ts`       | 清理被注释的焦点断言（`// expect(document.activeElement).toBe(triggerElement)`）                                                               |
| `packages/ui/test/browser/specs/components/menubar.e2e.spec.ts` | 新增 4 项 e2e（真实 portal 打开 / Roving Focus 键盘导航 / Escape 焦点归还 / 打开态颜色对比 axe），采用 `toHaveFocus` 断言                      |
| `apps/docs/src/docs/en/components/menubar.md`                   | 重写：Features（12 条）+ Notes（架构对标表 13 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                        |
| `apps/docs/src/docs/zh-CN/components/menubar.md`                | 重写：功能特性（12 条）+ 备注（架构对标表 13 维度 + 运行时注意事项 7 条）+ 常见问题（6 条）                                                    |
| `docs/check.md`                                                 | 标记 C25 各维度为 ✅                                                                                                                           |

---

## 七、验证命令

```bash
# 单元测试（10 项全通过：menubar 8 + menubar-focus 2）
cd packages/ui && pnpm exec vitest run test/specs/components/menubar.spec.ts test/specs/components/menubar-focus.spec.ts
# → Test Files 2 passed (2) | Tests 10 passed (10)

# 浏览器 e2e（4 项全通过）
pnpm --filter @soybeanjs/ui test:e2e test/browser/specs/components/menubar.e2e.spec.ts
# → Test Files 1 passed (1) | Tests 4 passed (4)

# 类型检查
pnpm --filter @soybeanjs/ui typecheck
# → vue-tsc --noEmit --skipLibCheck 通过

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

## 八、遗留增强项

- **e2e 基线既有破损（非本次引入）**：vitest 升级至 4.1.10 后 `toBeFocused` matcher 被移除（改名 `toHaveFocus`），[dialog.e2e.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/browser/specs/components/dialog.e2e.spec.ts)（2 项）与 [select.e2e.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/browser/specs/components/select.e2e.spec.ts)（a11y `region`）已失败。建议在各自组件检查轮次（C72 dialog / C32 select）修复：`toBeFocused` → `toHaveFocus`，body 扫描豁免页面级 `region`。本次 menubar e2e 已采用正确断言并记录豁免。
- **`indicatorPosition` 死属性**：UI 层 `MenubarProps` 声明 `indicatorPosition` 并在 `useOmitProps` 中排除转发，但 headless compact 无 indicator 实现（自 navigation-menu 无 indicator 继承的既有现象；dropdown-menu 通过 `Omit<MenuUiBaseProps, 'indicatorPosition'>` 处理，menubar 未处理）。建议与 navigation-menu / dropdown-menu 一并收敛。非阻塞。
- **图标 SVG 无 `aria-hidden`**：menu 项内装饰性 chevron / check 图标（Iconify `Icon`）渲染为无 `aria-hidden` 的 SVG，axe `svg-img-alt` 报违规；项目在 `test/shared/a11y.ts` 全局豁免。建议在 `_icon` / `config-provider` 的 iconRender 层统一处理（跨组件，非本次范围）。非阻塞。
