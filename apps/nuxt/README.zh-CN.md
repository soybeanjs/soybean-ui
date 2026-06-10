# @soybeanjs/ui-nuxt

[English](./README.md) | 中文

演示 `@soybeanjs/ui` 集成的 Nuxt 示例应用。

## 📖 概述

此应用展示如何在 Nuxt 应用中使用 `@soybeanjs/ui`，包括：

- 通过 Nuxt 模块自动导入 `S` 前缀组件
- UnoCSS 集成实现原子化 CSS 样式
- 使用 `vue-i18n` 实现国际化
- 完整 TypeScript 支持

## 🛠 开发

```bash
# 安装依赖
pnpm install

# 启动 Nuxt 开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 🏗 技术栈

- **Nuxt 4** — Vue 框架
- **@soybeanjs/ui** — 带样式组件库
- **@soybeanjs/ui/nuxt** — Nuxt 自动注册模块
- **UnoCSS** — 原子化 CSS 引擎
- **Vue I18n** — 国际化

## 📁 项目结构

```
apps/nuxt/
├── src/
│   ├── components/   # 应用组件
│   ├── pages/        # 路由页面（基于文件的路由）
│   ├── layouts/      # 页面布局
│   └── styles/       # 应用样式
├── public/           # 静态资源
└── dist/             # 构建输出（已 git 忽略）
```
