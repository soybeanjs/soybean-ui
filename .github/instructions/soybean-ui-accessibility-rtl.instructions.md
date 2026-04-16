---
applyTo: '**/*.{ts,vue}'
---

# SoybeanUI A11y 与 RTL 规范

仅在编辑组件相关代码时应用本文件。

这个文件在组件开发的 headless 与 UI 阶段都要回看一次：先保证语义正确，再保证 RTL 呈现正确。

在 headless 阶段先完成 a11y 语义，在 UI 阶段再检查 RTL 呈现，不要倒过来做。

## A11y 原则

- 所有 ARIA、role、tabindex、键盘交互都属于 headless 层职责
- UI 层只负责视觉样式，不添加 ARIA 逻辑

## ARIA 与状态反射

- 按对应 WAI-ARIA APG 模式设置 `role` 和 `aria-*`
- 状态通过 `aria-expanded`、`aria-selected`、`aria-checked`、`aria-disabled` 等反射
- 同时通过 `data-state` 暴露状态给样式和测试使用
- 不要只用 class 传状态

## ID 关联

- `aria-labelledby` 与 `aria-controls` 通过 Vue 的 `useId()` 生成唯一 id 再关联

## 装饰性元素

- 纯装饰图标或重复内容使用 `aria-hidden="true"`

## 键盘与焦点

- 所有可交互元素必须能通过键盘操作
- 复杂组件要维护合理焦点顺序
- 弹层、对话框等复杂交互组件需要正确的焦点陷阱或焦点回收策略

## RTL 规则

方向相关组件必须同时处理 headless 与 UI 两层：

- `types.ts` 添加 `dir?: Direction`
- `context.ts` 通过 `useDirection(params.dir)` 解析方向
- 根元素绑定 `:dir="dir"`
- UI 层在 `variants.ts` 中默认优先使用 UnoCSS 逻辑属性和逻辑对齐类，如 `start-*`、`end-*`、`ms-*`、`me-*`、`ps-*`、`pe-*`、`text-start`、`text-end`
- 只有在逻辑属性无法表达的场景下，才补充 `rtl:` 修饰符

## 默认写法

- 能写逻辑属性时，不要再写 `left-*`、`right-*`、`ml-*`、`mr-*`、`pl-*`、`pr-*`、`text-left`、`text-right`
- 定位优先使用 `start-*` / `end-*`
- 间距优先使用 `ms-*` / `me-*` / `ps-*` / `pe-*`
- 文本对齐优先使用 `text-start` / `text-end`
- 只有布局方向或图标方向这类逻辑属性无法覆盖的场景，再使用 `rtl:` 修饰符

## 常见替换

- `left-0` -> `start-0`
- `right-0` -> `end-0`
- `left-2` -> `start-2`
- `ml-2` -> `ms-2`
- `mr-2` -> `me-2`
- `pl-4` -> `ps-4`
- `pr-4` -> `pe-4`
- `text-left` -> `text-start`
- `text-right` -> `text-end`
- `inset-x-0` 这类天然与方向无关的写法可以直接保留
- 水平箭头、chevron、特定运动方向等逻辑属性无法覆盖的场景，仍然需要 `rtl:rotate-180`、`rtl:flex-row-reverse`、`rtl:-translate-x-*` 这类显式 RTL 规则

## 自检

- UI 层是否仍然没有 ARIA 逻辑
- 状态是否同时反映到 `aria-*` 与 `data-state`
- 是否已经优先使用 `start-*`、`end-*`、`ms-*`、`me-*`、`ps-*`、`pe-*`、`text-start`、`text-end`
- 带方向性的布局、图标、定位、动画是否在 RTL 下正确翻转
