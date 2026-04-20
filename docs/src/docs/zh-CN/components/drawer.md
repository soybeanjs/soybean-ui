# 抽屉

## 概述

从屏幕边缘滑出的抽屉面板组件，用于承载附加内容或操作。它复用了 `SDialog` 的声明式 API 和插槽约定，并通过 `side` 控制进入方向。

## 用法

```vue
<script setup lang="ts">
import { SDrawer, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDrawer v-model:open="open" title="Menu" side="left">
    <template #trigger>
      <SButton variant="outline">Open Drawer</SButton>
    </template>
    <div class="py-4">
      <p>Navigation links...</p>
    </div>
  </SDrawer>
</template>
```

## 演示

```playground
side
scroll
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'side', type: `'top' \| 'right' \| 'bottom' \| 'left'`, default: `'right'`, description: '抽屉进入的方向。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '非受控模式下的默认打开状态。' },
  { name: 'modal', type: 'boolean', default: 'true', description: '是否阻止抽屉外部交互。' },
  { name: 'isAlert', type: 'boolean', default: 'false', description: '是否以警告对话框语义渲染。' },
  { name: 'alertType', type: 'DialogAlertType', default: '-', description: '警告抽屉使用的语义类型。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '抽屉尺寸，会根据方向作用于宽度或高度。' },
  { name: 'title', type: 'string', default: '-', description: '抽屉标题。' },
  { name: 'description', type: 'string', default: '-', description: '抽屉描述。' },
  { name: 'icon', type: 'IconValue', default: '-', description: '标题前显示的图标。' },
  { name: 'showClose', type: 'boolean', default: 'true', description: '是否显示内置关闭按钮。' },
  { name: 'pure', type: 'boolean', default: 'false', description: '仅渲染抽屉外壳，不渲染内置头部和底部布局。' },
  { name: 'cancelText', type: 'string', default: '`Cancel`', description: '内置取消按钮的兜底文案。' },
  { name: 'confirmText', type: 'string', default: '`Confirm`', description: '内置确认按钮的兜底文案。' },
  { name: 'showCancel', type: '`onlyWarning` | boolean', default: '`onlyWarning`', description: '是否渲染内置取消操作。' },
  { name: 'showConfirm', type: 'boolean', default: '`isAlert` 为 `true` 时默认启用', description: '是否渲染内置确认操作。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '应用到 popup 槽位的自定义类名。' },
  { name: 'ui', type: 'Partial<DialogUi>', default: '-', description: '自定义槽位类名。' },
  { name: 'triggerProps', type: 'DialogTriggerProps', default: '-', description: '透传给 trigger 槽位的属性。' },
  { name: 'popupProps', type: 'DialogPopupProps', default: '-', description: '透传给 popup 元素的属性。' },
  { name: 'headerProps', type: 'DialogHeaderProps', default: '-', description: '透传给 header 包裹层的属性。' },
  { name: 'contentProps', type: 'DialogContentProps', default: '-', description: '透传给 content 包裹层的属性。' },
  { name: 'footerProps', type: 'DialogFooterProps', default: '-', description: '透传给 footer 包裹层的属性。' },
  { name: 'titleProps', type: 'DialogTitleProps', default: '-', description: '透传给 title 元素的属性。' },
  { name: 'descriptionProps', type: 'DialogDescriptionProps', default: '-', description: '透传给 description 元素的属性。' },
  { name: 'overlayProps', type: 'DialogOverlayProps', default: '-', description: '透传给 overlay 元素的属性。' },
  { name: 'portalProps', type: 'DialogPortalProps', default: '-', description: '透传给 portal 包裹层的属性。' },
  { name: 'closeProps', type: 'DialogCloseProps', default: '-', description: '透传给内置关闭按钮的属性。' },
  { name: 'cancelProps', type: 'DialogCancelProps', default: '-', description: '透传给内置取消按钮的属性。' },
  { name: 'confirmProps', type: 'DialogConfirmProps', default: '-', description: '透传给内置确认按钮的属性。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' },
  { name: 'close', parameters: '(event: MouseEvent) => void', description: '点击内置关闭按钮时触发。' },
  { name: 'cancel', parameters: '(event: MouseEvent) => void', description: '点击内置取消按钮时触发。' },
  { name: 'confirm', parameters: '(event: MouseEvent) => void', description: '点击内置确认按钮时触发。' },
  { name: 'open-auto-focus', parameters: '(event: Event) => void', description: '焦点移动到抽屉时触发。' },
  { name: 'close-auto-focus', parameters: '(event: Event) => void', description: '焦点移回触发器时触发。' },
  { name: 'escape-key-down', parameters: '(event: KeyboardEvent) => void', description: '按下 Escape 键时触发。' },
  { name: 'pointer-down-outside', parameters: '(event: PointerDownOutsideEvent) => void', description: '指针在外部按下时触发。' },
  { name: 'interact-outside', parameters: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void', description: '在外部发生交互时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ open: boolean; close: () => void }', description: '用于打开抽屉的触发元素。' },
  { name: 'default', parameters: '{ open: boolean; close: () => void }', description: '抽屉主体内容。' },
  { name: 'title', parameters: '{ open: boolean; close: () => void }', description: '自定义标题内容。' },
  { name: 'description', parameters: '{ open: boolean; close: () => void }', description: '自定义描述内容。' },
  { name: 'close', parameters: '-', description: '内置关闭按钮的自定义内容。' },
  { name: 'footer', parameters: '{ open: boolean; close: () => void }', description: '自定义底部内容。' },
  { name: 'cancel', parameters: '-', description: '内置取消操作的自定义内容。' },
  { name: 'confirm', parameters: '-', description: '内置确认操作的自定义内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'DialogUi',
    description: '复用自 Dialog 的自定义样式类，其中 `popup` 控制抽屉面板容器。',
    fields: [
      { name: 'overlay', type: 'string', description: '遮罩层类名。' },
      { name: 'popup', type: 'string', description: '抽屉面板容器类名。' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'footer', type: 'string', description: '底部容器类名。' },
      { name: 'title', type: 'string', description: '标题类名。' },
      { name: 'icon', type: 'string', description: '图标类名。' },
      { name: 'description', type: 'string', description: '描述类名。' },
      { name: 'close', type: 'string', description: '关闭按钮类名。' },
      { name: 'cancel', type: 'string', description: '取消按钮类名。' },
      { name: 'confirm', type: 'string', description: '确认按钮类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="DialogAlertType" description="对话框警告类型" type="'default' | 'info' | 'success' | 'warning' | 'error'" />

<UnionType name="Side" description="抽屉方向" type="'top' | 'right' | 'bottom' | 'left'" />
