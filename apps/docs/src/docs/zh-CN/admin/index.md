# @soybeanjs/admin

> SoybeanAdmin —— 基于 SoybeanUI 的后台管理壳组件。
>
> **注意：** 本包仍在开发中，计划于 v0.40.0 版本正式发布，敬请期待！

## 概览

`@soybeanjs/admin` 是外围包，在 `@soybeanjs/ui` 之上提供完整的后台应用壳组件。它遵循 [ecosystem](/overview/introduction) 中记录的外围包架构：领域逻辑与样式同居于包内，组件前缀为 `S` + 领域名词（`App*`），依赖核心 `headless` / `ui` / `theme` 包。

## 组件

- `SAppLayout` —— 统一应用壳（侧边栏变体、六种导航形态、响应式移动端抽屉）
- `SAppMenu` —— 每种布局形态的导航
- `SAppLogo` —— 侧边栏 / 头部品牌块
- `SAppBreadcrumb` —— 支持子级下拉的面包屑
- `SAppPageHeader` —— 带返回按钮与操作区的页面级头部
- `SAppFooter` —— 带版权的应用页脚

## 快速链接

- [安装](/admin/installation)
- [快速开始](/admin/quick-start)
