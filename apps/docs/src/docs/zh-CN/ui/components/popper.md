# Popper 定位浮层

## 概述

底层浮动原语：将内容锚定到触发元素，并提供完整的触发、开合与 dismiss 行为。`SPopper` 组合 headless `PopperRoot`/`PopperTrigger`/`PopperAnchor`/`PopperPositioner`/`PopperPopup`/`PopperArrow`/`PopperSub` 基础组件家族（构建于 Floating UI 之上）与 `popperVariants` 样式配方（6 个槽、3 种尺寸）。

需要自定义浮层并完全掌控触发、嵌套与关闭行为时直接使用 popper。常见场景请优先使用构建于其上的上层组件：丰富非关键内容用 `popover`，悬浮提示用 `tooltip`，菜单用 `dropdown-menu`/`context-menu`，表单弹层用 `select`/`combobox`。

## 用法

<UsageCode component="popper" file="basic-click" />

## 特性

- 🖱️ 3 种触发模式 — `click`、`hover` 与 `contextmenu`（虚拟点引用，触屏长按）
- ⏱️ 悬浮时序 — 每个根级 `openDelay`/`closeDelay` 加 `skipDelayDuration` 窗口；兄弟根级可经 `providePopperDelayGroup` 共享同一窗口（即 floating-ui 的 `FloatingDelayGroup` 模式）
- 🎯 定位 — 完整 popper `placement` 控制（12 个方向），带碰撞避免、`collisionPadding` 与 `prioritizePosition`
- 🧱 嵌套浮窗 — `PopperSub`/`PopperSubTrigger` 组合子浮窗；Escape 优先关闭最深层
- 📍 灵活锚定 — `PopperAnchor` 指定自定义引用元素，`useVirtualPointReference` 锚定视口坐标点
- 🔽 箭头 — 可选的定位箭头 `PopperArrow`
- 🧩 Headless/样式分离 — `PopperCompact` 聚合各原语；`SPopper` 只注入样式并转发插槽/事件
- 📐 3 种尺寸 — sm/md/lg `size`；逐槽 `ui` 覆盖

## 组件家族

- `SPopper`（样式层）— 入口包装组件；`popperVariants` 配方配合动态插槽转发
- `PopperRoot`（headless）— 状态持有者；经 `useControllableState` 维护 `open`，`trigger`/延迟时序，提供根 context
- `PopperTrigger`（headless）— 接入当前触发模式的触发元素
- `PopperAnchor`（headless）— 可选的自定义引用元素
- `PopperPositioner` / `PopperPositionerImpl`（headless）— 定位、可关闭表面（外部交互、Escape、焦点恢复、grace area）
- `PopperPopup`（headless）— 浮窗主体
- `PopperArrow`（headless）— 定位箭头
- `PopperSub` / `PopperSubTrigger`（headless）— 嵌套浮窗组合
- `PopperPortal`（headless）— portal 控制（`to`、`disabled`）
- `PopperCompact`（headless）— `SPopper` 使用的聚合组件
- `PopperPositioningRoot` / `PopperPositioningPositioner` / `PopperPositioningPopup`（headless）— 仅供领域层使用的纯定位原语（Select / Combobox / Cascader / Autocomplete 内部使用）
- `providePopperDelayGroup`（headless）— 在兄弟 popper 根级之间共享一个 skip-delay 窗口
- `useVirtualPointReference`（headless）— 将浮窗锚定到虚拟点（右键菜单）

## 演示

<PlaygroundGallery component="popper" />

## API

<ComponentApi component="popper" />

## 注意事项

### 架构与对标差异

所有原语保持零样式，仅由 UI 包装组件注入 `popperVariants` 类，与 radix-ui 的 headless/样式分离一致。Radix `Popper` 与 Mantine `Popper` 只暴露定位/锚定能力——没有触发状态机、dismiss 层或悬浮时序；Ant Design、Element Plus 与 Naive UI 的 popper 引擎完全内部化，不提供公开原语。SoybeanUI 额外内建了触发模式、可关闭定位器、悬浮 grace area、延迟组、嵌套子浮窗与虚拟引用 hook，这正是 `popover`/`tooltip`/`dropdown-menu`/`select` 得以保持轻薄的原因。

| 能力              | SoybeanUI | radix Popper | Mantine Popover | floating-ui |
| :---------------- | :-------: | :----------: | :-------------: | :---------: |
| Headless/样式分离 |    ✅     |      ✅      |        —        |      —      |
| 触发模式（3）     |    ✅     |      —       |        —        |      —      |
| 悬浮 grace area   |    ✅     |      —       |        —        |     ✅      |
| 延迟组            |    ✅     |      —       |        —        |     ✅      |
| Dismiss 层        |    ✅     |      —       |        —        |      —      |
| 嵌套子浮窗        |    ✅     |      —       |        —        |      —      |
| 虚拟引用          |    ✅     |      ✅      |        —        |     ✅      |

`—` = 不支持或采用不同交互模型。

### 运行时注意

- 浮窗没有默认 landmark role — 经 `popupProps` 设置，例如 `:popup-props="{ role: 'dialog' }"`，并在触发元素上加 `aria-haspopup="dialog"`。
- 浮窗经 `Portal` 渲染（传送至 `document.body`），因此可逃逸 overflow 容器；仅在 `portalProps: { disabled: true }` 时置于相对定位的祖先内。
- 关闭（外部交互或 Escape）时焦点恢复到触发元素。
- `update:open` 会报告切换原因（如 `escape-key`、`outside-pointer`）— 受控用法中可用于日志或埋点。
- `PopperPositioning*` 原语自身没有 open 状态、触发或关闭行为；它们为领域层（Select / Combobox / …）而生，应用代码很少需要。

## FAQ

### 如何切换触发模式？

使用 `trigger` prop — `click`（默认）、`hover` 或 `contextmenu`：

```vue
<SPopper trigger="hover" :open-delay="250" :close-delay="180">
  <template #trigger><button type="button">悬浮或聚焦我</button></template>
</SPopper>
```

### 如何控制打开状态？

绑定 `open` 并监听 `update:open`；每次切换都会报告明确的原因：

```vue
<SPopper :open="open" @update:open="(value, reason) => (open = value)">
  <template #trigger><button type="button">切换</button></template>
</SPopper>
```

### 如何将浮窗锚定到任意元素或坐标点？

用 `PopperAnchor` 包裹元素，或用 `useVirtualPointReference` 锚定视口坐标点（右键菜单）：

```vue
<PopperRoot>
  <PopperAnchor>…</PopperAnchor>
  <PopperPositioner>…</PopperPositioner>
</PopperRoot>
```

### 如何在兄弟 popper 之间共享悬浮 skip-delay？

在公共祖先的 setup 中调用 `providePopperDelayGroup` — 共享窗口内兄弟根级即时打开：

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { PopperRoot, providePopperDelayGroup } from '@soybeanjs/headless/popper';

providePopperDelayGroup({ skipDelayDuration: computed(() => 300) });
</script>

<template>
  <PopperRoot>…</PopperRoot>
</template>
```

### 如何让浮窗保持在视口内或逃逸 overflow 容器？

用 `collisionPadding` / `prioritizePosition` 调整定位器，并用 `portalProps` 控制 portal（如 `{ to: 'body' }` 或 `{ disabled: true }`）。
