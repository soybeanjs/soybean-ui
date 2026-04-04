# 开发校验清单

完成组件开发后逐项确认。

## Headless 层 (`headless/src/components/{component}/`)

- [ ] `types.ts` 使用 `UiClass<{Name}UiSlot>` 定义 `{Name}Ui`（非 `Record<..., ClassValue>`）
- [ ] Props interface extends `/** @vue-ignore */ HTMLAttributes`（或具体 HTML 属性类型）
- [ ] Context 中所有值都是响应式（`ComputedRef` 或 `ShallowRef`），使用 `transformPropsToContext` 转换
- [ ] `context.ts` 导出 `provide{Name}Ui`（`use{Name}Ui` 仅内部用，不导出）
- [ ] 所有 SFC 通过 `use{Name}Ui('root')` 或 `use{Name}Ui()` 获取类名，绑定到 `:class`
- [ ] 受控/非受控 state 通过 `useControllableState` 处理
- [ ] 无任何 `<style>` 块、无 UnoCSS 类名、无内联样式
- [ ] 无 `@soybeanjs/ui` 导入（循环依赖）
- [ ] `index.ts` 导出了组件、`provide{Name}Ui`、types
- [ ] `headless/src/index.ts` 已添加 re-export

## UI 层 (`src/components/{component}/`)

- [ ] `variants.ts` **第一行**为 `// @unocss-include`
- [ ] `variants.ts` 的 `slots` key 与 headless `{Name}UiSlot` **完全一致**
- [ ] Props 用 `interface`（非 `type`），包含 `class?: ClassValue`
- [ ] UI 类型从 `@soybeanjs/headless` 导入（非 `@soybeanjs/headless/{component}`）
- [ ] `useOmitProps(props, ['class', 'color', 'size', 'ui', ...])` 包含所有 UI 专属 prop（含 `class`）
- [ ] 多 slot：`mergeSlotVariants(variants, props.ui, { root: props.class })`
- [ ] 单类名：`cn(variants({...}), props.class)`
- [ ] `defineOptions({ name: 'S{Name}' })` ← S 前缀
- [ ] 无业务逻辑、无 ARIA 状态
- [ ] `index.ts` 从 `@soybeanjs/headless/{component}` 子路径 re-export headless 类型
- [ ] `src/index.ts` 已添加 re-export

## TypeScript

- [ ] 无 `as any` / `@ts-ignore` / `@ts-expect-error`
- [ ] 运行 `pnpm typecheck` 无新增报错
- [ ] 运行 `pnpm lint` 无新增报错
