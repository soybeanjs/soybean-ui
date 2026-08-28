# 底部弹层

## 概述

从屏幕底部滑入的模态面板组件，适合承载移动端优先的轻量操作、补充信息和分步确认。它复用了 `SDialog` 的声明式 API（同一 headless dialog 基础组件），并额外提供拖拽关闭、背景缩放和 `snapPoints` 等底部交互能力。

`SBottomSheet` 组合 headless dialog 基础组件家族与 `bottomSheetVariants` 样式配方（继承 `drawerVariants`，新增拖拽 `handle`；6 种尺寸）。

## 用法

<UsageCode component="bottom-sheet" />

## 特性

- 🧩 复用 dialog 基座 — 继承 `SDialog` 的插槽、事件、逐部分 `*Props`、`pure`、`isAlert` 与标题/描述/底部契约
- 🖐️ 拖拽关闭 — `handle`（或弹层）可被拖拽；超过 `closeThreshold` 松手即关闭
- 📏 吸附点 — `snapPoints` 支持 `fraction`/`height` 吸附等级，实现可折叠弹层
- 🎭 背景缩放 — `shouldScaleBackground`/`setBackgroundColorOnScale` 缩放并着色页面背景
- 🪜 嵌套弹层 — `nested` 组合 `BottomSheetRootNested` 实现堆叠弹层
- 🧲 固定 — `fixed` 固定弹层同时内容滚动；`handleOnly` 限制仅手柄可拖
- 🔘 dialog 底部 — `showClose`/`showCancel`/`showConfirm`，`cancelText`/`confirmText` 本地化
- 📐 6 种尺寸 — xs–2xl `size`；逐槽 `ui` 覆盖
- ♿ 无障碍 — `role="dialog"`、焦点移入弹层、`axe-core` 零违规

## 组件家族

- `SBottomSheet`（样式层）— 入口包装组件；`bottomSheetVariants` 配方配合动态插槽转发
- `BottomSheetRoot` / `BottomSheetRootNested`（headless）— 状态持有者；`open`、`snapPoints`、`dismissible`、`nested`、拖拽/缩放状态
- `BottomSheetOverlay`（headless）— 变暗的背景遮罩
- `BottomSheetPopup`（headless）— 焦点陷阱、可拖拽、可关闭表面
- `BottomSheetHandle`（headless）— 抓手柄
- `BottomSheetTrigger` / `BottomSheetHeader` / `BottomSheetContent` / `BottomSheetFooter` / `BottomSheetTitle` / `BottomSheetDescription` / `BottomSheetClose` / `BottomSheetCancel` / `BottomSheetConfirm`（headless）— 包装 Dialog 的 chrome 基元；DOM 使用 `data-soybean-bottom-sheet-*`
- `BottomSheetCompact`（headless）— 聚合组件；组合手柄、头部、内容、底部并暴露各插槽

## 演示

<PlaygroundGallery component="bottom-sheet" />

## API

<ComponentApi component="bottom-sheet" />

## 注意事项

### 架构与对标差异

`BottomSheetCompact` 负责手柄/遮罩/弹层/头部/内容/底部组合与拖拽/吸附/缩放状态流（经 `useSnapPoints`/`useScaleBackground`），所有基础组件保持零样式，仅由 UI 包装组件注入 `bottomSheetVariants` 类。这与 vaul/radix-dialog 的 headless 分离一致。Ant Design、Element Plus、Mantine、Naive UI 提供单一样式化抽屉/模态；带 `snapPoints` 的专用可拖拽底部弹层通常是独立库（vaul、@radix-ui/dialog + 手动）。SoybeanUI 内联暴露逐槽 `*Props`、`size` 尺寸体系与吸附/缩放/拖拽模型。

| 能力              | SoybeanUI | shadcn/ui + vaul | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :--------------: | :--------: | :----------: | :-----: | :------: |
| 复用 dialog 基座  |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Headless/样式分离 |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 拖拽关闭          |    ✅     |        ✅        |     —      |      —       |   ✅    |    —     |
| 吸附点            |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 背景缩放          |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 嵌套弹层          |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 尺寸（6）         |    ✅     |        —         |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

### 运行时注意

- `modal` 默认 `true`；弹层传送至 `document.body`，body 滚动由 hide-others 层管理。
- 拖拽关闭使用指针捕获；`dismissible`（默认 `true`）允许超过阈值松手关闭。设 `false` 以强制显式操作。
- `snapPoints` 接受 `fraction`（0–1）或 `height` 数字数组；`activeSnapPoint` 追踪当前吸附等级。
- `handleOnly` 限制仅手柄可拖；`fixed` 保持弹层固定同时内部内容滚动。
- `nested` 经 `BottomSheetRootNested` 渲染；每个嵌套弹层需要各自的 `BottomSheetProvider` 上下文。

### Roadmap

不适用——bottom-sheet 对当前对标集已功能完备。

## FAQ

### 如何启用吸附点？

传入 `fraction` 或 `height` 数组：

```vue
<SBottomSheet :snap-points="[0.4, 0.8, 1]" title="筛选">
  <template #trigger><SButton>打开</SButton></template>
  <div>弹层内容</div>
</SBottomSheet>
```

### 如何禁用拖拽关闭？

设置 `dismissible={false}` 以要求显式操作：

```vue
<SBottomSheet :dismissible="false" title="确认">
  <template #trigger><SButton>打开</SButton></template>
  <div>弹层内容</div>
</SBottomSheet>
```

### 如何限制仅手柄可拖？

设置 `handle-only`：

```vue
<SBottomSheet handle-only title="详情">
  <template #trigger><SButton>打开</SButton></template>
  <div>弹层内容</div>
</SBottomSheet>
```

### 如何显示分步确认？

配合底部使用 `show-confirm`/`show-cancel`：

```vue
<SBottomSheet v-model:open="open" title="删除？" confirm-text="删除">
  <template #trigger><SButton danger>删除</SButton></template>
  <div>此操作无法撤销。</div>
</SBottomSheet>
```
