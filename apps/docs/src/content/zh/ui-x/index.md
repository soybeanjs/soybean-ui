---
head:
  title: '@soybeanjs/ui-x'
  description: 面向 AI 对话场景的组件库，提供流式 Markdown、推理链、附件、会话管理等能力。
---

# @soybeanjs/ui-x

> 面向 AI 对话场景的组件库，提供流式 Markdown、推理链、附件、会话管理等能力。

20 个样式组件，用于构建对话式 AI 界面：聊天气泡、流式 Markdown（含 markstream-vue 底层）、语法高亮代码块、Mermaid 图表、思考链、文件附件、提示与建议等。基于 `@soybeanjs/headless` + `@soybeanjs/ui` 构建，借助 `@soybeanjs/ui-x` 的 composable 实现流式、打字机效果和发送器状态管理。

安装与首个界面见[安装](/ui-x/installation)与[快速开始](/ui-x/quick-start)；完整组件清单见下方的组件分类。

## 特性

- 20 个 AI 对话组件
- 通过 `markstream-vue` 实现流式 Markdown 渲染
- 打字机与淡入文本效果
- 发送器中的斜杠（`/`）和提及（`@`）命令建议
- 复制到剪贴板与点赞/倒赞反馈操作
- Mermaid 图表渲染（可选 peer dep）
- Shiki 语法高亮（可选 peer dep）
- TypeScript 类型安全
- 暗色模式支持
