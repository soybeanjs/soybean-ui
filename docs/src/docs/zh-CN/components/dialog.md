# 对话框

## 概述

用于展示模态内容的对话框组件。

`SDialog` 适合在模板中声明式使用，`dialog(...)` 则提供命令式创建弹窗的能力，适合警告、确认等场景。

使用命令式 `dialog(...)` 之前，需要在应用根部附近挂载一次 `SDialogProvider`。

## 用法

### 声明式用法

```vue
<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDialog v-model:open="open" title="Edit Profile" description="Make changes to your profile here.">
    <template #trigger>
      <SButton variant="outline">Edit Profile</SButton>
    </template>
    <div class="grid gap-4 py-4">
      <!-- Form content -->
    </div>
    <template #footer>
      <SButton @click="open = false">Save changes</SButton>
    </template>
  </SDialog>
</template>
```

### 命令式 API

```vue
<script setup lang="ts">
import { h } from 'vue';
import { SButton, SDialogProvider, dialog } from '@soybeanjs/ui';

function openWarningDialog() {
  dialog.warning('Delete Project', {
    description: 'This action cannot be undone.',
    content: h('div', 'Please confirm before continuing.'),
    confirmText: 'Delete'
  });
}
</script>

<template>
  <SDialogProvider />

  <SButton color="warning" @click="openWarningDialog">Open Dialog</SButton>
</template>
```

## 演示

```playground
base
footer
state
prevent
pure
dialog-api
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: '受控打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '非受控模式下的默认打开状态。' },
  { name: 'modal', type: 'boolean', default: 'true', description: '是否阻止弹窗外部交互。' },
  { name: 'isAlert', type: 'boolean', default: 'false', description: '是否以警告对话框语义渲染。' },
  { name: 'alertType', type: 'DialogAlertType', default: '-', description: '警告对话框使用的语义类型。' },
  { name: 'title', type: 'string', default: '-', description: '对话框标题。' },
  { name: 'description', type: 'string', default: '-', description: '对话框描述。' },
  { name: 'icon', type: 'IconValue', default: '-', description: '标题前显示的图标。' },
  { name: 'showClose', type: 'boolean', default: 'true', description: '是否显示内置关闭按钮。' },
  { name: 'pure', type: 'boolean', default: 'false', description: '仅渲染弹窗外壳，不渲染内置头部和底部布局。' },
  { name: 'cancelText', type: 'string', default: '`Cancel`', description: '内置取消按钮的兜底文案。' },
  { name: 'confirmText', type: 'string', default: '`Confirm`', description: '内置确认按钮的兜底文案。' },
  { name: 'showCancel', type: '`onlyWarning` | boolean', default: '`onlyWarning`', description: '是否渲染内置取消操作。' },
  { name: 'showConfirm', type: 'boolean', default: '`isAlert` 为 `true` 时默认启用', description: '是否渲染内置确认操作。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '对话框尺寸。' },
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
  { name: 'open-auto-focus', parameters: '(event: Event) => void', description: '焦点移动到对话框时触发。' },
  { name: 'close-auto-focus', parameters: '(event: Event) => void', description: '焦点移回触发器时触发。' },
  { name: 'escape-key-down', parameters: '(event: KeyboardEvent) => void', description: '按下 Escape 键时触发。' },
  { name: 'pointer-down-outside', parameters: '(event: PointerDownOutsideEvent) => void', description: '指针在外部按下时触发。' },
  { name: 'interact-outside', parameters: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void', description: '在外部发生交互时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ open: boolean; close: () => void }', description: '用于打开对话框的触发元素。' },
  { name: 'default', parameters: '{ open: boolean; close: () => void }', description: '弹窗主体内容。' },
  { name: 'title', parameters: '{ open: boolean; close: () => void }', description: '自定义标题内容。' },
  { name: 'description', parameters: '{ open: boolean; close: () => void }', description: '自定义描述内容。' },
  { name: 'close', parameters: '-', description: '内置关闭按钮的自定义内容。' },
  { name: 'footer', parameters: '{ open: boolean; close: () => void }', description: '自定义底部内容。' },
  { name: 'cancel', parameters: '-', description: '内置取消操作的自定义内容。' },
  { name: 'confirm', parameters: '-', description: '内置确认操作的自定义内容。' }
]"/>

### dialog 方法

<DataTable preset="props" :data="[
  { name: 'dialog(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: '创建或更新默认对话框。复用 `options.id` 可以更新已有实例。' },
  { name: 'dialog.success(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: '创建成功态对话框。' },
  { name: 'dialog.info(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: '创建信息态对话框。' },
  { name: 'dialog.warning(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: '创建警告态对话框。' },
  { name: 'dialog.error(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: '创建错误态对话框。' },
  { name: 'dialog.getDialogs()', type: '() => DialogT[]', default: '-', description: '获取当前仍处于激活状态的对话框。' },
  { name: 'dialog.getHistory()', type: '() => DialogT[]', default: '-', description: '获取内部对话框历史记录。' }
]"/>

### dialog 配置项

<DataTable preset="props" :data="[
  { name: 'id', type: 'number | string', default: 'auto', description: '稳定的对话框 id，可用于更新已有实例。' },
  { name: 'open', type: 'boolean', default: 'true', description: '创建时是否默认打开。' },
  { name: 'description', type: 'VNode | string', default: '-', description: '标题下方的辅助描述。' },
  { name: 'icon', type: 'IconValue', default: '-', description: '标题前显示的图标。' },
  { name: 'content', type: 'VNode', default: '-', description: '额外的主体内容。' },
  { name: 'footer', type: 'VNode', default: '-', description: '自定义底部内容。' },
  { name: 'cancelText', type: 'VNode | string', default: '-', description: '覆盖内置取消文案。' },
  { name: 'confirmText', type: 'VNode | string', default: '-', description: '覆盖内置确认文案。' },
  { name: 'showCancel', type: '`onlyWarning` | boolean', default: '-', description: '是否渲染内置取消操作。' },
  { name: 'showConfirm', type: 'boolean', default: '-', description: '是否渲染内置确认操作。' },
  { name: 'ui', type: 'Partial<DialogUi>', default: '-', description: '覆盖当前对话框的槽位类名。' },
  { name: 'onCancel', type: '(event: MouseEvent) => void', default: '-', description: '点击内置取消按钮时触发。' },
  { name: 'onConfirm', type: '(event: MouseEvent) => void', default: '-', description: '点击内置确认按钮时触发。' },
  { name: 'onDismiss', type: '(dialog: DialogT) => void', default: '-', description: 'Provider 销毁该对话框时触发。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'DialogUi',
    description: '自定义样式类。',
    fields: [
      { name: 'overlay', type: 'string', description: '遮罩层类名。' },
      { name: 'popup', type: 'string', description: '弹窗容器类名。' },
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
