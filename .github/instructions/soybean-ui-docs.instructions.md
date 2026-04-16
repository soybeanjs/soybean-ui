---
applyTo: 'docs/src/docs/**/*.md'
---

# SoybeanUI 文档规范

组件 API 和 playground 稳定后，再补文档。

不要在 props、slots、emits 仍频繁变化时先写 API 表格。

## 文档交付面

- 中文文档：`docs/src/docs/zh-CN/components/{component}.md`
- 英文文档：`docs/src/docs/en/components/{component}.md`

两份文档结构必须一致，只允许文案语言不同。

## 推荐结构

- 一级标题
- 概述
- 用法代码块
- 演示 `playground` 代码块
- API
- `DataTable preset="props"`
- `DataTable preset="emits"`
- `DataTable preset="slots"`
- `TypeTable`

## 编写顺序

1. 先写概述和最小用法
2. 再写 `playground` 演示清单
3. 再补 API 表格
4. 最后更新 `docs/src/constants/menus.ts`

## 关键规则

- `playground` 代码块中写示例文件名，每行一个，顺序即展示顺序
- `DataTable preset="props"` 要包含所有公开 props，尤其是 `class`、`ui`
- `DataTable preset="emits"` 要包含所有公开事件
- `DataTable preset="slots"` 要包含所有公开插槽
- `TypeTable` 中的 `Ui` 字段必须与 `{Name}UiSlot` 一一对应

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
- 演示清单要和 `playground/examples/{component}/` 真实文件保持一致
- 标题与 API 内容不要落后于实现
- 中英文文档是新组件从 0 到 1 的正式交付面，不要只写单语版本
