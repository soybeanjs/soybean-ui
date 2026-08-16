# 代码块

## 概述

`SxCodeBlock` 是面向 AI 输出的带样式代码块，包含语言标签、复制按钮以及（可选的）shiki 语法高亮。它是 `@soybeanjs/ui-x` 中自包含的单导出组件。

用于在聊天消息、助手工具结果或文档面板中展示代码片段。复制按钮会将 `code`（或 `copyText` 覆盖值）写入剪贴板，闪烁 1.5 秒的「已复制」状态，并给元素标记 `data-copied`。高亮采用懒加载——设置 `highlight` 即开启，此时才会通过 `dynamic import('shiki')` 按需加载 shiki。

在 `@soybeanjs/ui-x` 中，`SxCodeBlock` 可与 `SxMarkdown`（作为 `codeRenderer`）以及 `SxMermaid` / `SxNotification` 搭配，构成完整的 AI 消息内容。

## 用法

<UsageCode component="code-block" />

## 特性

- 📋 复制到剪贴板 — 复制 `code`（或 `copyText`），显示 1.5 秒「已复制」闪烁并设置 `data-copied`
- 🎨 懒加载 shiki 高亮 — 开启 `highlight` 后按需加载 `shiki`，使用 `github-light` / `github-dark` 主题
- 🏷️ 语言标签 — 头部显示语言，空值 / `'text'` 会归一化为 `text`
- 🧭 头部开关 — `showHeader` 控制语言标签与复制操作是否显示
- 🎛️ 复制控制 — 每次复制尝试后都会触发 `onCopy` 回调与 `copy` 事件
- 🧩 自定义插槽 — `actions` 添加额外头部操作，`copy-label` 自定义按钮文案
- 🛟 优雅降级 — 高亮失败时静默回退为纯文本，不影响代码块展示
- ♿ 无障碍 — 复制按钮暴露 `aria-label`（"Copy code" / "Copied"）

## 演示

<PlaygroundGallery component="code-block" />

## API

<ComponentApi component="code-block" />

## 注意事项

### 架构与行业对标

`SxCodeBlock` 是 `@soybeanjs/ui-x` 中的带样式、单包 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。与编辑器导向、需要完整编辑器能力的库不同，它面向只读的 AI 输出：复制与可选高亮是核心能力，头部与操作区通过插槽保持可组合。

| 能力                   | SoybeanUI-X `SxCodeBlock` | Vercel AI SDK（`CodeBlock`） | shadcn AI（React） | Ant Design Chat（ProChat） | React markdown 库 |
| :--------------------- | :-----------------------: | :--------------------------: | :----------------: | :------------------------: | :---------------: |
| Vue 3 原生             |            ✅             |              —               |         —          |             —              |         —         |
| 内置复制到剪贴板       |            ✅             |              ✅              |         —          |             ✅             |         —         |
| 语法高亮               |            ✅             |              —               |         —          |             ✅             |        ✅         |
| 懒加载高亮（动态导入） |            ✅             |              —               |         —          |             —              |         —         |
| 自定义头部操作插槽     |            ✅             |              —               |         —          |             —              |         —         |
| 主题感知高亮           |            ✅             |              —               |         —          |             ✅             |        ✅         |

`—` = 不支持或需要额外接线。

### 使用注意

- `code` 必填；不传 `copyText` 时复制的是原始 `code`。
- `highlight` 使用动态 `import('shiki')`——请将 `shiki` 作为可选 peer 依赖安装，否则高亮会静默回退为纯文本。
- 复制依赖 `navigator.clipboard`，在受限权限或 SSR 下可能不可用；此时会跳过闪烁，但 `copy` / `onCopy` 仍会触发。
- 空值或 `'text'` 的语言标签在头部会归一化为 `text`。

## 常见问题

### 如何复制自定义文本而不是代码？

传入 `copyText`；剪贴板会收到该值，而代码块仍展示 `code`。

### 如何启用语法高亮？

设置 `highlight` 并确保已安装 `shiki`：

```vue
<SxCodeBlock :code="code" language="vue" highlight />
```

### 如何跟踪复制事件？

监听 `copy` 事件或传入 `onCopy`：

```vue
<SxCodeBlock :code="code" @copy="text => console.log(text)" />
```

### 如何在头部添加额外按钮？

使用 `actions` 插槽——它会渲染在头部复制按钮旁边。

### 为什么语言标签显示为 "text"？

空值或 `'text'` 会被归一化为 `text`；请传入真实语言，如 `ts`、`vue` 或 `bash`。
