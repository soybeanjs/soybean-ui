# 代码块

## 概述

带可选行号、复制到剪贴板以及可插拔语法高亮的代码块。`SCode` 组合 headless `CodeRoot`（复制状态、行号生成、高亮器注入）与 `codeVariants` 配方（block/inline 变体）。适用于文档示例、终端输出或 API 示例。需要行内代码样式的正文排版请优先使用 `STypographyText code`。语法高亮刻意不内置——传入 `highlight` 函数（例如来自 Shiki、highlight.js 或 Prism），由你选择自己的库与主题。

## 用法

<UsageCode component="code" />

## 特性

- 🧩 headless/styled 分离 — `CodeRoot` 负责复制状态（`copyTextToClipboard`）、行号生成与高亮器注入；`SCode` 仅注入样式
- 🔣 `language` 传入高亮器并反射为 `data-language`，便于按主题定制样式
- 🔢 `lineNumbers` 渲染由源码生成的行号槽
- 📋 `copyable` 渲染复制按钮，带瞬时复制成功状态与 `copied` 事件
- 🧩 `highlight` — 可插拔的 `(code, language) => string` 高亮器；省略时代码以转义纯文本渲染
- 🧱 `variant`（`block`/`inline`）— block 用于多行片段，inline 用于正文中的单行代码
- 🎨 `codeVariants` — `scv()` 配方，支持 `root`/`code`/`lineNumbers`/`copyButton` 插槽覆盖
- ♿ 语义化 `<pre>`/`<code>` 结构；装饰性行号与复制按钮带屏幕阅读器标签

## 演示

<PlaygroundGallery component="code" />

## API

<ComponentApi component="code" />

## 注意事项

### 架构与行业对标

SoybeanUI 将代码逻辑保留在 headless（`CodeRoot`），并让高亮器以普通函数注入，从而保持库零依赖，同时允许用户接入 Shiki/highlight.js/Prism。与 Mantine `Code`/`CodeHighlight`、Naive UI `n-code`、Chakra `Code`、shadcn `CodeBlock` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离与逐插槽 `ui` 类覆盖的对标库；Mantine `CodeHighlight` 内置 Shiki 集成但耦合主题，Naive UI 通过自带 bundle 渲染 Prism 高亮。

| 能力                 | SoybeanUI | Mantine CodeHighlight | Naive UI | Chakra | shadcn CodeBlock |
| :------------------- | :-------: | :-------------------: | :------: | :----: | :--------------: |
| headless/styled 分离 |    ✅     |           —           |    —     |   —    |        —         |
| 行号                 |    ✅     |          ✅           |    ✅    |   —    |        ✅        |
| 复制到剪贴板         |    ✅     |          ✅           |    —     |   —    |        ✅        |
| 可插拔高亮器         |    ✅     |           —           |    —     |   —    |        —         |
| block/inline 变体    |    ✅     |           —           |    ✅    |   ✅   |        —         |
| 逐插槽 `ui` 覆盖     |    ✅     |           —           |    —     |   —    |        —         |

### 使用注意

- `highlight` 返回 HTML 并通过 `v-html` 渲染；请对用户提供的高亮输出或非可信源码进行消毒。
- 行内（`variant="inline"`）会强制关闭 `lineNumbers`。
- 默认渲染对代码转义，特殊字符按字面显示；需要语法着色时提供 `highlight`。

## 常见问题

### 如何添加语法高亮？

传入返回 HTML 的 `highlight` 函数，例如 `(code, lang) => Prism.highlight(code, Prism.languages[lang], lang)`。函数接收代码与 `language` 属性。

### 如何显示行号？

设置 `line-numbers`。根据源码行数渲染行号槽。

### 如何复制代码？

设置 `copyable`。右上角出现复制按钮并带短暂成功状态；可监听 `copied` 事件。

### 如何在正文中使用行内代码？

设置 `variant="inline"`。代码以单行内联元素渲染，适合嵌入句子。
