---
applyTo: 'docs/src/docs/**/*.md'
---

# SoybeanUI 文档规范

在组件 API、导出和 playground 基本稳定后再补文档。

## 文档交付面

- 中文文档：`docs/src/docs/zh-CN/components/{component}.md`
- 英文文档：`docs/src/docs/en/components/{component}.md`

两份文档结构必须一致，只允许文案语言不同。

## 推荐结构

- 一级标题
- 概述
- `## Usage`
- `<UsageCode component="{component}" />`
- `## Demos`
- `<PlaygroundGallery component="{component}" />`
- `## API`
- `<ComponentApi component="{component}" />`

## 编写顺序

1. 先写概述和最小用法
2. 接入 `<UsageCode component="{component}" />` 与 `<PlaygroundGallery component="{component}" />`
3. 接入 `<ComponentApi component="{component}" />`
4. 更新 `docs/src/constants/menus.ts`
5. 若公开 API 有变化，运行 `pnpm gen:api`，并为非英文 locale 运行 `pnpm translate:api:i18n -- --locale <locale>`
6. 若调整了 changelog 映射、release 展示或 changelog locale 模板，运行 `pnpm gen:changelog`，并为非英文 locale 运行 `pnpm translate:changelog:i18n -- --locale <locale>`

## 关键规则

- 组件文档中的 Usage 和 Demos 默认直接写 Vue 组件标签，不再使用 `usage` 或 `playground` fenced block
- `Usage` 段统一使用 `<UsageCode component="{component}" />`
- `Demos` 段统一使用 `<PlaygroundGallery component="{component}" />`
- 只有在确实需要限制展示子集时，才给 `<PlaygroundGallery>` 传 `files`
- playground 子示例即使采用 `NN-name.vue` 文件名，`<UsageCode>` 与 `<PlaygroundGallery>` 传入的示例 key 仍然使用去前缀后的 `name`，例如 `basic`、`size`
- 组件文档中的 `API` 段默认统一使用 `<ComponentApi component="{component}" />`
- `<ComponentApi>` 的 `component` 值默认与组件目录名一致；如果文档文件名与组件导出名不同，也要传真实组件名，例如 `input-number`
- 只有生成式 API 无法覆盖的特殊页面，才允许手写 `DataTable` / `TypeTable` 作为例外
- 组件详情页中的版本日志区块由生成式 changelog 数据提供，不要在 markdown 中手写逐版本更新记录
- 公开 API、类型描述或导出面变化后，必须运行 `pnpm gen:api`
- API 生成产物以脚本输出为准，不要手改 `docs/src/generated/api/` 或 `docs/src/generated/api-locales/`
- changelog 生成产物以脚本输出为准，不要手改 `docs/src/generated/changelog/` 或 `docs/src/generated/changelog-locales/`

## 菜单注册

写完文档后，必须同步更新 `docs/src/constants/menus.ts`：

- 将组件 camelCase key 插入对应分组的 `items`
- 按字母顺序插入

常见分组：

- `general`
- `groupLayout`
- `navigation`
- `forms`
- `dataDisplay`
- `feedback`
- `overlay`
- `utilities`

## 质量要求

- 文档内容要和实际组件实现同步
- `<UsageCode>` 和 `<PlaygroundGallery>` 的 `component` 值要与组件目录名保持一致
- 若 playground 子示例文件带有顺序前缀，文档层仍要使用去前缀后的示例 key，不要把 `01-basic` 这类原始文件名写进文档
- `<ComponentApi>` 的 `component` 值要与真实 API 数据源保持一致
- 文档中的演示展示面要和 `playground/examples/{component}/` 真实文件保持一致
- 标题与 API 内容不要落后于实现
- 新组件默认补齐中英文文档，不要只写单语版本
