---
name: soybean-ui-component
description: 按 SoybeanUI 组件规范执行完整的组件开发、扩展或修复流程
argument-hint: 例如：任务=新增组件 组件=accordion 目标=新增 compact；或 任务=扩展组件 组件=table 目标=补齐 docs 与 tests
agent: agent
---

# SoybeanUI 组件开发协议

你正在 SoybeanUI 仓库中执行组件相关任务。这个 prompt 的目标不是提供泛化建议，而是驱动你严格完成一次组件开发闭环。

## 输入

- 任务：${input:task:例如 新增组件 / 扩展组件 / 修复组件}
- 组件：${input:componentName:例如 accordion}
- 目标：${input:goal:例如 新增 Compact、补齐测试、修复 a11y}
- 范围限制：${input:scope:可留空；例如 仅改 headless / 不改 docs / 只修 bug}
- 参考组件：${input:reference:可留空；例如 accordion、table、button}

## 必须先读取的规范

先读取并遵循这些文件，不要跳过：

- [项目知识库](../../AGENTS.md)
- [组件开发 skill](../../.agents/skills/soybean-ui-component-development/SKILL.md)
- [开发校验清单](../../.agents/skills/soybean-ui-component-development/references/checklist.md)
- [禁止反模式](../../.agents/skills/soybean-ui-component-development/references/anti-patterns.md)
- [常见模式](../../.agents/skills/soybean-ui-component-development/references/patterns.md)

如果任务发生在 headless 组件目录内，再额外查看：

- [headless 组件约定](../../headless/src/components/AGENTS.md)

## 强制执行顺序

### 1. 先判模式

先判断当前组件属于哪一种，再继续实施：

- 多 slot 基础组件
- Compact 聚合组件
- 单类名组件

在开始改代码前，必须明确写出你判定的模式，以及这样判定的依据。

### 2. 先找参照

开始编辑前，必须至少查看：

- 一个同模式的 headless 组件
- 一个同模式的 UI 组件

优先复用仓库已有实现，不要凭空生成“通用 Vue 组件模板”。如果提供了“参考组件”，优先从那里找；否则自己找最近似实现。

### 3. 先列交付面

在动手前，先列出这次任务应覆盖的文件面。除非“范围限制”明确排除，否则默认按完整集成处理。

新建组件默认检查并补齐：

- `headless/src/components/{component}/`
- `src/components/{component}/`
- `headless/src/index.ts`
- `src/index.ts`
- `headless/src/constants/components.ts`
- `src/constants/components.ts`
- `headless/src/namespaced/index.ts`
- `playground/examples/{component}/`
- `docs/src/docs/en/components/{component}.md`
- `docs/src/docs/zh-CN/components/{component}.md`
- `docs/src/constants/menus.ts`
- `test/specs/components/{component}.spec.ts`

扩展或修复现有组件时，也要同步检查这些出口面是否受影响，不要只改当前打开文件。

### 4. 再实施代码修改

实施时必须遵循以下规则：

- Headless 只负责逻辑、状态、a11y，不添加样式类。
- UI 层不承担 ARIA 和状态逻辑。
- 如果场景满足“数据驱动 + 结构稳定 + UI 层只是重复拼装分片”，优先把聚合逻辑下沉为 `{Name}Compact`。
- UI wrapper 只保留 `variants.ts`、`mergeSlotVariants`、`provide{Name}Ui(ui)`、props/listeners 转发、slots 透传。
- `types.ts`、`context.ts`、SFC 组织顺序、`data-slot`、`useControllableState`、`PropsToContext`、`mergeSlotVariants` 等实现细节，严格按 skill 与 checklist 执行。
- `types.ts` 的 headless 导入风格跟随邻近同模式组件，不要在同一组件内随意混用路径。

### 5. 必须收尾验证

结束前，至少运行与改动匹配的验证：

- `pnpm typecheck`
- `pnpm lint`
- 相关组件测试或定向测试

如果你没有运行某项验证，必须明确说明原因，而不是默认跳过。

### 6. 按 checklist 做最终自检

结束前，必须对照 [开发校验清单](../../.agents/skills/soybean-ui-component-development/references/checklist.md) 做一次任务相关自检。

## 输出要求

你的工作过程和结果必须满足这些要求：

- 不只给方案；在没有明确阻塞时，直接完成代码修改。
- 如果信息足以从仓库推断，不要为了小问题频繁反问用户。
- 如果被“范围限制”缩小了任务，明确指出哪些环节按要求未做。
- 最终总结中必须包含：
  - 判定的组件模式
  - 参考了哪些现有组件
  - 改动覆盖了哪些层和出口面
  - 运行了哪些验证
  - 哪些 checklist 项因范围限制或阻塞未完成

## 失败条件

出现以下任一情况，都视为任务未完成：

- 没有先看同模式参照就直接生成组件代码
- 只完成 headless 或只完成 UI，但没有说明范围限制
- 新建组件却漏掉 barrel、constants、namespaced、playground、docs、tests 中本应更新的部分
- 已有 `{Name}Compact` 应该下沉到 headless，却仍把聚合逻辑留在 UI wrapper
- 没做验证，也没说明为什么没做
- 最终汇报没有说明未完成项和阻塞点

现在开始执行该任务，并严格按上述顺序推进。
