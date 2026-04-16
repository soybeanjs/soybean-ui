---
applyTo: 'test/specs/components/**/*.ts'
---

# SoybeanUI 组件测试规范

测试栈：Vitest + `@vue/test-utils` + `axe-core`，运行环境为 `happy-dom`。

组件主体、导出和主要交互稳定后，再补测试；不要在 API 还未稳定时先堆测试样板。

测试顺序应当跟随组件稳定度，而不是反过来驱动未定稿的 API。

## 测试基本规则

- 所有 `mount()` 默认加 `attachTo: document.body`
- 每个 `it()` 内独立挂载和卸载，不共享 wrapper
- 每个 `it()` 结束前调用 `wrapper.unmount()`

## 推荐 describe 结构

- `rendering`
- `{state} state`
- `disabled state`
- `accessibility`

## 编写顺序

1. 先补 `rendering`
2. 再补 `state`
3. 再补 `disabled state`
4. 最后补 `accessibility`

## rendering

- 覆盖默认 slot 渲染
- 覆盖自定义 class
- 覆盖关键子元素存在性

## state

- `modelValue` 或等价状态要正确反映到 `aria-*` / `data-state`
- 交互后要验证对应 emit，如 `update:modelValue`

## disabled state

断言方式要与组件真实实现一致：

- `aria-disabled="true"`
- `element.disabled === true`
- `data-disabled`

同时验证禁用时不触发 emit。

## 交互触发方式

- Button、Checkbox、Switch、AccordionTrigger 通常使用 `click`
- TabsTrigger 使用 `mousedown` 且 `button: 0`
- Popover、Tooltip 等弹层触发方式按实现检查 `click` 或 `mouseenter`

## accessibility

- 使用 `getA11yViolations` 检查主要使用场景无 violation
- 对 `role="switch"`、icon-only button、无可见文字控件等场景，要补 `aria-label`
- 需要真实 label 关系的场景，用包装组件模拟真实使用上下文

## 质量要求

- 测试断言应对齐组件真实行为，不写脱离实现的理想化断言
- 新增或修复组件能力时，同步补对应测试
- 新组件从 0 到 1 默认需要测试，不要把测试留成后续补债
