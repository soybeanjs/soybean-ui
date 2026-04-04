# 禁止反模式

## Headless 层

| 反模式                                                      | 原因                                              |
| ----------------------------------------------------------- | ------------------------------------------------- |
| 添加任何样式类（包括 `hidden`、`sr-only`）                  | headless 不负责视觉                               |
| 从 `@soybeanjs/ui` 导入                                     | 循环依赖，构建失败                                |
| 直接操作 DOM（`document.querySelector` 等）                 | 使用 `useForwardElement`                          |
| 在 SFC 中写 `<style>` 或内联 style                          | 同上，headless 无样式                             |
| Context 中存非响应式值（如 `{ disabled: props.disabled }`） | 不会随 props 更新；应用 `transformPropsToContext` |
| 导出 `use{Name}Ui`（仅供内部组件）                          | 暴露了内部实现；仅导出 `provide{Name}Ui`          |

## UI 层

| 反模式                                                   | 原因                                                      |
| -------------------------------------------------------- | --------------------------------------------------------- |
| 在 UI 层放 ARIA 属性或状态逻辑                           | 属于 headless 职责                                        |
| 重新定义 headless 中已有的 prop                          | 应用 `extends` 而非重复声明                               |
| `variants.ts` 缺少 `// @unocss-include`                  | UnoCSS 无法扫描，类名不生成（无报错，样式静默失效）       |
| `slots` key 与 `UiSlot` 不一致                           | 运行时样式注入失败，无任何报错                            |
| 组件名缺少 `S` 前缀                                      | 违反命名约定，影响 tree-shaking 与文档                    |
| `useOmitProps` 遗漏 `class`                              | `class` 会传给 headless 组件，造成重复绑定或覆盖          |
| `mergeSlotVariants` 第三参数不传 `{ root: props.class }` | 用户传入的 `class` prop 不生效                            |
| 从 `@soybeanjs/headless`（根路径）re-export 所有类型     | 不精确；应从 `@soybeanjs/headless/{component}` 子路径导入 |

## 全层通用

| 反模式                                       | 原因                                                        |
| -------------------------------------------- | ----------------------------------------------------------- |
| `as any` / `@ts-ignore` / `@ts-expect-error` | 严格 TypeScript 规范（唯一例外在 `use-ui-context.ts` 内部） |
| 原生 CSS/SCSS                                | 仅使用 UnoCSS 工具类                                        |
| 绝对路径跨包引用                             | 使用 package 别名（`@soybeanjs/headless`）或相对路径        |
