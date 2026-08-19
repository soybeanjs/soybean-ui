# 排版

## 概述

语义化文本原语家族——`STypographyTitle`（h1–h6）、`STypographyParagraph`（支持复制）、`STypographyText`（类型/修饰变体）——基于轻量 headless 组件构建，每个角色渲染正确的 HTML 元素。适用于文档正文、卡片标题、需要特定语义级别的表单标签，以及任何对标题/段落/内联文本元素语义有要求的可访问性与 SEO 场景。单个内联词使用 `STypographyText`，章节标题使用 `STypographyTitle`，正文使用 `STypographyParagraph`。需要行数截断时与 `SEllipsis` 搭配。

## 用法

<UsageCode component="typography" />

## 特性

- 🧩 headless/styled 分离 — `TypographyTitle`/`TypographyParagraph`/`TypographyText` 负责语义元素与状态；`STypography*` 包装仅注入配方
- 🏷 `STypographyTitle` — `level`（1–6）同时驱动 `h1`–`h6` 标签与 `typographyTitleVariants` 尺寸刻度
- 📄 `STypographyParagraph` — `copyable` 渲染复制按钮；复制逻辑通过 `copyTextToClipboard` 位于 headless，暴露 `{ copied, copy }` 插槽参数
- ✍️ `STypographyText` — `type`（`secondary`/`success`/`warning`/`danger`）以及 `code`/`mark`/`strong`/`italic`/`underline`/`delete` 修饰符，自动选择语义元素（`<code>`、`<mark>`、`<em>` 等）
- 🧭 title 与 text 支持 `as`/`asChild` 多态 — 覆盖渲染标签或合并到子元素
- 🎨 `typographyTitleVariants` / `typographyParagraphVariants` / `typographyTextVariants` — 每个原语独立的 `cv()`/`scv()` 配方
- ♿ 语义化 HTML（`h1`–`h6`、`p`、`code`、`mark`、`del`、`strong`、`em`），并带 `data-level`/`data-type`/`data-code` 等状态属性

## 组件家族

- `STypographyTitle` — 标题原语（`h1`–`h6`）
- `STypographyParagraph` — 段落原语，支持复制
- `STypographyText` — 内联文本原语，带类型/修饰变体

## 演示

<PlaygroundGallery component="typography" />

## API

<ComponentApi component="typography" />

## 注意事项

### 架构与行业对标

SoybeanUI 提供三个独立原语，而非带模式标志的单一 `Typography` 根组件。每个 `STypography*` 包装自包含（无需父级），应用各自的 `cv()`/`scv()` 配方，语义元素保留在 headless。与 Ant Design `Typography`（单一根组件，`Title`/`Paragraph`/`Text` 子组件带 `copyable`/`editable`/`ellipsis`）、MUI `Typography`（`variant` 映射）、Chakra `Heading`/`Text`、Element Plus 相比，SoybeanUI 是唯一在全部原语上同时具备 headless/styled 分离与 `as`/`asChild` 多态的对标库。注意：本里程碑有意不提供段落 `editable`（需要行内编辑时请使用 `editable` 组件）。

| 能力                 | SoybeanUI | Ant Design | MUI | Chakra | Element Plus |
| :------------------- | :-------: | :--------: | :-: | :----: | :----------: |
| headless/styled 分离 |    ✅     |     —      |  —  |   —    |      —       |
| 标题级别 1–6         |    ✅     |     ✅     | ✅  |   ✅   |      —       |
| 段落可复制           |    ✅     |     ✅     |  —  |   —    |      —       |
| 文本类型/修饰        |    ✅     |     ✅     |  —  |   ✅   |      —       |
| `as`/`asChild`       |    ✅     |     —      |  —  |   —    |      —       |
| 语义 HTML 选择       |    ✅     |     ✅     |  —  |   ✅   |      —       |

### 使用注意

- `STypographyTitle` 渲染 `h{level}`；为保证文档可访问性请勿跳级（从 `h1` 直接跳到 `h3` 属于 WCAG 标题顺序问题）。
- `STypographyParagraph` 的 `copyable` 默认读取 `textContent` 作为复制内容，除非传入 `copy-text`。
- 段落的 `ellipsis`/`editable` 能力分别由 `SEllipsis` 与 `editable` 组件覆盖——按需组合即可。

## 常见问题

### 如何使用不影响文档大纲的标题？

给 `STypographyTitle` 传 `as="div"`，渲染带标题排版但无语义级别的 `div`；或使用 `role="heading"` 配合 `aria-level`。

### 如何只复制段落的部分内容？

在 `STypographyParagraph` 上设置 `copy-text` 以控制复制内容，而不依赖完整文本内容。

### 如何同时使用行内代码样式与类型颜色？

`STypographyText` 支持叠加：`<STypographyText code type="success">npm i</STypographyText>`。

### 为什么没有 `Typography` 根组件？

每个原语自包含，无需包装 provider 即可使用。这与 Mantine/Chakra 一致，并保持 API 表面扁平。
