# 气泡确认框

## 概述

基于 Popover 的确认框组件，用于轻量级的二次确认操作。

## 用法

```vue
<script setup lang="ts">
import { SPopconfirm, SButton } from '@soybeanjs/ui';

function handleConfirm() {
  console.log('Confirmed!');
}

function handleCancel() {
  console.log('Cancelled!');
}
</script>

<template>
  <SPopconfirm
    title="删除项目?"
    description="此操作无法撤销。您确定要删除此项目吗?"
    type="destructive"
    :before-confirm="handleConfirm"
    :before-cancel="handleCancel"
  >
    <template #trigger>
      <SButton color="destructive">删除</SButton>
    </template>
  </SPopconfirm>
</template>
```

## 演示

```playground
base
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: `'md'`, description: '确认框尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '弹出元素的类名。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控的打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '默认打开状态。' },
  { name: 'modal', type: 'boolean', default: 'false', description: '是否为模态框。' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: '首选弹出位置。' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: '是否显示箭头。' },
  { name: 'type', type: `'destructive' | 'success' | 'warning' | 'info'`, default: `'info'`, description: '确认框类型，决定图标颜色。' },
  { name: 'showIcon', type: 'boolean', default: 'true', description: '是否显示图标。' },
  { name: 'title', type: 'string', default: '-', description: '标题文本。' },
  { name: 'description', type: 'string', default: '-', description: '描述文本。' },
  { name: 'content', type: 'string', default: '-', description: '默认插槽的内容文本。' },
  { name: 'cancelText', type: 'string', default: `'Cancel'`, description: '取消按钮文本。' },
  { name: 'confirmText', type: 'string', default: `'Confirm'`, description: '确认按钮文本。' },
  { name: 'showCancel', type: `'onlyWarning' | boolean`, default: `'onlyWarning'`, description: `是否显示取消按钮。'onlyWarning' 仅在 type 为 warning 时显示。` },
  { name: 'beforeCancel', type: '() => MaybePromise<boolean | void>', default: '-', description: '取消前的回调。返回 false 可阻止关闭。' },
  { name: 'beforeConfirm', type: '() => MaybePromise<boolean | void>', default: '-', description: '确认前的回调。返回 false 可阻止关闭。' },
  { name: 'confirmProps', type: 'PopconfirmConfirmProps', default: '-', description: '确认按钮的属性。' },
  { name: 'cancelProps', type: 'PopconfirmCancelProps', default: '-', description: '取消按钮的属性。' },
  { name: 'positionerProps', type: 'PopoverPositionerProps', default: '-', description: '定位元素的属性。' },
  { name: 'popupProps', type: 'PopoverPopupProps', default: '-', description: '弹出元素的属性。' },
  { name: 'triggerProps', type: 'PopoverTriggerProps', default: '-', description: '触发元素的属性。' },
  { name: 'closeProps', type: 'PopoverCloseProps', default: '-', description: '关闭元素的属性。' },
  { name: 'portalProps', type: 'PopoverPortalProps', default: '-', description: '传送门元素的属性。' },
  { name: 'arrowProps', type: 'PopoverArrowProps', default: '-', description: '箭头元素的属性。' },
  { name: 'headerProps', type: 'PopconfirmHeaderProps', default: '-', description: '头部元素的属性。' },
  { name: 'titleProps', type: 'PopconfirmTitleProps', default: '-', description: '标题元素的属性。' },
  { name: 'descriptionProps', type: 'PopconfirmDescriptionProps', default: '-', description: '描述元素的属性。' },
  { name: 'contentProps', type: 'PopconfirmContentProps', default: '-', description: '内容元素的属性。' },
  { name: 'footerProps', type: 'PopconfirmFooterProps', default: '-', description: '底部元素的属性。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' },
  { name: 'close', parameters: '() => void', description: '确认框关闭时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '触发确认框的元素。' },
  { name: 'title', parameters: '{ close: () => void }', description: '自定义标题内容。' },
  { name: 'description', parameters: '{ close: () => void }', description: '自定义描述内容。' },
  { name: 'default', parameters: '{ close: () => void }', description: '位于描述和底部之间的自定义内容。' },
  { name: 'footer', parameters: '{ close: () => void }', description: '自定义底部操作按钮区域。' },
  { name: 'close', parameters: '-', description: '自定义关闭按钮元素。' }
]"/>

### 类型

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'positioner', type: 'string', description: '定位容器类名。' },
      { name: 'popup', type: 'string', description: '弹出内容容器类名。' },
      { name: 'arrow', type: 'string', description: '箭头元素类名。' },
      { name: 'header', type: 'string', description: '头部区域类名。' },
      { name: 'title', type: 'string', description: '标题类名。' },
      { name: 'description', type: 'string', description: '描述类名。' },
      { name: 'content', type: 'string', description: '内容区域类名。' },
      { name: 'footer', type: 'string', description: '底部操作区类名。' }
    ]
  }
]"/>

<UnionType name="ClassValue" description="类名值类型" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="PopconfirmType" description="确认框类型" type="'destructive' | 'success' | 'warning' | 'info'" />

<UnionType name="Placement" description="弹出位置选项" type="'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'" />
