# 通知

## 概述

`SToastProvider` 负责渲染通知视口，`toast` 是用于创建、更新、关闭和查询通知的命令式 API。

`toast(...)` 的第一个参数会作为通知的标题/主消息。你可以通过 `description`、`action`、`cancel`、`icon`、`ui` 和 `position` 来定制每条通知。

## 用法

在应用根部挂载一个 `SToastProvider`。如果你的应用已经被 `SConfigProvider` 包裹，那么默认会自动渲染一个 `SToastProvider`，除非将 `customToast` 设为 `true`。

```vue
<script setup lang="ts">
import { SButton, SToastProvider, toast } from '@soybeanjs/ui';

function openToast() {
  toast.success('Project published', {
    description: 'The package has been pushed to the registry.',
    richColor: true
  });
}
</script>

<template>
  <SToastProvider />

  <SButton @click="openToast">Show Toast</SButton>
</template>
```

## 演示

```playground
base
types
promise
action
control
appearance
stack
position
```

## API

### toast 方法

<DataTable preset="props" :data="[
  { name: 'toast(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '创建或更新默认通知。复用 `options.id` 可以更新已有通知。' },
  { name: 'toast.message(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '`toast(...)` 的别名。' },
  { name: 'toast.success(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '创建成功通知。' },
  { name: 'toast.info(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '创建信息通知。' },
  { name: 'toast.warning(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '创建警告通知。' },
  { name: 'toast.error(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '创建错误通知。' },
  { name: 'toast.loading(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: '创建加载中通知。通常和 `id` 一起用于后续替换。' },
  { name: 'toast.custom(component, options?)', type: '(component: VNode, options?: ToastExternal) => number | string', default: '-', description: '直接渲染自定义 VNode，替代内置通知布局。' },
  { name: 'toast.promise(promise, data)', type: '<T>(promise: ToastPromise<T>, data: ToastPromiseData<T>) => { unwrap: () => Promise<T> }', default: '-', description: '将通知生命周期绑定到 Promise，并自动展示 loading / success / error 状态。' },
  { name: 'toast.dismiss(id?)', type: '(id?: number | string) => number | string | void', default: '-', description: '按 id 关闭单条通知；不传参数时关闭全部活动通知。' },
  { name: 'toast.getToasts()', type: '() => ToastT[]', default: '-', description: '获取当前仍处于活动状态的通知列表。' },
  { name: 'toast.getHistory()', type: '() => (ToastT | ToastDismiss)[]', default: '-', description: '获取内部通知历史记录，包含关闭事件。' }
]"/>

### 通知选项

<DataTable preset="props" :data="[
  { name: 'id', type: 'number | string', default: 'auto', description: '稳定的通知 id。复用该值可以更新已有通知。' },
  { name: 'toasterId', type: 'string', default: '-', description: '将通知发送到指定的 `SToastProvider` 实例。' },
  { name: 'position', type: 'ToastPosition', default: '继承 `SToastProvider.position`', description: '单条通知的显示位置覆盖。' },
  { name: 'duration', type: 'number', default: '继承 `SToastProvider.duration`', description: '自动关闭时长，单位为毫秒。设置为 `0` 或 `Infinity` 可禁用自动关闭。' },
  { name: 'description', type: 'VNode | string', default: '-', description: '显示在标题下方的辅助说明内容。' },
  { name: 'icon', type: 'IconValue', default: '-', description: '自定义前置图标。字符串值会通过 `iconRender` 解析。' },
  { name: 'content', type: 'VNode', default: '-', description: '在内置布局中追加渲染的自定义内容。' },
  { name: 'action', type: 'VNode | string', default: '-', description: '页脚主操作。字符串值会通过 `buttonRender` 解析。' },
  { name: 'cancel', type: 'VNode | string', default: '-', description: '页脚次操作。字符串值会通过 `buttonRender` 解析。' },
  { name: 'onAction', type: '(event: MouseEvent) => void', default: '-', description: '点击 action 按钮时触发。' },
  { name: 'onCancel', type: '(event: MouseEvent) => void', default: '-', description: '点击 cancel 按钮时触发。' },
  { name: 'dismissible', type: 'boolean', default: 'true', description: '是否允许滑动关闭和手动关闭。' },
  { name: 'showClose', type: 'boolean', default: '继承 `SToastProvider.showClose`', description: '是否为当前通知显示关闭按钮。' },
  { name: 'richColor', type: 'boolean', default: 'false', description: '为 info、success、warning、error 通知启用语义化填充色样式。' },
  { name: 'inverted', type: 'boolean', default: 'false', description: '使用反色通知样式。' },
  { name: 'ui', type: 'Partial<ToastUi>', default: '-', description: '覆盖当前通知各个 slot 的类名。' },
  { name: 'onDismiss', type: '(toast: ToastT) => void', default: '-', description: '手动关闭通知时触发。' },
  { name: 'onAutoClose', type: '(toast: ToastT) => void', default: '-', description: '通知因到达时长而自动关闭时触发。' },
  { name: 'testId', type: 'string', default: '-', description: '透传到通知元素上的测试 id。' }
]"/>

### toast.promise 数据

<DataTable preset="props" :data="[
  { name: 'loading', type: 'VNode | string', default: '-', description: 'Promise pending 时显示的消息。' },
  { name: 'success', type: 'ToastPromiseResolver<ToastPromiseResult | VNode | string, T>', default: '-', description: 'Promise resolve 后使用的内容或解析函数。' },
  { name: 'error', type: 'ToastPromiseResolver<ToastPromiseResult | VNode | string>', default: '-', description: 'Promise reject 后使用的内容或解析函数。' },
  { name: 'description', type: 'ToastPromiseResolver<VNode | string, T>', default: '-', description: '可选的共享描述内容或描述解析函数。' },
  { name: 'finally', type: '() => void | Promise<void>', default: '-', description: 'Promise 流程结束后触发。' },
  { name: 'id / position / duration / dismissible / richColor / inverted / ui', type: '与通知选项一致', default: '-', description: '`toast.promise` 同样支持这组通用通知选项。' }
]"/>

### SToastProvider 属性

<DataTable preset="props" :data="[
  { name: 'id', type: 'string', default: '-', description: '唯一的 provider id，可配合 `toast(..., { toasterId })` 使用。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '控制内置通知 UI 的宽度、间距和排版。' },
  { name: 'ui', type: 'ToastUi', default: '-', description: '覆盖内置通知 UI 各个 slot 的类名。' },
  { name: 'position', type: 'ToastPosition', default: '`top-right`', description: '新通知的默认显示位置。' },
  { name: 'hotkey', type: 'string[]', default: '`[\'altKey\', \'KeyT\']`', description: '聚焦首个活动通知分组的快捷键。' },
  { name: 'containerAriaLabel', type: 'string', default: '`Notifications`', description: '通知区域的基础 aria 标签。' },
  { name: 'customAriaLabel', type: 'string', default: '-', description: '完全覆盖自动生成的 aria 标签。' },
  { name: 'dir', type: '`ltr` | `rtl`', default: '继承全局方向', description: '通知 provider 的方向覆盖。' },
  { name: 'duration', type: 'number', default: '`4000`', description: '默认自动关闭时长，单位毫秒。' },
  { name: 'gap', type: 'number', default: '`12`', description: '堆叠通知之间的间距。' },
  { name: 'offset', type: 'ToastOffset', default: '`24`', description: '通知视口距离屏幕边缘的偏移量，也支持按方向分别配置。' },
  { name: 'visibleCounts', type: 'number', default: '`3`', description: '每个位置最多显示多少条通知，超出后折叠为堆叠。' },
  { name: 'defaultExpanded', type: 'boolean', default: '`false`', description: '是否默认展开堆叠通知。' },
  { name: 'swipeDirections', type: 'SwipeDirection[]', default: '根据位置自动推断', description: '允许用于关闭通知的滑动方向。' },
  { name: 'showIcon', type: 'boolean', default: '`true`', description: '内置通知是否默认显示类型图标。' },
  { name: 'showClose', type: 'boolean', default: '`true`', description: '内置通知是否默认显示关闭按钮。' },
  { name: 'icons', type: 'Partial<Record<ToastIconType, IconValue>>', default: '内置图标映射', description: '覆盖 `info`、`success`、`warning`、`error`、`loading` 和 `close` 的默认图标。' },
  { name: 'toastProps / wrapperProps / contentProps / titleProps / descriptionProps / iconProps / footerProps / actionProps / cancelProps / closeProps', type: 'HTMLAttributes / LiHTMLAttributes', default: '-', description: '透传给内置通知各个 slot 的属性。' }
]"/>

## 类型

<UnionType name="ToastType" description="通知类型" type="'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'" />

<UnionType name="ToastPosition" description="通知位置" type="'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'" />
