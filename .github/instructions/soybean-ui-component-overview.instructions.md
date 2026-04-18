---
applyTo: '**/*.{ts,tsx,js,jsx,vue,md}'
---

# SoybeanUI 组件开发总览

仅在任务属于 SoybeanUI 组件开发、扩展、修复、补文档、补测试或补 playground 时应用本文件。

如果当前任务不是围绕组件能力本身，而只是普通页面、脚本、配置或基础设施代码编辑，即使文件路径命中广泛模式，也忽略本文件，回到通用 instructions。

## Source Of Truth

- 组件开发规范只维护在 `.github/copilot-instructions.md` 和 `.github/instructions/*.instructions.md`

## 目标

这个文件只负责判断组件任务场景、确定执行顺序，并把细节分发到对应的 instructions；不要在这里重复 headless、UI、docs、testing 文件已经明确的低层细则。

## 三种组件开发场景

### 场景 A：从 0 到 1 新建组件

- 目标是新增一个完整可交付组件
- 默认需要覆盖 headless、UI、导出、playground、docs、tests

### 场景 B：迁入其它仓库现有代码后规范化

- 目标是复用现有能力，但必须重组为符合 SoybeanUI 分层与导出规范的实现
- 先保住行为、状态模型、a11y 语义和公开 API 的有效部分
- 再把结构重组为 SoybeanUI 要求的目录、类型、context、variants、wrapper、出口面

### 场景 C：对现有组件做规范对齐

- 目标是检查和补齐已开发组件与最新规范之间的差距
- 先列差距，再分批修复，不要一上来就做大范围重写

## 场景优先级原则

- 不管属于哪一类场景，都先判模式，再看参照，再进入实现或重构
- 场景 B 与场景 C 都不能跳过行为校对；先确认现有行为，再做结构调整
- 场景 C 默认优先修复架构边界、a11y、RTL、导出面、tests、docs 的缺口，最后再处理风格一致性

## 复用优先级

开始写新逻辑、新工具函数、新类型之前，按这个顺序检查：

1. 先看 `headless/src/composables/` 是否已有可复用 composable
2. 再看 `headless/src/shared/` 是否已有可复用 helper、常量或纯函数
3. 再看 `headless/src/types/` 是否已有可复用类型
4. 如果仓库内没有合适的 composable，再检查 `@vueuse/core` 是否已有可直接使用的能力
5. 只有以上都不满足时，才手动新增 composable、shared helper 或类型

不要在还没检查仓库现有能力和 `@vueuse/core` 之前，就从 0 到 1 自建通用函数。

## 架构边界

| 层       | 包                                      | 职责                                 |
| -------- | --------------------------------------- | ------------------------------------ |
| Headless | `@soybeanjs/headless` / `headless/src/` | 逻辑、状态、a11y、聚合结构、默认语义 |
| UI       | `@soybeanjs/ui` / `src/`                | 样式包装、UnoCSS、`tv()`、`ui` 注入  |

硬性边界：

- 数据流只能是 `headless -> src`
- headless 不负责样式
- UI 不负责 ARIA、role、键盘交互和状态语义

## 三种组件模式

### 多 slot 基础组件

- headless 暴露多个分片组件
- 使用 `UiSlot` + `UiClass`
- UI 层通过 `provide{Name}Ui(ui)` 注入样式

### Compact 聚合组件

- 适合“数据驱动 + 结构稳定 + UI 层不应再承担任何非样式逻辑”的场景
- headless 负责 `{Name}Compact`、默认标题/描述/图标、`items` 遍历与结构组合，以及所有仍会影响结构、状态、默认内容或事件编排的非样式逻辑
- UI wrapper 只保留 variants、`mergeSlotVariants`、props/listeners 转发和 slots 透传

如果 UI 层还需要为了 Compact 额外写条件分支、数据编排、默认内容决策、slot 选择、事件包装或其它非样式逻辑，就说明这部分实现还应继续下沉到 headless，而不是停在 UI wrapper。

### 单类名组件

- 无 UiContext
- UI 层直接 `cn(variants(...), props.class)`

## Phase 0：先判模式与范围

- 先判断当前属于多 slot 基础组件、Compact 聚合组件、单类名组件中的哪一种
- 再判断当前属于场景 A、B、C 中的哪一种
- 再判断是新建组件、迁移重组、现有组件规范补齐、现有组件扩展，还是 bug 修复
- 除非用户明确限制范围，否则一律按完整集成处理

判定后再开始编码，不要先写代码再倒推模式。

进入 Phase 1 前，必须已经明确：组件模式、开发场景、任务类型、是否需要完整交付面。

## Phase 1：先找参照实现

- 开始实现前，至少查看一个同模式的 headless 组件和一个 UI 组件
- 优先复用仓库里已验证的 API 形状、目录结构、slots 命名、导出方式
- 同时检查 `headless/src/composables/`、`headless/src/shared/`、`headless/src/types/` 里是否已有可直接复用的函数、常量和类型
- 不要凭空生成“通用 Vue 组件模板”
- 如果是场景 B，额外整理外部代码中必须保留的行为、状态、交互与插槽能力
- 如果是场景 C，额外整理当前组件与 instructions 的差距清单

如果需要新的 composable，先检查 `@vueuse/core`，不要直接新建。

