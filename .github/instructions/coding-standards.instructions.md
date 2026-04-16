---
applyTo: '**/*.{ts,tsx,js,jsx,vue}'
---

# 通用代码规范

这份 instructions 是通用规范入口，用来说明 Copilot 在这个仓库中的规范分层。

顶层总入口是 `.github/copilot-instructions.md`。通用规范和 SoybeanUI 组件开发规范都以 `.github/instructions/` 下的 instruction 文件为准。

## 分类文件

- `import-order.instructions.md`：TypeScript、JavaScript、Vue 的 import 分组与 `import type` 规则。
- `typescript-functional-style.instructions.md`：TypeScript、Vue script、composable、shared helper 的实现风格。
- `vue-sfc.instructions.md`：Vue SFC，尤其是 `script setup` 的组织顺序与职责分层。
- `git-commit-convention.instructions.md`：commit message、changelog、release summary 规范。
- `soybean-ui-component-overview.instructions.md`：组件开发总流程、架构边界、集成出口与验证要求。
- `soybean-ui-headless.instructions.md`：headless 层的类型、context、聚合组件与实现边界。
- `soybean-ui-ui-layer.instructions.md`：UI 层的 variants、props 转发、wrapper 模式与命名约束。
- `soybean-ui-accessibility-rtl.instructions.md`：a11y 与 RTL 方向适配规则。
- `soybean-ui-playground.instructions.md`：playground 示例组织方式。
- `soybean-ui-docs.instructions.md`：组件文档与菜单注册规范。
- `soybean-ui-testing.instructions.md`：组件测试与 a11y 测试规范。
- `soybean-ui-checklist.instructions.md`：组件任务收尾检查清单。

## 分工原则

- 通用编码规范放在 `.github/instructions/`，按类别拆分，每类一个 instruction 文件。
- soybean-ui 组件库专属的架构、分层、模式、反模式、集成清单和交付闭环现在也以内置 instructions 为准。
- 如果任务不是 soybean-ui 组件开发，而只是普通代码编辑，优先遵循这里拆分后的 instructions，不必引入完整组件开发流程。
- 如果任务是 soybean-ui 组件开发、扩展、修复、补测试、补 docs 或补 playground，则按组件专属 instructions 的阶段顺序执行。

## 组件任务阅读顺序

1. 先看 `.github/copilot-instructions.md`
2. 再按任务类型应用通用 instructions
3. 如果任务属于组件开发，先读 `soybean-ui-component-overview.instructions.md`
4. 再按实现阶段阅读 `soybean-ui-headless.instructions.md`、`soybean-ui-ui-layer.instructions.md`
5. 再按需要阅读 `soybean-ui-accessibility-rtl.instructions.md`、`soybean-ui-playground.instructions.md`、`soybean-ui-docs.instructions.md`、`soybean-ui-testing.instructions.md`
6. 最后用 `soybean-ui-checklist.instructions.md` 收尾
