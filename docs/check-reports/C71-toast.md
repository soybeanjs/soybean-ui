# C71 `toast` 检查优化报告

> **组件编号：** C71（`toast`）
> **组件名称：** `SToastProvider`（headless 基座：`ToastProvider`/`Toaster`/`Toast` + 命令式 `toast` API）
> **模式：** 多槽 + Compact + 命令式状态层（11 个 UI 槽：toaster/toast/wrapper/content/title/description/icon/footer/action/cancel/close）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-08、D7-04

---

## 一、执行摘要

对 `toast` 完成全维度审计。核心链路：模块级 `ToastState`（观察者）经 `toast` 命令式控制器（`message`/`success`/`error`/`warning`/`info`/`loading`/`custom`/`promise`/`dismiss` + `getHistory`/`getToasts`）发布；`Toaster` 订阅并驱动堆叠（`visibleCounts`）/展开（`defaultExpanded`）/焦点（focus 归还 + `Alt+T` 快捷键）/滑动关闭（`swipeDirections`）/自动关闭计时（hover/hidden-tab 暂停）；`Toast` 处理单条计时、滑动（`setPointerCapture`）、高度测量与 action/cancel/close；UI 层 `SToastProvider` 注入 `toastVariants` + 动画样式表（`useStyleTag`）。