进入 Phase 2 前，必须已经找到可直接对照的 headless 与 UI 参考实现；场景 B 与 C 还必须完成行为和差距梳理。

## Phase 2：先做 headless

先完成 headless，再做 UI。默认顺序：

1. `types.ts`
2. `context.ts`
3. 基础分片组件 SFC
4. 如果满足聚合条件，再新增 `{Name}Compact`
5. `index.ts`

这一阶段的细节见 `soybean-ui-headless.instructions.md`。

场景 B 额外要求：

- 不要把外部仓库的单层实现直接塞进 UI 层
- 先把状态、交互、a11y、结构聚合拆进 headless，再决定 UI wrapper 如何保留样式能力

场景 C 额外要求：

- 优先修复 headless 分层错误、context 非响应式、`data-slot` 缺失、聚合边界错误等结构问题

这一阶段若确实需要新增通用函数或 composable，必须先确认：仓库现有 `composables/shared/types` 不满足，且 `@vueuse/core` 也没有合适实现。

进入 Phase 3 前，headless 的类型、context、基础分片和必要聚合入口必须已经稳定。

## Phase 3：再做 UI

headless 稳定后，再完成 UI 层。默认顺序：

1. `variants.ts`
2. `types.ts`
3. wrapper `.vue`
4. `index.ts`

这一阶段的细节见 `soybean-ui-ui-layer.instructions.md`。

场景 B 额外要求：

- 外部仓库已有的样式实现不能原样搬进来；要改成 SoybeanUI 的 `variants.ts`、`ui` 注入、wrapper 结构

场景 C 额外要求：

- 优先补齐 `variants.ts`、`mergeSlotVariants`、`class` 合并、UI 扩展 slot、命名和导出风格差异

进入 Phase 4 前，UI wrapper、variants、类型导出必须已经稳定。

## Phase 4：补齐出口面

代码主体完成后，接入所有正式出口：

- `headless/src/index.ts`
- `src/index.ts`
- `headless/src/constants/components.ts`
- `src/constants/components.ts`
- `headless/src/namespaced/index.ts`

不要把这些出口面留到最后忘记补。

场景 B 与场景 C 中，只要组件已经是正式公开组件，就要同时校对这些出口面，而不是只修实现文件。

进入 Phase 5 前，正式导出面必须已经可用。

## Phase 5：补 playground、docs、tests

实现完成并接入出口后，再补外围交付面：

- playground
- 中英文 docs
- menus 注册
- tests

对应细节见：

- `soybean-ui-playground.instructions.md`
- `soybean-ui-docs.instructions.md`
- `soybean-ui-testing.instructions.md`

进入 Phase 6 前，playground、docs、tests 这些外围交付面必须已经补齐或明确记录暂不交付的原因。

场景 B 中，若外部代码没有现成 docs 或 tests，也不能跳过这里，必须按仓库规范补齐。

场景 C 中，若本轮规范对齐涉及公开 API、a11y、状态语义或结构变更，也要同步更新 docs 与 tests。

## Phase 6：验证与收尾

结束前至少运行：

- `pnpm typecheck`
- `pnpm lint`
- 相关 `pnpm test` 或定向组件测试

若无法运行，必须记录原因。最终再按 `soybean-ui-checklist.instructions.md` 收尾。

## 完整交付面

新建组件默认检查并补齐：

- `headless/src/components/{component}/`
- `src/components/{component}/`
- `headless/src/index.ts`
- `src/index.ts`
- `headless/src/constants/components.ts`
- `src/constants/components.ts`
- `headless/src/namespaced/index.ts`
- `playground/examples/{component}/`
- `docs/src/docs/zh-CN/components/{component}.md`
- `docs/src/docs/en/components/{component}.md`
- `docs/src/constants/menus.ts`
- `test/specs/components/{component}.spec.ts`

为现有组件加功能或修 bug 时，也要同步检查这些出口面是否受影响，不要只改单个目录。

场景 B 与场景 C 也适用这条规则。

## 出口面规则

- `headless/src/index.ts` 与 `src/index.ts` 必须 re-export 新组件
- 两侧 `constants/components.ts` 的 key 使用 camelCase，按字母顺序插入
- headless 侧常量值使用无 `S` 前缀的 PascalCase 组件名数组；存在聚合入口时包含 `{Name}Compact`
- UI 侧常量值使用带 `S` 前缀的组件名数组
- `headless/src/namespaced/index.ts` 的 import 和 namespace 对象都按字母顺序维护；存在聚合入口时同步暴露 `Compact`

## 结果说明

- 如果本轮新增了新的 composable、shared helper 或类型，而不是复用仓库已有能力或 `@vueuse/core`，必须在结果总结中明确写出新增原因。

`soybean-ui-checklist.instructions.md` 只在实现完成后的收尾阶段使用；不要在任务刚开始时把 checklist 当成实现顺序文档。

## 相关细分规范

- headless 细节见 `soybean-ui-headless.instructions.md`
- UI 细节见 `soybean-ui-ui-layer.instructions.md`
- a11y 与 RTL 见 `soybean-ui-accessibility-rtl.instructions.md`
- playground 见 `soybean-ui-playground.instructions.md`
- docs 见 `soybean-ui-docs.instructions.md`
- testing 见 `soybean-ui-testing.instructions.md`
- 收尾见 `soybean-ui-checklist.instructions.md`
