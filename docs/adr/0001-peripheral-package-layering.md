# 外围包分层模型：拆解 headless-x，核心 headless 为唯一逻辑层

## 状态

accepted

## 背景

SoybeanUI 周边 UI 组件生态（ui-x / admin / chart …）在初始化时出现了两种不一致的分层：

- `admin` 分支：单包 `@soybeanjs/admin`，无独立逻辑层，直接组合 `@soybeanjs/headless` + `@soybeanjs/ui` 的 primitives。
- `ui-x` 分支：双包 `@soybeanjs/headless-x`（仅 composables + types，无 SFC）+ `@soybeanjs/ui-x`（样式）。

`headless-x` 的命名暗示"无头基础组件"，实际却只含领域 hooks（use-chat / use-send / use-think …），与核心 headless 承载 a11y primitives 的语义混淆；且双包分裂在外围包中仅此一例，破坏了生态一致性。

## 决策

1. **核心 `@soybeanjs/headless` 是唯一逻辑层**，只承载 a11y primitives、通用 composables、共享 types。
2. **外围包均为单包**（领域逻辑 + 样式同居于 `packages/<pkg>/src/`），不另建"领域逻辑包"。
3. **拆解 `@soybeanjs/headless-x`**：composables/types 迁入 `@soybeanjs/ui-x/src/`，删除 `headless-x` 包；`ui-x` 仅依赖 `headless + ui + theme`，并在 exports 增补 `./composables`、`./types` 子路径以缓解"逻辑被锁进样式包"的复用代价。
4. **仅"原子原语"级新组件可上浮核心 headless**（判据：无法由现有 primitives 组合 + 提供可复用 a11y/交互原语）；其余外围组件一律作为包装型组件留在外围包内。

## 权衡

- **被拒绝的方案 A（全部并入核心 headless）**：会让核心包承载 AI 领域逻辑，职责膨胀、跨域耦合；核心 headless 的语义从"a11y/通用 primitives"被稀释为"所有领域逻辑的垃圾箱"。
- **被拒绝的方案 B（按域设独立逻辑包，如 `headless-ai`）**：保持分离但增加包数与跨包依赖协调成本；在外围包仅 3 个、AI 是唯一有领域逻辑的域时，边际收益不抵成本。
- **本方案的代价**：AI composables 被锁进 `ui-x`，丢失"逻辑/样式分离"在 AI 域的可复用性——消费者想用 `use-chat` 必须依赖 `ui-x`。通过 `./composables` 子路径暴露 + 渐进上浮规则（被多包复用时按原子原语判据上浮核心 headless）缓解。

## 后果

- 外围包接入契约统一（见 `docs/ecosystem.md` §10）：绝大多数外围包无独立逻辑层。
- `headless-x` 包删除是不可逆的发布决策（已发布版本需在 changelog 标注 deprecation）。
- 核心 headless 的膨胀由"原子原语"判据约束（作者按规则自决，建议 PR 标注）。

## 相关

- [`docs/ecosystem.md`](../ecosystem.md) —— 生态架构完整方案。
- [`CONTEXT.md`](../../CONTEXT.md) —— 外围包 / 原子原语 / 包装型组件 术语定义。
