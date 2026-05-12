---
applyTo: '{headless/src/components,src/components,playground/examples,test/specs/components,docs/src/docs}/**/*.{ts,vue,md}'
---

# SoybeanUI 组件开发总览

仅在任务围绕 SoybeanUI 组件能力本身时应用本文件。

如果当前任务只是普通页面、脚本、配置或基础设施编辑，即使路径命中，也回到通用 instructions。

## 这个文件负责什么

- 判断组件模式与任务场景
- 确定实现阶段顺序
- 指明何时进入 headless、UI、a11y、playground、docs、testing、checklist

不要在这里重复各层实现细则。

## 先判组件模式

### 多 slot 基础组件

- headless 暴露多个分片组件
- 使用 `UiSlot` 与 `UiClass`
- UI 通过 `provide{Name}Ui(ui)` 注入样式

### Compact 聚合组件

- 适合数据驱动、结构稳定、UI 不应再承担非样式逻辑的场景
- headless 负责 `{Name}Compact`、`items` 遍历、默认内容与结构编排
- UI wrapper 只保留 variants、样式注入、props/listeners 转发和 slots 透传

### 单类名组件

- 无 UiContext
- UI 直接 `cn(variants(...), props.class)`

## 再判任务场景

### 场景 A：新建组件

- 默认按完整交付面处理

### 场景 B：迁移并规范化

- 先保住有效行为、状态、a11y 与公开 API
- 再重组为 SoybeanUI 的 headless / UI 分层与导出结构

### 场景 C：现有组件规范对齐

- 先列差距，再分批修复
- 优先修架构边界、语义、导出和交付面缺口

## 通用边界

- 数据流只能是 `headless -> src`
- headless 负责逻辑、状态、a11y、结构聚合与默认语义
- UI 负责样式包装、variants、`ui` 注入与 wrapper 组合
- 不要在 headless 写样式，不要在 UI 写 ARIA、role、键盘交互和状态语义
- 新增逻辑前，优先复用 `headless/src/composables/`、`headless/src/shared/`、`headless/src/types/`
- 只有仓库现有能力不足时，才检查 `@vueuse/core`

## 执行顺序

### Phase 0：判模式、场景与范围

- 先确定组件模式、任务场景、是否为完整交付面
- 不要先写代码再倒推模式

### Phase 1：找参照实现

- 至少查看一个同模式 headless 参考和一个 UI 参考
- 场景 B 额外梳理必须保留的行为、状态、交互与插槽能力
- 场景 C 额外梳理当前差距清单

### Phase 2：实现 headless

- 默认顺序：`types.ts` -> `context.ts` -> 基础分片 SFC -> 可选 `{Name}Compact` -> `index.ts`
- 细节见 `soybean-ui-headless.instructions.md`

### Phase 3：实现 UI

- 默认顺序：`variants.ts` -> `types.ts` -> wrapper `.vue` -> `index.ts`
- 细节见 `soybean-ui-ui-layer.instructions.md`

### Phase 4：补齐出口与生成文件

- 更新 `headless/src/index.ts` 与 `src/index.ts`
- 运行 `pnpm sui headless` 与 `pnpm sui ui`
- 不要手动编辑生成文件

### Phase 5：补交付面

- playground：见 `soybean-ui-playground.instructions.md`
- docs：见 `soybean-ui-docs.instructions.md`
- tests：见 `soybean-ui-testing.instructions.md`
- 如果公开 API 变化，运行 `pnpm sui api`，并为非英文 locale 运行 `pnpm sui api-translate -- --locale <locale>`
- 如果本轮改动触达 changelog 映射、组件版本日志展示或 release 页面，运行 `pnpm sui changelog`，并为非英文 locale 运行 `pnpm sui changelog-translate -- --locale <locale>`

### Phase 6：验证与收尾

- 至少运行 `pnpm typecheck`、`pnpm lint` 与相关测试
- 无法运行时必须说明原因
- 收尾阶段才使用 `soybean-ui-checklist.instructions.md`

## 完整交付面

新建组件默认检查以下入口；现有组件改动时也要同步判断这些面是否受影响：

- `headless/src/components/{component}/`
- `src/components/{component}/`
- `headless/src/index.ts`
- `src/index.ts`
- `playground/examples/{component}/`
- `docs/src/docs/en/components/{component}.md`
- `docs/src/docs/zh-CN/components/{component}.md`
- `docs/src/constants/menus.ts`
- `test/specs/components/{component}.spec.ts`

## 何时读哪个细分文件

- headless 细节：`soybean-ui-headless.instructions.md`
- UI 细节：`soybean-ui-ui-layer.instructions.md`
- a11y 与 RTL：`soybean-ui-accessibility-rtl.instructions.md`
- playground：`soybean-ui-playground.instructions.md`
- docs：`soybean-ui-docs.instructions.md`
- testing：`soybean-ui-testing.instructions.md`
- 收尾清单：`soybean-ui-checklist.instructions.md`

## 结果说明

- 如果新增了新的 composable、shared helper 或类型，而不是复用仓库已有能力或 `@vueuse/core`，必须在结果总结中说明原因。
