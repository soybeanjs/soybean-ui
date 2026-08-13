# 徽章

## 概述

用于叠加在触发器（按钮、头像、导航项）上的小型状态/通知标记，用于指示数量、状态或新内容。`SBadge` 组合 `BadgeRoot`/`BadgeContent` 这一系列 headless 基础组件（零样式）与 `badgeVariants` 样式配方（2 个槽：root/content；8 种颜色 × 6 种尺寸 × 4 个位置）。

适用于未读数量、通知徽标、状态圆点，或任何锚定在宿主元素右上角（或其他角落）的小标签。独立的内联分类标签请优先使用 `tag`；需要承载更多内容的上下文反馈请优先使用 `alert`。

`SBadge` 通过 `BadgeCompact` 聚合这些基础组件，提供以 `content` 为核心的 API，并通过 `v-model:open` 控制气泡的显隐。需要完全自定义组合时，可直接使用 headless 层的 `BadgeRoot`/`BadgeContent` 基础组件。

## 用法

<UsageCode component="badge" />

## 特性

- 🧩 Headless/样式分离 — `BadgeCompact` 聚合 `BadgeRoot`/`BadgeContent` 并暴露 `content` 插槽；`SBadge` 只注入样式并转发插槽/事件
- 🔢 `content` prop / 插槽 — 通过 `content` 插槽在气泡内渲染纯文本或任意 VNode
- 🎛️ 受控显隐 — `v-model:open` 切换气泡是否渲染（`useControllableState`，默认 `true`）
- 🎨 8 种颜色 — `ThemeColor` 的 `primary`/`destructive`/`success`/`warning`/`info`/`carbon`/`secondary`/`accent`
- 📐 6 种尺寸 — 来自 `ThemeSize` 的 xs–2xl `size`
- 📍 4 个位置 — `top-right`/`bottom-right`/`top-left`/`bottom-left`
- 🌐 RTL 感知 — 角落定位使用逻辑 `start`/`end` 属性，RTL 下自动镜像
- ♿ 真实内容 — 气泡文本以真实内容渲染并可被辅助技术读取；`axe-core` 零违规

## 组件家族

- `SBadge`（样式层）— 入口包装组件；`badgeVariants` 配方配合动态插槽转发
- `BadgeRoot`（headless）— 容器；通过 `useControllableState` 与 `provideBadgeRootContext` 维护 `open` 状态
- `BadgeContent`（headless）— 气泡；仅在 `open` 时渲染
- `BadgeCompact`（headless）— 聚合组件；组合 root/content 并默认气泡内容

## 演示

<PlaygroundGallery component="badge" />

## API

<ComponentApi component="badge" />

## 注意事项

### 架构与对标差异

`BadgeCompact` 负责显隐编排，所有基础组件保持零样式，仅由 UI 包装组件注入 `badgeVariants` 类。这与 shadcn/ui 的 headless/样式分离（其 Badge 为纯样式标签）及 Radix 的 `Badge` 原语一致；而 Ant Design、Element Plus、Naive UI 则提供单一样式化 `Badge` 组件（`count`/`max`/`dot`/`offset` prop）。SoybeanUI 通过 `content` prop/插槽暴露气泡，并提供受控的 `open` 状态，将数量格式化（`max`）与圆点/偏移等便捷能力留在核心之外——详见下方增强项。

| 能力                  | SoybeanUI | shadcn/ui | Ant Design Badge | Element Plus Badge | Mantine Badge | Naive UI Badge |
| :-------------------- | :-------: | :-------: | :--------------: | :----------------: | :-----------: | :------------: |
| Headless/样式分离     |    ✅     |    ✅     |        —         |         —          |       —       |       —        |
| 内容 / 通知气泡       |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| 位置（角落定位）      |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| 颜色变体（8）         |    ✅     |    ✅     |        ✅        |         ✅         |      ✅       |       ✅       |
| 尺寸变体（6）         |    ✅     |     —     |        ✅        |         ✅         |      ✅       |       ✅       |
| RTL 感知定位          |    ✅     |     —     |        —         |         —          |       —       |       —        |
| 受控显隐（`open`）    |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| `max` 数量封顶（99+） |    ➕     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| `dot` 模式 / `offset` |    ➕     |     —     |        ✅        |         ✅         |       —       |       ✅       |

`—` = 不支持或采用不同交互模型；`➕` = 有价值但尚未提供的增强项（见下）。

### 运行时注意

- 气泡相对根节点绝对定位，根节点为 `position: relative`。若宿主元素设置了 `overflow: hidden`，气泡靠近边缘时可能被裁剪。
- `open` 默认 `true`。要隐藏气泡请使用 `:open="false"` 或 `v-model:open` 绑定。
- 气泡使用 `whitespace-nowrap`，超长内容会溢出而非换行——请保持数量简短，或自行封顶（在 `max` prop 落地前）。
- 气泡文本对屏幕阅读器可见。若其与触发器标签重复（如已标注按钮上的状态圆点），可通过 `content` 插槽将其设为装饰性内容。
- RTL 下角落定位自动镜像（`top-right` 在视觉上仍为右上角，使用逻辑属性），`transform` 偏移会自动交换。

### Roadmap

数量格式化（`max`，渲染 `99+`）、纯 `dot` 模式与 `offset` 定位为已评估的增强项，记录在 `docs/roadmap.md`——它们不属于当前公共 API。

## FAQ

### 如何在按钮上显示未读数量？

包裹触发器并设置 `content`：

```vue
<SBadge content="99+">
  <SButton variant="pure">收件箱</SButton>
</SBadge>
```

### 如何控制徽章是否可见？

使用 `v-model:open`（或 `:open="false"` 隐藏）：

```vue
<SBadge v-model:open="show" content="3">
  <SButton variant="pure">消息</SButton>
</SBadge>
```

### 如何将徽章放到其他角落？

使用 `position`，可选 `top-right` / `bottom-right` / `top-left` / `bottom-left`：

```vue
<SBadge position="bottom-left" content="1">
  <SAvatar src="/me.png" fallback-label="JD" />
</SBadge>
```

### 如何改变颜色与尺寸？

使用 `color`（8 个 `ThemeColor` 值）与 `size`（xs–2xl）：

```vue
<SBadge color="success" size="lg" content="New" />
```

### 如何渲染自定义徽章气泡？

使用 `content` 插槽渲染任意 VNode 以替代纯文本：

```vue
<SBadge>
  <SButton variant="pure">购物车</SButton>
  <template #content><SIcon icon="lucide:bell" /></template>
</SBadge>
```
