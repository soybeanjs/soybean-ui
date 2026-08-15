# 反馈操作

## 概述

`SxActionsFeedback` 是点赞/点踩反馈组件，通过两个切换按钮让用户评价 AI 回复。点击当前已激活的极性会清除选择，回到 `null`。

用于 AI 消息底部收集赞/踩反馈。当前值通过 `value` 属性受控（`'like'` / `'dislike'` / `null`），变化时 `onChange` 属性与 `change` 事件都会触发。

`SxActionsFeedback` 属于操作族，与 `SxActions`（通用工具栏）、`SxActionsCopy`（复制操作）、`SxFolder`（可折叠文件夹）同级。

## 用法

<UsageCode component="actions-feedback" />

## 特性

- 👍👎 点赞 / 点踩 — 两个切换按钮表达反馈极性
- 🔄 切换语义 — 点击当前激活的极性会将状态清空为 `null`（取消）
- 🧩 自定义图标 — `like-icon` 与 `dislike-icon` 插槽接收 `{ active }`，支持状态感知渲染
- 📞 双重输出 — `onChange` 属性与 `change` 事件在变化时都会触发
- ♿ 无障碍 — 每个按钮带有 `aria-pressed` 与 `data-active` 属性
- 🚫 禁用状态 — `disabled` 会完全阻止两个按钮
- 🔒 类型安全 — `FeedbackValue` 类型为 `'like' | 'dislike'`

## 演示

<PlaygroundGallery component="actions-feedback" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'value', type: `'like' | 'dislike' | null`, default: 'null', description: '当前激活的反馈（若有）。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '按钮是否禁用。' },
  { name: 'onChange', type: '(value: FeedbackValue | null) => void', default: '-', description: '反馈给出时触发的回调；`null` 表示清除激活状态。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '[value: FeedbackValue | null]', description: '反馈给出时触发；`null` 表示清除激活状态。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'like-icon', parameters: '{ active: boolean }', description: '点赞按钮的自定义图标。接收点赞状态是否激活。' },
  { name: 'dislike-icon', parameters: '{ active: boolean }', description: '点踩按钮的自定义图标。接收点踩状态是否激活。' },
]"/>

## 注意事项

### 架构与行业对标

`SxActionsFeedback` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：它是自包含的展示组件，不依赖任何 headless 组合式函数。SFC 负责 `actionsFeedbackVariants` 配方接线、应用切换语义并透传插槽。反馈极性采用无障碍友好的 `aria-pressed` 切换模式，而非单选按钮组。

| 能力                         | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 点赞/点踩反馈                |     ✅      |       —       |     —     |       ✅        |
| 点击切换以清除选择           |     ✅      |       —       |     —     |        —        |
| 带 `active` 状态的自定义图标 |     ✅      |       —       |     —     |        —        |
| `aria-pressed` 切换语义      |     ✅      |       —       |     —     |        —        |
| 受控 `value` 属性            |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- 组件是**受控的**——你必须保持 `value` 属性同步（如监听 `change` 并更新自己的 ref），否则视觉状态不会更新。
- 点击已激活的极性会将反馈清空为 `null`——这是有意的切换行为。
- `onChange` 与 `change` 会以相同值触发。建议只使用其一，避免重复的处理函数。
- `disabled` 会阻止 `onChange` 与 `change` 触发。

## 常见问题

### 如何作为受控组件使用？

用一个 `ref` 与 `change` 事件保持同步：

```vue
<SxActionsFeedback :value="value" @change="value = $event" />
```

### 如何清除反馈？

点击当前已激活的极性会将值设为 `null`（即无反馈）。点击相反极性会切换选择。

### 能否使用自定义图标？

可以——使用 `like-icon` 与 `dislike-icon` 插槽。两者都接收 `{ active }`，可在极性选中时替换图标。

### `onChange` 与 `change` 事件有什么区别？

两者携带相同的值。`onChange` 是回调属性；`change` 是事件。按你的代码风格选择其一。

### 如何禁用反馈按钮？

将 `disabled` 设为 `true`。两个按钮都以 `disabled` 渲染，且不会触发任何变化事件。
