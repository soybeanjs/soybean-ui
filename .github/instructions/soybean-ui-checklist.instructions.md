---
applyTo: '{headless/src/components,src/components}/**/*.{ts,vue}'
---

# SoybeanUI 组件任务收尾清单

仅在组件开发任务收尾阶段应用本文件。

如果当前还在判模式、找参照、拆分层或补主体实现，本文件只可作预览，不作为当前执行顺序。

按逆序检查：先验证，再看交付面，再看出口，最后回看分层边界。未通过上一组前，不继续勾下一组。

## 验证

- 已运行 `pnpm typecheck`
- 已运行 `pnpm lint`
- 已运行相关 `pnpm test` 或定向组件测试
- 若有未运行项，已明确记录原因

## 交付面

- playground 示例可以说明主要公开能力
- 中英文文档结构同步
- `docs/src/constants/menus.ts` 已更新
- 若公开 API 有变化，已运行 `pnpm sui api`
- 非英文 API 描述已通过 `pnpm sui api-translate -- --locale <locale>` 同步，或已说明暂未翻译原因
- 若本轮改动触达 changelog 映射、组件版本日志展示或 release 页面，已运行 `pnpm sui changelog`
- 非英文 changelog 文案已通过 `pnpm sui changelog-translate -- --locale <locale>` 同步，或已说明暂未翻译原因
- 组件测试覆盖 rendering、state、disabled、accessibility 核心场景

## 出口与生成文件

- `headless/src/index.ts` 与 `src/index.ts` 已更新
- `pnpm sui headless` 已运行（更新 `headless/src/constants/components.ts` 与 `headless/src/namespaced/index.ts`）
- `pnpm sui ui` 已运行（更新 `src/constants/components.ts`）
- 组件名称数据、命名空间数据与 API 生成产物都来自脚本，未手动改生成文件

## Headless

- `types.ts`、`context.ts`、SFC 和 `index.ts` 符合分层规范
- Context 中的值保持响应式
- 无 UI 样式、无 `@soybeanjs/ui` 导入
- 稳定聚合结构已正确下沉为 `{Name}Compact`
- 分片根元素带有正确的 `data-soybean-{name}` 属性

## UI

- `variants.ts` 第一行是 `// @unocss-include`
- `slots` key 与 headless `UiSlot` 一致
- `mergeSlotVariants` 正确合并 `props.class`
- `useOmitProps` / `usePickProps` 使用有明确理由
- 无 ARIA 逻辑、无业务语义泄漏到 UI 层

## A11y 与 RTL

- ARIA、role、键盘交互都在 headless
- 状态对外正确反映到 `aria-*` 与 `data-state`
- 方向性组件已补齐 `dir` 透传与 RTL 样式翻转

## 结果说明

- 若本轮新增了新的 composable、shared helper 或类型，而不是复用仓库现有实现或 `@vueuse/core`，已在结果总结中明确说明原因

若有未完成项，必须在交付说明中明确列出。
