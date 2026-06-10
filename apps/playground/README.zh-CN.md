# @soybeanjs/ui-playground

[English](./README.md) | 中文

SoybeanUI 组件交互式演练场，基于 Vite 构建。

## 📖 概述

此应用是 `@soybeanjs/ui` 和 `@soybeanjs/headless` 的实时开发演练场，可用于：

- 独立试验各个组件
- 测试主题变体和配置
- 原型布局和交互
- 调试组件行为

## 🛠 开发

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 类型检查
pnpm typecheck
```

## 🏗 技术栈

- **Vue 3** — UI 框架
- **Vite** — 构建工具
- **UnoCSS** — 原子化 CSS 引擎
- **@soybeanjs/ui** — 带样式组件
- **@soybeanjs/headless** — 无样式基础组件
- **Vue I18n** — 国际化
- **Vue Router** — 路由

## 📁 项目结构

```
apps/playground/
├── src/
│   ├── components/   # 演示组件和示例
│   ├── pages/        # 路由页面（基于文件的路由）
│   ├── layouts/      # 页面布局
│   └── styles/       # 演练场样式
├── public/           # 静态资源
└── dist/             # 构建输出（已 git 忽略）
```
