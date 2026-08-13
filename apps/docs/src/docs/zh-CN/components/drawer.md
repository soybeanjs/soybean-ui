# 抽屉

## 概述

从屏幕边缘滑出的面板。它复用 `SDialog` 的声明式 API 与插槽契约（同一 headless `DialogCompact` 基座，相同的模态/焦点/可关闭行为），并新增 `side` 控制面板进入方向——`top`/`bottom`/`left`/`right`（默认 `right`）。

`SDrawer` 组合 headless dialog 基础组件家族与 `drawerVariants` 样式配方（继承 `dialogVariants`，6 种尺寸 × 4 个方向）。

## 用法

<UsageCode component="drawer" />

## 特性

- 🧩 复用 dialog 基座 — 构建于 `DialogCompact`，继承 `SDialog` 的插槽、事件、逐部分 `*Props`、`pure`、`isAlert` 与命令式 `dialog(...)` API
- 🧭 4 个方向 — `side="top"`/`"bottom"`/`"left"`/`"right"`（默认 `right`）；左右方向支持 RTL 镜像滑动
- 🎭 默认模态 — `aria-modal`、`useHideOthers`、外部指针拦截与焦点陷阱，与 `SDialog` 相同
- ❌ 可关闭 — `showClose`、Escape、外部指针/焦点与关闭按钮均可关闭
- 🎞️ 动画 — 进入/退出过渡（`slide-in-from-*` / `slide-out-to-*`）由打开状态驱动
- 📐 6 种尺寸 — xs–2xl `size`；逐槽 `ui` 覆盖
- 🔘 取消/确认底部 — `showCancel`/`showConfirm`，`cancelText`/`confirmText` 本地化
- ♿ 无障碍 — `role="dialog"`、焦点陷阱 + 循环、关闭时焦点还原、`axe-core` 零违规

## 组件家族

- `SDrawer`（样式层）— 入口包装组件；`drawerVariants` 配方（`size` + `side`）配合动态插槽转发
- 其余部分均来自 headless dialog 家族（见 `Dialog`）：`DialogRoot`、`DialogTrigger`、`DialogOverlay`、`DialogPopup`、`DialogHeader`、`DialogContent`、`DialogFooter`、`DialogTitle`、`DialogDescription`、`DialogClose`、`DialogCancel`、`DialogConfirm`、`DialogCompact`

## 演示

<PlaygroundGallery component="drawer" />

## API

<ComponentApi component="drawer" />

## 注意事项

### 架构与对标差异

`SDrawer` 是薄样式包装组件：它把每个 prop/插槽/事件转发给 headless `DialogCompact`，仅提供继承 `dialogVariants` 并按方向定制 `popup` 类的 `drawerVariants` 配方。这使得抽屉与对话框行为一致而仅表现不同——与 shadcn-ui/vaul 式抽屉相同的 headless/样式分离；而 Ant Design 的 `drawer`（带 `placement`/`width`/`closable`/`mask` prop 的单一样式化组件）及 Element Plus/Mantine/Naive UI 为另一模型。

| 能力                    | SoybeanUI | shadcn/ui | Ant Design Drawer | Element Plus Drawer | Mantine Drawer | Naive UI Drawer |
| :---------------------- | :-------: | :-------: | :---------------: | :-----------------: | :------------: | :-------------: |
| 复用 dialog 基座        |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| Headless/样式分离       |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| 4 个方向（side）        |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 模态（aria-modal+陷阱） |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 关闭时焦点还原          |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 尺寸（6）               |    ✅     |     —     |         —         |          —          |       —        |        —        |
| 纯净（无头/底部）       |    ✅     |     —     |         —         |          —          |       —        |        —        |

`—` = 不支持或采用不同交互模型。

### 运行时注意

- 抽屉继承 dialog 契约：默认模态，弹层传送至 `document.body`；Escape/外部交互关闭。
- `side` 只改变滑动方向与位置类；可访问 `role` 仍为 `dialog`（抽屉没有独立的 ARIA 角色）。
- 左右抽屉沿逻辑方向滑动，并在 RTL（`dir`）下镜像。
- 命令式 `dialog(...)` API 在传入匹配选项时同样能渲染抽屉——无需独立的 drawer 服务。

### Roadmap

`dialog`/`drawer` 的 `draggable` 与 `fullscreen` 变体记录在 `docs/check.md`（C72/C73，P0），对标 Ant Design/Element Plus。

## FAQ

### 如何从特定边缘滑出抽屉？

设置 `side` 为 `top`/`bottom`/`left`/`right`：

```vue
<SDrawer v-model:open="open" side="left" title="筛选">...</SDrawer>
```

### 如何控制打开状态？

用 `v-model` 绑定 `open`，或使用 `defaultOpen` 实现非受控抽屉：

```vue
<SDrawer v-model:open="open" title="设置">...</SDrawer>
```

### 如何添加取消/确认操作？

使用 `footer` 插槽，或依赖带本地化文本的 `showCancel`/`showConfirm`：

```vue
<SDrawer v-model:open="open" show-confirm confirm-text="应用" title="偏好设置">
  <template #trigger><SButton>打开</SButton></template>
</SDrawer>
```

### 如何制作自定义抽屉？

使用 `pure` 并填充默认插槽：

```vue
<SDrawer v-model:open="open" pure side="bottom">
  <div class="custom">...</div>
</SDrawer>
```
