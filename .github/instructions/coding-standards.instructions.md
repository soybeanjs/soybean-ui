---
applyTo: '**/*.{ts,tsx,js,jsx,vue}'
---

# 通用代码规范

本文件只负责把普通代码任务路由到对应的通用规范，不重复组件开发流程。

## 适用范围

- 普通 TypeScript、JavaScript、Vue 编辑：使用 import、TypeScript 风格、Vue SFC 三类通用规范。
- commit message、changelog、release summary：使用 `git-commit-convention.instructions.md`。
- 如果当前任务不是组件开发，就不要机械套用组件全流程。

## 使用方式

1. 先判断当前是不是 SoybeanUI 组件任务。
2. 如果不是组件任务，默认只读：
   - `import-order.instructions.md`
   - `typescript-functional-style.instructions.md`
   - `vue-sfc.instructions.md`（仅 `.vue`）
3. 如果是 commit、changelog 或 release summary，再补 `git-commit-convention.instructions.md`。
4. 如果是组件任务，停止在本文件继续展开，改读 `soybean-ui-component-overview.instructions.md`。

## 对应文件

- `import-order.instructions.md`：import 分组与 `import type` 规则
- `typescript-functional-style.instructions.md`：TypeScript、composable、helper 的实现风格
- `vue-sfc.instructions.md`：Vue SFC，尤其是 `script setup` 顺序与模板约束
- `git-commit-convention.instructions.md`：commit message、changelog、release summary 规范

## 原则

- 本文件只做分流，不承载组件专属规范正文。
- 具体规则以对应主题文件为准，不在多个文件重复解释同一条约束。
