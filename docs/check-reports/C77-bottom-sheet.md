# C77 `bottom-sheet` 检查优化报告

> **组件编号：** C77（`bottom-sheet`）
> **组件名称：** `SBottomSheet`（headless 基座：`BottomSheetRoot`(+Nested)/`BottomSheetOverlay`/`BottomSheetPopup`/`BottomSheetHandle`/`BottomSheetCompact` + dialog 家族原语，构建于 `useSnapPoints`/`useScaleBackground`）
> **模式：** 多槽 + Compact（复用 dialog 契约；`bottomSheetVariants` 扩展 `drawerVariants` + handle）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `bottom-sheet` 完成全维度审计。`BottomSheetCompact` 基于 dialog 家族原语组合 handle/overlay/popup/header/content/footer，状态流由 `useSnapPoints`（吸附点）/`useScaleBackground`（背景缩放）承载；`BottomSheetRoot`/`BottomSheetRootNested` 维护 `open`/`dismissible`/`nested`/`fixed` 等；拖拽关闭使用指针捕获 + `closeThreshold`；UI 层 `SBottomSheet` `bottomSheetVariants` 注入（6 尺寸 + handle）。

**发现 Major ×1**（已修复，D6）+ **Minor ×1**（已补测试覆盖，D7）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                     |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`BottomSheetCompact` 持有聚合编排与拖拽/吸附/缩放状态流，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；拖拽关闭（指针捕获 + 阈值）、`snapPoints`、`nested`/`fixed`/`handleOnly`、背景缩放完整（D1-16）                               |
| D2 行业对标 |  ✅  | 对标 vaul/radix-dialog（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（单一样式化抽屉/模态）：SoybeanUI 内联提供拖拽/吸附/缩放/嵌套模型 + `size` 体系 + 逐槽 `*Props`                                                                                             |
| D3 API 设计 |  ✅  | `open`/`v-model:open`/`modal`/`dismissible`/`nested`/`fixed`/`handleOnly`/`snapPoints`/`activeSnapPoint`/`closeThreshold`/`shouldScaleBackground`/`setBackgroundColorOnScale` 命名清晰；复用 dialog 的 `title`/`description`/`showClose`/`showCancel`/`showConfirm` 契约 |
| D4 类型系统 |  ✅  | `BottomSheetProps`/`Emits`/`Slots`/`Ui` 导出完整；`SnapPoint`（`fraction`/`height`）精确；`DrawerDirection = Side` 复用；JSDoc 覆盖 `snapPoints`/`dismissible`/`nested`/`fixed` 等                                                                                       |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`useOmitProps` 含 `class`；`BottomSheetCompact` 委托键与 `BottomSheetCompactProps` 严格一致；`bottomSheetVariants` `extend` `drawerVariants` 规范（仅新增 handle 槽）                                                                                 |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐            |
|   D7 其他   |  ✅  | 单测由 2 项扩至 7 项（**Minor 补**：标题/内容/触发器/handle/自定义 class + 既有焦点移入 + snap 释放 + 新增 `role="dialog"`），全通过；SSR 无顶层 `window`/`document` 访问                                                                                                |

---

## 二、行业对标矩阵

> `bottom-sheet` 是 **基于 dialog 原语的 headless 聚合 + 拖拽/吸附/缩放** 模式。vaul/radix-dialog 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 提供单一样式化抽屉/模态。

| 能力              | SoybeanUI | shadcn/ui + vaul | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :--------------: | :--------: | :----------: | :-----: | :------: |
| 复用 dialog 基座  |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Headless/样式分离 |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 拖拽关闭          |    ✅     |        ✅        |     —      |      —       |   ✅    |    —     |
| 吸附点            |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 背景缩放          |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 嵌套弹层          |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 尺寸（6）         |    ✅     |        —         |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [bottom-sheet.md（en）](../../apps/docs/src/docs/en/components/bottom-sheet.md) 与 [bottom-sheet.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/bottom-sheet.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：9 条能力（复用 dialog 基座/拖拽关闭/吸附点/背景缩放/嵌套/固定/对话框底部/尺寸/无障碍）。
- `Component family`：`SBottomSheet` + `BottomSheetRoot`(+Nested)/`Overlay`/`Popup`/`Handle` + dialog 原语 + `BottomSheetCompact`。
- `Notes`：架构对标表（7 能力 × 6 库）+ 5 条 Cautions（modal 默认/拖拽阈值/`snapPoints` 取值/`handleOnly`/嵌套上下文）+ `Roadmap`。
- `FAQ`：4 组问答（吸附点/禁用拖拽/仅手柄/分步确认）。

### 3.2 Minor — D7 单测覆盖不足（仅 state 2 项）

**现象：** [bottom-sheet.spec.ts](../../packages/ui/test/specs/components/bottom-sheet.spec.ts) 原仅 2 项（焦点移入弹层、snap 释放不抛错），缺失渲染（内容/触发器/handle/自定义 class）与无障碍（`role="dialog"`）覆盖，与其余组件（dialog/drawer/popover 等）的 5–7 项覆盖度不一致。

**修复：** 新增 `rendering`（内容/触发器/handle/自定义 class）与 `accessibility`（`role="dialog"`）两个 describe 块，共 5 项新测试；**7 项全部通过**。handle 属性经源码核对为 `data-soybean-handle`（非 `data-soybean-bottom-sheet-handle`），测试据此断言。

### 3.3 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`BottomSheetCompact` 持有 handle/overlay/popup/header/content/footer 默认装配与拖拽状态流，UI 层 `SBottomSheet` 无结构编排。
- **D1-16 键盘**：确认/取消/关闭为 `Button` 原生 `<button>`；Escape 经 dialog 可关闭层关闭；焦点移入弹层。
- **D7-04 SSR**：bottom-sheet 无顶层 `window`/`document` 访问（拖拽/缩放逻辑仅运行时触发）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/bottom-sheet.spec.ts`：**7 项全部通过**（内容/触发器/handle/自定义 class/焦点移入/snap 释放/`role="dialog"`）。
- 文档/测试改动未改源码类型，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档与测试，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项                     | 对标依据    | 说明                                                                                      |
| :------------------------- | :---------- | :---------------------------------------------------------------------------------------- |
| 浏览器 e2e spec            | D7-19/D7-20 | 当前 bottom-sheet 重点项未含 e2e；如需真实拖拽/portal/焦点覆盖可仿 dialog/drawer 补 e2e   |
| 拖拽手势 e2e（真实浏览器） | D1-16/D7-20 | 指针捕获 + `closeThreshold` 拖拽关闭建议在真实浏览器验证（happy-dom 依赖 mock），排期评估 |
