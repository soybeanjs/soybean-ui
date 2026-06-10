# @soybeanjs/ui-docs

[English](./README.md) | 中文

SoybeanUI 文档站点，基于 Vite SSG（静态站点生成）构建。

## 📖 概述

此应用是 `@soybeanjs/ui` 和 `@soybeanjs/headless` 的官方文档，提供：

- 组件使用示例和在线演练场
- 每个组件的完整 API 参考
- 主题自定义指南
- 更新日志和版本发布说明

## 🛠 开发

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本（静态站点）
pnpm build

# 预览生产构建
pnpm preview

# 类型检查
pnpm typecheck
```

## 🏗 技术栈

- **Vue 3** — UI 框架
- **Vite SSG** — 静态站点生成
- **UnoCSS** — 原子化 CSS 引擎
- **@soybeanjs/ui** — 带样式组件
- **@soybeanjs/headless** — 无样式基础组件
- **Shiki** — 语法高亮
- **Vue I18n** — 国际化
- **Pinia** — 状态管理

## 📁 项目结构

```
apps/docs/
├── src/
│   ├── components/   # 文档专用组件（UsageCode、PlaygroundGallery、ComponentApi）
│   ├── generated/    # 自动生成的更新日志和语言数据
│   ├── layouts/      # 页面布局
│   ├── pages/        # 路由页面（基于文件的路由）
│   └── styles/       # 站点样式
├── locales/          # 国际化语言文件
├── public/           # 静态资源
└── build/            # 构建输出（已 git 忽略）
```

## 📝 生成内容

文档站点从 `apps/docs/src/generated/` 读取生成的数据：

- `changelog/` — 各组件更新日志条目
- `changelog-locales/` — 翻译后的更新日志数据
- 组件 API 描述和语言基线数据

从主仓库重新生成这些数据：

```bash
pnpm sui api              # 重新生成 API JSON 和语言基线
pnpm sui changelog         # 重新生成更新日志数据
pnpm sui api-translate -- --locale zh-CN
pnpm sui changelog-translate -- --locale zh-CN
```