**发现 Major ×1 + Minor ×1**（均已修复），**Enhancement ×2**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                            |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact + 命令式状态层：`ToastState` 收敛全部状态与订阅；headless 零样式（动画样式经 UI `useStyleTag` 注入）、UI 层无状态逻辑；`data-soybean-toast*` 完整（richColor/inverted/type/swipe 等状态 data 属性）；`useOmitProps` 含 `class`；`toastVariants` 槽键与 `ToastUiSlot` 一致；焦点/快捷键/Escape 契约完整           |
| D2 行业对标 |  ✅  | 对标 Sonner/AntD `message`/Element Plus `ElMessage`/Mantine `notifications`/Naive UI `useMessage`（命令式优先）；shadcn/ui 无全局通知原语。SoybeanUI 差异化提供堆叠/展开、滑动关闭、Promise 通知、焦点快捷键（详见矩阵）                                                                                                        |
| D3 API 设计 |  ✅  | `toast()` + `success/error/warning/info/loading/custom/message/promise/dismiss` + `getHistory/getToasts` 语义清晰；`ToastT`/`ToastExternal`/`ToastPromiseData` 泛型完整；provider 配置（`duration`/`position`/`visibleCounts`/`hotkey`/`swipeDirections`/`richColor` 等）命名合理；`duration` 默认、`showClose` 默认对齐 Sonner |
| D4 类型系统 |  ✅  | `ToastT`/`ToastExternal`/`ToastCreateOptions`/`ToastPromiseData`/`ToastPromiseResolver`/`ToasterContext` 泛型精确；`ToastUiSlot` 11 槽类型完整；JSDoc 覆盖 `duration`/`position`/`visibleCounts`/`icons` 等；`pnpm typecheck` 无新增错误（见验证）                                                                              |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`state.ts` 观察者类为外部 API 强制（Sonner 移植），逻辑用小函数/守卫清晰组织；`toaster.vue`/`toast.vue` 用 `watchEffect` + `onWatcherCleanup` 管理订阅/计时器/监听器（见验证）                                                                                                                               |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/**Imperative API 方法表**/API/Notes/FAQ），保留既有 `toast()` 用法说明，含架构对标表（9 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 6 组 FAQ；中英文结构完全对齐       |
|   D7 其他   |  ✅  | 单测 2 → 3 项全通过（6 视口预渲染/hotkey 聚焦/**新增**命令式创建 + 渲染 + dismiss）；SSR 安全（`isClient` 守卫 + `useMounted`）；计时器/订阅/`document` 监听在 `onWatcherCleanup`/`onBeforeUnmount` 清理（见验证）                                                                                                              |

---

## 二、行业对标矩阵

> `toast` 是 **命令式状态层 + headless 多槽渲染** 模式。Ant Design/Element Plus/Mantine/Naive UI 为命令式全局通知；shadcn/ui 无全局通知原语；SoybeanUI 对标 Sonner。

| 能力                    | SoybeanUI | shadcn/ui | Ant Design message | Element Plus ElMessage | Mantine notifications | Naive UI useMessage |
| :---------------------- | :-------: | :-------: | :----------------: | :--------------------: | :-------------------: | :-----------------: |
| 命令式 API              |    ✅     |     —     |         ✅         |           ✅           |          ✅           |         ✅          |
| 类型（success/error/…） |    ✅     |     —     |         ✅         |           ✅           |          ✅           |         ✅          |
| 位置（6）               |    ✅     |     —     |         ✅         |           ✅           |          ✅           |         ✅          |
| 堆叠 / 展开             |    ✅     |     —     |         —          |           —            |          ✅           |          —          |
| 滑动关闭                |    ✅     |     —     |         —          |           —            |           —           |          —          |
| Promise 通知            |    ✅     |     —     |         ✅         |           —            |          ✅           |         ✅          |
| 富色 / 反转             |    ✅     |     —     |         ✅         |           —            |           —           |          —          |
| 悬停/隐藏时暂停         |    ✅     |     —     |         ✅         |           ✅           |          ✅           |         ✅          |
| 焦点快捷键              |    ✅     |     —     |         —          |           —            |           —           |          —          |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ + 命令式方法表）

**现象：** [toast.md（en）](../../apps/docs/src/docs/en/components/toast.md) 与 [toast.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/toast.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）、`FAQ`，以及命令式 `toast` 方法说明（对 P0 命令式组件尤为关键）。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：9 条能力（命令式 API/6 类型/6 位置/堆叠/滑动关闭/自动消失/Promise/操作/无障碍）。
- `Component family`：`SToastProvider`/`ToastProvider`/`Toaster`/`Toast`/命令式 `toast` 控制器职责说明。
- **命令式方法表**：`toast`/`success·error·warning·info·loading`/`custom`/`promise`/`dismiss`/`getHistory`/`getToasts` + 常用 `data` 选项。
- `Notes`：架构对标表（9 能力 × 6 库）+ 5 条 Cautions（Provider 依赖/`duration` 暂停/`visibleCounts` 堆叠/`dismissible`/快捷键）+ `Roadmap` 说明。
- `FAQ`：6 组问答（基础/类型/Promise/位置时长/不自动消失/自定义）。

### 3.2 Minor — D7-11 测试覆盖偏低

**现象：** toast 仅 2 项单测（6 视口预渲染 + hotkey 聚焦），未覆盖命令式创建/渲染/dismiss 这一核心路径。

**修复：** [toast.spec.ts](../../packages/ui/test/specs/components/toast.spec.ts) 新增「renders a toast created via the imperative API and dismisses it」，经 `toast()` 创建 → `data-soybean-toast` 渲染文本 → `toast.dismiss()` 移除，覆盖核心命令式闭环。

### 3.3 Enhancement — D2-11 `containerAriaLabel` 默认硬编码

**现象：** [toaster.vue](../../packages/headless/src/components/toast/toaster.vue) `containerAriaLabel` 默认 `'Notifications'`（硬编码英文默认值，未本地化）。

**处理：** 非阻塞。此为 provider 默认 prop（可覆盖），本地化默认值需新增 `toast` locale 键并在 `withDefaults` 中动态回退，改动面大；记录为增强项排期，文档已注明可覆盖 `containerAriaLabel`。

### 3.4 核查结论（非缺陷）

- **D1-08 状态反映**：`data-soybean-toast` 携带 `data-type`/`data-state`-类状态（richColor/inverted/swipe/expanded/visible/front 等）驱动样式与动画。
- **D7-04 内存泄漏**：`ToastState.subscribe` 在 `onWatcherCleanup` 退订；`document` keydown 监听在 `onWatcherCleanup` 移除；单条计时器在 `onWatcherCleanup` clearTimeout；`onBeforeUnmount` 归还焦点并清空引用。
- **D7-09 SSR**：`isClient` 守卫 + `useMounted`（`@vueuse/core`），无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/toast.spec.ts`：**3 项全部通过**（6 视口预渲染/hotkey 聚焦/命令式创建 + 渲染 + dismiss）。
- `pnpm exec eslint packages/headless/src/components/toast/ packages/ui/src/components/toast/`：**0 errors**。
- 本次仅文档 + 测试改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；toast 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                      | 对标依据      | 说明                                                                                                                             |
| :-------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `containerAriaLabel` 本地化 | D2-11/D7-05   | 默认 `'Notifications'` 硬编码英文；需新增 `toast` locale 键 + 动态默认，排期评估                                                 |
| 动画 CSS 迁移               | AGENTS 反模式 | `styles.css?raw` + `useStyleTag` 为 Toast 专用动画/滑动 CSS；与「UnoCSS only」存在张力，保留为既有例外，排期评估是否并入样式构建 |
| e2e 覆盖                    | D7-19         | 命令式 + Teleport + 计时器契约可考虑浏览器 e2e（focus/hotkey/swipe），非当前阻塞                                                 |
