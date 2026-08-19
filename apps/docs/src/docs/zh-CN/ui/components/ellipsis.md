# 文本省略

## 概述

文本截断原语，可将内容限制在可配置行数内（`-webkit-line-clamp`），并在内容真正溢出时通过 tooltip 展示完整文本。`SEllipsis` 将 headless `EllipsisRoot`（通过 `useOverflow` 检测溢出、管理展开状态、捕获纯文本）与 `STooltip` 组合，并应用 `ellipsisVariants` 配方（1–6 行）。适用于列表项、表格单元格、卡片标题等需要保持紧凑的长文本场景。文档正文中的省略请优先使用 `TypographyText` 的 `ellipsis`；仅需提示而不截断时直接使用 `tooltip`。

## 用法

<UsageCode component="ellipsis" />

## 特性

- 🧩 headless/styled 分离 — `EllipsisRoot` 负责溢出检测与状态；`SEllipsis` 仅组合 tooltip 并注入 clamp 配方
- 📏 `lines`（1–6）通过 `ellipsisVariants` 映射到 `-webkit-line-clamp`；溢出由共享的 `useOverflow` composable 测量
- 💡 仅溢出时显示 tooltip — 除非 `scrollWidth`/`scrollHeight` 超过盒尺寸，否则不弹出（`ResizeObserver` + `MutationObserver` 跟踪尺寸与文本变化）
- 🔽 `expandable` 点击在折叠/展开间切换，支持 `v-model:expanded` 并反射 `aria-expanded`
- 🧭 `as`/`asChild` 多态 — 可渲染为 `span`、`div` 或合并到子元素
- 🧩 插槽参数暴露 `{ overflowed, expanded, text, toggle, tooltip }`，支持完全自定义行为
- 🎨 `ellipsisVariants` — 单类 `cv()` 配方；展开状态通过 `data-[expanded]:[display:block]` 取消 clamp
- ♿ 无冗余 ARIA；可交互的展开模式反射 `data-state` 与 `aria-expanded`

## 演示

<PlaygroundGallery component="ellipsis" />

## API

<ComponentApi component="ellipsis" />

## 注意事项

### 架构与行业对标

SoybeanUI 将省略组件拆分为 headless `EllipsisRoot`（使用共享的 `useOverflow` composable，通过 `ResizeObserver` + `MutationObserver` 检测溢出、管理可控展开状态并捕获 tooltip 所需的纯文本）与带样式的 `SEllipsis` 包装（组合 `STooltip`）。与 Naive UI `n-ellipsis`、Arco `Typography` 省略、Mantine `LineClamp` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离、插槽参数实时暴露溢出状态以及 `as`/`asChild` 多态的对标库；Mantine `LineClamp` 无 tooltip 或展开能力，Naive UI 的 tooltip 仅悬停显示且展开模式与 tooltip 互斥。

| 能力                 | SoybeanUI | Naive UI | Arco Typography | Mantine LineClamp |
| :------------------- | :-------: | :------: | :-------------: | :---------------: |
| headless/styled 分离 |    ✅     |    —     |        —        |         —         |
| 行数 clamp（1–N）    |    ✅     |    ✅    |       ✅        |        ✅         |
| 溢出感知 tooltip     |    ✅     |    ✅    |       ✅        |         —         |
| 点击展开             |    ✅     |    ✅    |       ✅        |         —         |
| 受控展开             |    ✅     |    —     |        —        |         —         |
| 自定义 tooltip 内容  |    ✅     |    —     |       ✅        |         —         |
| `as`/`asChild`       |    ✅     |    —     |        —        |         —         |
| 实时插槽参数         |    ✅     |    —     |        —        |         —         |

### 使用注意

- 溢出检测需要可测量的盒子；内联 `span` 位于块内时，需在祖先上设置宽度约束，`scrollWidth` 才会超过 `clientWidth`。
- `expandable` 模式下 tooltip 自动禁用，避免点击展开与悬停弹窗冲突。
- `-webkit-line-clamp` 是 WebKit/Blink 标准，Firefox 亦支持；展开状态通过将 `display` 切换为 `block` 移除 clamp。

## 常见问题

### 短内容为什么不显示 tooltip？

除非内容实际超出 clamp，否则 tooltip 被禁用。`useOverflow` 将 `scrollWidth`/`scrollHeight` 与盒尺寸比较，短文本永远不会触发弹窗。

### 如何让文本可展开？

设置 `expandable`，可选绑定 `v-model:expanded`。点击文本在受限预览与完整内容之间切换。

### 如何自定义 tooltip 文本？

传入 `tooltip-content`。未提供时，`SEllipsis` 使用 `EllipsisRoot` 捕获的纯文本内容。

### 如何渲染为块级或标题元素？

使用多态 `as` 属性（`as="div"`）或 `asChild` 合并到单个子元素。
