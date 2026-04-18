# InputOtp

## 概述

InputOtp 是一个基于真实原生 input 的验证码输入组件。它保留了 vue-input-otp 中成熟的选区、粘贴、移动端自动填充和密码管理器适配行为，同时提供 SoybeanUI 默认样式和可完全自定义的 scoped slot。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';

const otp = ref('');
</script>

<template>
  <SInputOtp v-model="otp" :maxlength="6" placeholder="123456" aria-label="验证码" />
</template>
```

## 演示

```playground
basic
placeholder
custom-slot
disabled
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器自定义类名。' },
  { name: 'modelValue', type: 'string', default: '-', description: '受控 OTP 值。' },
  { name: 'defaultValue', type: 'string', default: '`\'\'`', description: '非受控初始 OTP 值。' },
  { name: 'maxlength', type: 'number', default: '-', description: 'OTP 槽位数量。', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: '按位展示的占位字符。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用 OTP 输入。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'autocomplete', type: 'string', default: '`one-time-code`', description: '传递给原生 input 的 autocomplete 值。' },
  { name: 'inputmode', type: 'InputOtpInputMode', default: '`numeric`', description: '移动端虚拟键盘模式。' },
  { name: 'align', type: 'Align', default: '`start`', description: '隐藏原生 input 使用的文本对齐方式，可选值为 `start`、`center`、`end`。' },
  { name: 'pattern', type: 'string | RegExp', default: '-', description: '用于校验完整 OTP 字符串的模式。' },
  { name: 'pasteTransformer', type: '(pasted: string | undefined) => string', default: '-', description: '粘贴前对剪贴板文本做转换。' },
  { name: 'pushPasswordManagerStrategy', type: 'InputOtpPushPasswordManagerStrategy', default: '`increase-width`', description: '密码管理器徽章处理策略。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉槽位尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '默认可视结构的自定义类名。' }
]"/>

> 说明：`SInputOtp` 还支持 `name`、`required`、`autofocus`、`aria-label` 等原生 input 属性。

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'OTP 值变化时触发。' },
  { name: 'complete', parameters: '(value: string) => void', description: 'OTP 长度达到 `maxlength` 时触发。' },
  { name: 'input', parameters: '(value: string) => void', description: '每次合法输入更新时触发。' },
  { name: 'change', parameters: '(event: Event) => void', description: '透传原生 change 事件。' },
  { name: 'select', parameters: '(event: Event) => void', description: '透传原生 select 事件。' },
  { name: 'focus', parameters: '(event: FocusEvent) => void', description: '透传原生 focus 事件。' },
  { name: 'blur', parameters: '(event: FocusEvent) => void', description: '透传原生 blur 事件。' },
  { name: 'mouseover', parameters: '(event: MouseEvent) => void', description: '透传原生 mouseover 事件。' },
  { name: 'mouseleave', parameters: '(event: MouseEvent) => void', description: '透传原生 mouseleave 事件。' },
  { name: 'paste', parameters: '(event: ClipboardEvent) => void', description: '透传原生 paste 事件。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'InputOtpRootSlotProps', description: '自定义全部可见 OTP 槽位的渲染。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '默认可视结构的自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'positioner', type: 'string', description: '隐藏 input 覆盖层容器类名。' },
      { name: 'input', type: 'string', description: '真实原生 input 类名。' },
      { name: 'group', type: 'string', description: '网格包裹层类名。' },
      { name: 'slot', type: 'string', description: '单个 OTP 槽位类名。' },
      { name: 'char', type: 'string', description: '已填字符类名。' },
      { name: 'placeholder', type: 'string', description: '占位字符类名。' },
      { name: 'caret', type: 'string', description: '伪光标类名。' }
    ]
  },
  {
    name: 'InputOtpRootSlotProps',
    description: 'scoped slot 负载。',
    fields: [
      { name: 'slots', type: 'InputOtpSlotProps[]', description: '每个槽位的渲染状态。' },
      { name: 'isFocused', type: 'boolean', description: '隐藏原生 input 是否聚焦。' },
      { name: 'isHovering', type: 'boolean', description: '当前是否处于 hover 状态。' }
    ]
  },
  {
    name: 'InputOtpSlotProps',
    description: '单个槽位的渲染状态。',
    fields: [
      { name: 'char', type: 'string | null', description: '当前槽位字符。' },
      { name: 'placeholderChar', type: 'string | null', description: '当前占位字符。' },
      { name: 'isActive', type: 'boolean', description: '槽位是否处于选中或活动状态。' },
      { name: 'hasFakeCaret', type: 'boolean', description: '槽位是否显示伪光标。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="InputOtpInputMode" description="输入模式类型" type="'numeric' | 'text'" />

<UnionType name="Align" description="输入文本对齐类型" type="'start' | 'center' | 'end'" />

<UnionType name="InputOtpPushPasswordManagerStrategy" description="密码管理器徽章处理策略" type="'increase-width' | 'none'" />
