# C70 `alert` 检查优化报告

> **组件编号：** C70（`alert`）
> **组件名称：** `SAlert`（headless 基座：`AlertRoot`/`AlertContent`/`AlertTitle`/`AlertDescription`/`AlertClose`/`AlertCompact`）
> **模式：** 多槽 + Compact（root/content/icon/title/description/close 6 个 UI 槽）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-15、D2-11、D7-05

---

## 一、执行摘要

对 `alert` 完成全维度审计。核心链路：`AlertRoot` 经 `useControllableState` 维护 `open`（默认 `true`）并下发上下文；`AlertClose` 渲染 `Button` 基座、`@click` 发出 `close` 并 `onOpenChange(false)`，`aria-label` 本地化；`AlertCompact` 组合 leading/icon/title/description/close 默认装配；UI 层 `SAlert` `alertVariants` 注入（8 色 × 5 变体 × 6 尺寸）。

**发现 Major ×1 + Minor ×1**（均已修复），**Enhancement ×1**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                    |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`AlertCompact` 持有聚合编排，UI 层无 `v-for`/无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-alert-*` 完整；`useOmitProps` 含 `class`；`alertVariants` 槽键与 `AlertUi` 一致；关闭按钮复用 `Button` 原生 `<button>`（D1-16） |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Naive UI（`type`/`closable`/`showIcon`）：SoybeanUI 暴露逐槽 `*Props` + `size` 尺寸体系，关闭按钮 `aria-label` 本地化优于纯 `×`；全宽 `Banner` 列为增强项（见 3.2）                                                 |
| D3 API 设计 |  ✅  | `title`/`description`/`icon`/`closable`/`open`/`variant`/`color` 命名与主流库一致；`v-model:open` 受控/非受控统一；`close` 事件 + `AlertCloseProps`/`AlertCloseEmits` 语义清晰；`leading`/`trailing`/`close` 插槽完整                                                   |
| D4 类型系统 |  ✅  | `AlertProps`/`AlertEmits`/`AlertSlots`/`AlertExtendedUi` 导出完整；`AlertCloseProps extends ButtonProps` 精确；JSDoc 覆盖 `title`/`description`/`closable`/`icon`；`pnpm typecheck` 无新增错误（见验证）                                                                |
| D5 代码规范 |  ✅  | `eslint` 0 errors；**Minor 修复**（D5-07/D4-08）：`alert-close.vue` 原 `(attrs['aria-label'] as string) ?? 'Close alert'` 含显式类型断言 + 硬编码英文 → 改为 `typeof label === 'string' && label.trim()` 守卫 + 本地化回退（消除断言）                                  |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（8 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐      |
|   D7 其他   |  ✅  | 单测 5 项全通过（标题/描述/自定义 class/`open=false` 隐藏/关闭按钮 `aria-label='Close alert'` + `update:open`/无障碍 axe 0 违规）；SSR 无 `window`/`document` 访问；无定时器/监听器泄漏（见验证）                                                                       |

---

## 二、行业对标矩阵

> `alert` 是 **headless 聚合 + 展示型调用框** 模式。shadcn/ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化提示（`type`/`closable`/`showIcon`）。

| 能力                     | SoybeanUI | shadcn/ui | Ant Design Alert | Element Plus Alert | Mantine Alert | Naive UI Alert |
| :----------------------- | :-------: | :-------: | :--------------: | :----------------: | :-----------: | :------------: |
| Headless/样式分离        |    ✅     |    ✅     |        —         |         —          |       —       |       —        |
| 标题 + 描述              |    ✅     |    ✅     |        ✅        |         ✅         |      ✅       |       ✅       |
| 可关闭                   |    ✅     |     —     |        ✅        |         ✅         |      ✅       |       ✅       |
| 前导图标                 |    ✅     |     —     |        ✅        |         ✅         |      ✅       |       ✅       |
| 变体（solid/soft/ghost） |    ✅     |    ✅     |        —         |         —          |       —       |       —        |
| 颜色（8）                |    ✅     |    ✅     |        ✅        |         ✅         |      ✅       |       ✅       |
| 尺寸（6）                |    ✅     |     —     |        —         |         —          |       —       |       —        |
| 本地化关闭标签           |    ✅     |     —     |        —         |         ✅         |       —       |       —        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [alert.md（en）](../../apps/docs/src/docs/en/components/alert.md) 与 [alert.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/alert.md) 仅有 Overview/Usage/Demos/API 四节（含一条 Compact 委托说明），缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，alert 为遗漏项。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：8 条能力（headless 分离/标题·描述/可关闭/8 色/5 变体/6 尺寸/前导图标/无障碍）。
- `Component family`：`SAlert` 及 6 个 headless 部件职责说明。
- `Notes`：架构对标表（8 能力 × 6 库）+ 5 条 Cautions（本地化关闭标签/`open` 默认/`solid`·`soft` 语义/装饰图标/静态提示框）+ `Roadmap`（Banner）说明。
- `FAQ`：5 组问答（标题描述/可关闭/颜色变体/图标/自定义关闭）。

### 3.2 Minor — D7-05/D5-07 关闭按钮 aria-label 硬编码 + 类型断言

**现象：** [alert-close.vue](../../packages/headless/src/components/alert/alert-close.vue) 的 `ariaLabel` 为 `(attrs['aria-label'] as string) ?? 'Close alert'`——含 `as string` 显式断言且硬编码英文 `'Close alert'`，未使用本地化（对标 C66 carousel/tag 已本地化关闭/aria-label 回退）。

**修复：** 新增 `LocaleAlertMessages.close`（13 语言包同步补齐：en `Close alert`/zh-CN `关闭提示`/…），`alert-close.vue` 经 `useLocaleMessages` 回退 `messages.value.alert.close`，并以 `typeof label === 'string' && label.trim()` 守卫消除 `as string` 断言：

```ts
const ariaLabel = computed(() => {
  const label = attrs['aria-label'];
  return typeof label === 'string' && label.trim() ? label : messages.value.alert.close;
});
```

既有单测 `expect(closeButton.attributes('aria-label')).toBe('Close alert')` 继续通过（en 默认）。

### 3.3 Enhancement — D1-15 前导图标 `aria-hidden`

**现象：** `AlertCompact` 默认 `leading` 图标经 headless `_icon` 渲染，未设置 `aria-hidden`（装饰性）。

**处理：** 非阻塞，与 accordion/empty 相同的跨组件（headless `_icon`）交叉关注点；消息内容由标题/描述承载，单测环境无 `iconRender` 故 a11y 通过。建议随 headless `_icon` 统一增强排期。

### 3.4 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`AlertCompact` 持有 leading/icon/title/description/close 默认装配，UI 层 `SAlert` 无 `v-for`、无结构编排。
- **D1-16 键盘**：关闭控件为 `Button` 原生 `<button>`，空格/回车可触发。
- **D7-09 SSR**：alert 无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/alert.spec.ts`：**5 项全部通过**（标题/描述/自定义 class/`open=false` 隐藏/关闭按钮 `aria-label='Close alert'` + `update:open`/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/alert/`：**0 errors**（locale 文件由工程 eslint 配置忽略，属正常）。
- `pnpm sui api`：重新生成（新增 `alert` locale 覆盖键，9462 键），合法再生成。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；alert 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                         | 对标依据                    | 说明                                                                    |
| :----------------------------- | :-------------------------- | :---------------------------------------------------------------------- |
| `Banner` 全宽变体              | AntD `banner`、Element Plus | 全宽无边框横幅；关联 roadmap P2 `Banner`，排期评估                      |
| headless `_icon` `aria-hidden` | D1-15                       | 装饰性前导图标统一 `aria-hidden`，跨组件交叉项，建议随 `_icon` 增强排期 |
