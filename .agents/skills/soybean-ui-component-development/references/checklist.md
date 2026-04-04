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

## Playground 示例 (`playground/examples/{component}/`)

- [ ] 目录已创建，文件名为 kebab-case
- [ ] `index.vue` 用 `<SCard title="{Name}" split :ui="{ content: 'flex-c gap-4' }">` 包裹所有子示例
- [ ] 每个特性对应独立 `.vue` 文件（`basic.vue`、`color.vue`、`size.vue` 等）
- [ ] 每个子示例有 `<h3 class="playground-title">` 标题
- [ ] 所有示例从 `@soybeanjs/ui` 导入（非源码路径）
- [ ] 在 playground 中运行 `pnpm dev` 能看到新组件 Tab 并正常渲染

## 文档 (`docs/src/docs/`)

- [ ] 中英文文档各一份：`zh-CN/components/{component}.md` 和 `en/components/{component}.md`
- [ ] 文档包含：概述、用法代码块、演示（playground 代码块）、API 表格
- [ ] `playground` 代码块中的文件名与实际 `playground/examples/{component}/` 下的文件名一一对应
- [ ] `DataTable preset="props"` 包含所有公开 props（含 `class`、`ui`）
- [ ] `DataTable preset="emits"` 包含所有事件
- [ ] `DataTable preset="slots"` 包含所有插槽
- [ ] `TypeTable` 列出 `Ui` 类型的所有字段（与 `{Name}UiSlot` 对应）
- [ ] 中英文内容结构相同，仅语言不同
