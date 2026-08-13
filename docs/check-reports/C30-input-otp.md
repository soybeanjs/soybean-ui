# C30 `input-otp` 检查优化报告

> **组件编号：** C30（`input-otp`）
> **组件名称：** `SInputOtp`（headless 基座：`InputOtpCompact` 聚合 `InputOtpRoot`/`Positioner`/`Input`）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `input-otp` 完成全维度审计。组件为「多槽 + Compact」模式：headless `InputOtpCompact` 负责格子迭代、默认内容（group/slot/char/placeholder/caret）；`InputOtpRoot` 持有受控状态、透明原生 input 叠加、选区镜像（`selectionchange`）、`beforeinput`/`paste` 校验、`complete` 触发与密码管理器 badge 检测。UI 层仅做配方（size/align）与插槽转发。

**发现：无阻断性缺陷**（架构/功能/类型/规范达标；主要短板在测试纵深与演示面，见第五节）：

|    维度     | 状态 |                                                                                                                                          说明                                                                                                                                          |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  | 多槽 + Compact 正确：headless 持有受控状态/选区镜像/校验/complete；`maxlength` 必填、inputMode、粘贴/退格回退、mask（透明 input 叠加 + 插槽展示，设计选择）、disabled/readonly、光标/焦点管理（`setSelectionRange`/fake caret）、pattern 校验、密码管理器 badge、自动填充完整（D1-16） |
| D2 行业对标 |  ✅  |                                    与 vue-input-otp/reka-ui/shadcn-vue `InputOTP` 逐项对齐（maxLength/pattern/inputMode/pasteTransformer/透明 input 叠加/选区镜像/iOS 自动填充）；另增强 `size` 6 档/`align` 三态/`ui` 多槽/headless 分离（D2-11）                                     |
| D3 API 设计 |  ✅  |                `modelValue`/`defaultValue`、`maxlength`、`inputmode`、`pattern`、`disabled`/`readonly`、`autocomplete`（默认 `one-time-code`）、`pasteTransformer`、`pushPasswordManagerStrategy` 命名与主流一致；事件 `update:modelValue`/`complete`/`input` 载荷清晰                 |
| D4 类型系统 |  ✅  |                                     `InputOtpRootProps`/`CompactProps`/`Slots` 层级清晰；`InputOtpSlotProps`（char/placeholderChar/isActive/hasFakeCaret）类型化；`inputmode`/`pushPasswordManagerStrategy` 字面量联合；JSDoc 覆盖完整；无类型逃逸                                     |
| D5 代码规范 |  ✅  |        `eslint` 0 errors；`useOmitProps` 含 `class`；校验/选区/槽生成纯函数（`shared.ts`：`createInputOtpSlots`/`resolveInputOtpSelection`/`getClampedOtpValue`/`isInputOtpValueValid`）；`usePasswordManagerBadge` 独立 composable；`shallowRef` DOM 句柄；复用 `@vueuse/core`        |
|   D6 文档   |  ✅  |                                              en/zh 文档结构对齐（8 节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ 4 组；`maxlength` 必填/aria-label 回退等均有说明；playground 4 示例（basic/placeholder/custom-slot/disabled）                                               |
|   D7 其他   |  ✅  |        data 属性遵循 D1-07（`data-soybean-input-otp-*`）；SSR 安全（`defaultWindow`/`defaultDocument` 守卫 + `typeof window` 检查）；ARIA（`aria-label`/`aria-placeholder`/视觉 group `aria-hidden`）axe 3 场景零违规；**24 项单测通过**（渲染/属性/model value/disabled/a11y）        |

---

## 二、行业对标矩阵

> `input-otp` 是**一次性密码输入**模式。vue-input-otp/reka-ui/shadcn-vue `InputOTP` 为同源实现；AntD/Element Plus 无独立 OTP 组件。

| 能力               | SoybeanUI | reka-ui/shadcn | vue-input-otp | AntD/Element Plus |
| :----------------- | :-------: | :------------: | :-----------: | :---------------: |
| 透明 input 叠加    |    ✅     |       ✅       |      ✅       |         —         |
| 选区镜像           |    ✅     |       ✅       |      ✅       |         —         |
| `complete` 事件    |    ✅     |       ✅       |      ✅       |         —         |
| `pasteTransformer` |    ✅     |       ✅       |      ✅       |         —         |
| 密码管理器 badge   |    ✅     |       ✅       |      ✅       |         —         |
| 尺寸变体（xs…2xl） |    ✅     |       —        |       —       |         —         |
| `align` 三态       |    ✅     |       —        |       —       |         —         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `input-otp` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **D1-16 选区/焦点**：透明 input 承载真实值，`selectionchange` 监听 + `setSelectionRange` 镜像选区；`beforeinput`/`input` 双层防护 pattern 校验。
- **D5 纯函数**：`shared.ts` 覆盖槽生成、选区解析、值钳制、模式校验与超时同步，逻辑清晰可测。
- **D7 ARIA/SSR**：默认 `aria-label` 回退、视觉 group `aria-hidden`（值由真实 input 承载）；axe 3 场景零违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/input-otp.spec.ts`：**24 项全部通过**。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项                  | 对标依据 | 说明                                                                                                                           |
| :---------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| 浏览器 e2e spec         | D7-19    | 强依赖 `selectionchange`/`setSelectionRange`/`beforeinput`/`clipboardData` 平台 API，建议新增 e2e 覆盖真实键盘/粘贴/退格/badge |
| 单测覆盖补充            | D7-11    | 选区镜像、focus/blur `setSelectionRange`、hover、badge 检测、`autofocus`、expose 方法未覆盖，建议补充                          |
| playground 演示补充     | D6-05    | 补 `size`/`align`/`pattern`/`pasteTransformer`/`complete`/受控非受控示例，对齐文档宣传能力                                     |
| 内部 `data-input-otp-*` | D1-07    | 收敛非 `data-soybean-*` 命名属性（镜像状态泄漏）到规范命名空间，排期评估                                                       |
| 默认 aria-label 本地化  | D7-05    | 默认 `aria-label`「One-time password」走 locale 注册表，排期评估                                                               |
