---
applyTo: 'docs/src/docs/**/*.md'
---

# SoybeanUI 文档规范

组件 API 和 playground 稳定后，再补文档。

不要在 props、slots、emits、导出入口或 API 生成数据仍频繁变化时先补 API 文档。

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
2. 再接入 `<UsageCode component="{component}" />` 与 `<PlaygroundGallery component="{component}" />`
3. 再接入 `<ComponentApi component="{component}" />`
4. 最后更新 `docs/src/constants/menus.ts`
5. 运行 `pnpm gen:api` 更新 `docs/src/generated/api/` 与 `docs/src/generated/api-locales/` 的英文基线数据
6. 对仓库内除 `en` 之外的 locale 逐个运行 `pnpm translate:api:i18n -- --locale <locale>`，补齐非英文 API 描述

## 关键规则

- 组件文档中的 Usage 和 Demos 默认直接写 Vue 组件标签，不再使用 `usage` 或 `playground` fenced block
- `Usage` 段统一使用 `<UsageCode component="{component}" />`
- `Demos` 段统一使用 `<PlaygroundGallery component="{component}" />`
- 只有在确实需要限制展示子集时，才给 `<PlaygroundGallery>` 传 `files`
- playground 子示例即使采用 `NN-name.vue` 文件名，`<UsageCode>` 与 `<PlaygroundGallery>` 传入的示例 key 仍然使用去前缀后的 `name`，例如 `basic`、`size`
- 组件文档中的 `API` 段默认统一使用 `<ComponentApi component="{component}" />`
- `<ComponentApi>` 的 `component` 值默认与组件目录名一致；如果文档文件名与组件导出名不同，也要传真实组件名，例如 `input-number`
- 不要在普通组件文档里手写 `DataTable` / `TypeTable` 来替代 `<ComponentApi>`
- 只有在生成式 API 无法覆盖的特殊页面或遗留组件文档中，才允许手写 `DataTable` / `TypeTable` 作为例外
- 如果确实手写 API 表格，仍要完整覆盖公开 props、emits、slots，以及必要的 `Ui` 类型信息，内容必须和真实导出保持一致
- `<ComponentApi>` 依赖 `docs/src/generated/api/*.json` 与 `docs/src/generated/api-locales/*.json`；公共 API、类型描述或导出面变化后，必须运行 `pnpm gen:api`
- `pnpm gen:api` 会生成英文 API 描述与各 locale 的模板数据；非英文描述再通过 `pnpm translate:api:i18n -- --locale <locale>` 填充
- API 生成产物以脚本输出为准，不要靠手改 `docs/src/generated/api/` 或 `docs/src/generated/api-locales/` 维持同步

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
- `docs/src/generated/api/` 与 `docs/src/generated/api-locales/` 的内容要和当前公开导出、类型描述、locale 列表同步
- 标题与 API 内容不要落后于实现
- 中英文文档是新组件从 0 到 1 的正式交付面，不要只写单语版本
