# C25 `menubar` 检查优化报告

> **组件编号：** C25（`menubar`）
> **组件名称：** `SMenubar`（headless 基座：`MenubarRoot`/`MenubarMenu`/`MenubarTrigger`/`MenubarContent`/`MenubarSubTrigger`/`MenubarSubContent` + `MenubarCompact` 聚合）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-03、D7-05

---

## 一、执行摘要

对 `menubar` 完成全维度审计。组件为「多槽 + Compact」模式：headless `MenubarCompact` 组合 `MenubarRoot`/`Menu`/`Trigger`/`Content`，并复用 menu 层的 `MenuOptionsCompact` 处理迭代、默认内容与内部组合；`MenubarRoot` 基于 `RovingFocusGroup` 提供横向 roving focus（loop 可配），复用 menu 层浮层定位（floating-ui）、dismissable/presence 与完整 `menuitem`/`menuitemcheckbox`/`menuitemradio` 语义。UI 层 `SMenubar` 仅做 `scv()` 配方与插槽/类注入。

**发现：无阻断性缺陷**（全部维度通过；遗留可选增强见第五节）：

|    维度     | 状态 |                                                                                                                                                    说明                                                                                                                                                    |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |      多槽 + Compact 正确：Compact 聚合下沉至 headless；横向 roving focus（`RovingFocusGroup` + loop）、Enter/Space 展开/ArrowDown 打开、ArrowRight/Left 跨菜单切换（含 RTL 镜像）、Esc 关闭归还焦点、focus 管理（`onCloseAutoFocus`/`onFocusOutside`）、禁用项、子菜单定位、链接型顶层项完整（D1-16）      |
| D2 行业对标 |  ✅  | 对标 Radix Menubar、Ant Design Menu、Element Plus Menu：SoybeanUI 几乎 1:1 复刻 Radix 行为（roving focus + loop、方向键切换、链接项、受控/非受控、RTL、Esc 归还焦点），并额外提供数据驱动 compact API 与完整 checkbox/radio 类型；相对 Radix 唯一缺口为顶层 typeahead（下拉菜单内已有 typeahead）（D2-03） |
| D3 API 设计 |  ✅  |                                   `modelValue`/`defaultValue`、`dir`/`loop`、`items`、区域 props（`triggerProps`/`contentProps`/`itemProps` 等）命名与 Radix 一致；事件 `update:modelValue`/`select` 元组化；`MenubarTriggerProps extends ButtonProps` 复用 Button 语义                                    |
| D4 类型系统 |  ✅  |                                                             `MenubarRootProps`/`TriggerProps`/`CompactProps`/`Slots` 层级清晰；`MenubarUiSlot = 'root' \| 'trigger' \| MenuUiSlot` 复用 menu UI 槽；JSDoc 覆盖完整；`UiClass<T>` 而非 `Record`                                                             |
| D5 代码规范 |  ✅  |                                  `eslint` 0 errors；`useOmitProps` 含 `class`（root 与 UI wrapper 均含）；`isTriggerLink` 纯函数独立（`shared.ts`）；headless 用 `shallowRef`（`currentTabStopId`/`triggerElement`/`isFocused` 等）+ `computed`；无 `props.xxx`/内联箭头                                   |
|   D6 文档   |  ✅  |                                                           en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表 + 运行时注意 + FAQ 6 组；`Features` 覆盖横向导航/键盘/子菜单/链接项/受控/禁用/定位/headless                                                            |
|   D7 其他   |  ✅  |  data 属性遵循 D1-07（`data-soybean-menubar-*`）；SSR 安全（setup 无顶层 `window`/`document`，id 用 `useId`）；ARIA 完整（`role="menubar"`/`menuitem`/`aria-haspopup="menu"`/`aria-expanded`/`aria-controls`/`aria-labelledby`/`aria-disabled`/`aria-checked`）；**14 项单测通过（4 文件）**；axe 无违规   |

---

## 二、行业对标矩阵

> `menubar` 是**应用菜单栏**模式（横向触发器 + 下拉子菜单）。Radix Menubar 为最接近的行业实现；Ant Design/Element Plus Menu 提供数据驱动 API。

| 能力                | SoybeanUI | Radix Menubar | Ant Design Menu | Element Plus Menu |
| :------------------ | :-------: | :-----------: | :-------------: | :---------------: |
| Headless/样式分离   |    ✅     |      ✅       |       ❌        |        ❌         |
| 数据驱动 compact    |    ✅     |      ❌       |       ✅        |        ✅         |
| roving focus + loop |    ✅     |      ✅       |       ✅        |        ✅         |
| 方向键切换菜单      |    ✅     |      ✅       |       ✅        |        ✅         |
| Esc 归还焦点        |    ✅     |      ✅       |       ✅        |       部分        |
| 链接型顶层项        |    ✅     |      ✅       |       ❌        |        ❌         |
| 子菜单定位          |    ✅     |      ✅       |       ✅        |        ✅         |
| checkbox/radio 类型 |    ✅     |      ✅       |       ✅        |        ✅         |
| 顶层 typeahead      |     —     |      ✅       |      部分       |       部分        |
| RTL 方向键镜像      |    ✅     |      ✅       |      部分       |       部分        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `menubar` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **D1-16 键盘/焦点**：`RovingFocusGroup` 提供横向 roving focus；Enter/Space/ArrowDown 打开；ArrowRight/Left 跨菜单切换（RTL 镜像）；Esc 经 `useDismissableLayer` 关闭并归还焦点；链接型顶层项悬停/方向键切换时聚焦链接。
- **D2-03 对标覆盖**：相对 Radix 唯一缺口为顶层 typeahead（下拉菜单内 `useTypeahead` 已覆盖），属可选增强。
- **D5 纯逻辑/规范**：`isTriggerLink` 纯函数；`shallowRef` 状态管理；`useOmitProps` 含 `class`。
- **D7 ARIA/SSR**：完整 `menubar`/`menuitem`/checkbox/radio 语义；无顶层 `window`/`document` 访问；axe 无违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/menubar*.spec.ts`：**14 项全部通过（4 文件：menubar 8 / focus 2 / link 3 / submenu 1）**。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项         | 对标依据    | 说明                                                                                           |
| :------------- | :---------- | :--------------------------------------------------------------------------------------------- |
| 顶层 typeahead | D2-03       | Radix Menubar 支持顶层字母输入跳转；当前仅下拉菜单内 `useTypeahead` 覆盖，顶层为可选增强       |
| 测试覆盖补充   | D7-19/D7-20 | Esc 关闭归还焦点/RTL 方向键镜像/loop 循环/ArrowDown 打开后焦点进入菜单建议补充测试或浏览器 e2e |
| 浏览器 e2e     | D7-19/D7-20 | 真实焦点管理/子菜单定位/键盘导航建议浏览器覆盖，排期评估                                       |
