# 安装

通过你偏好的包管理器安装 `@soybeanjs/ui-x`：

```bash
pnpm add @soybeanjs/ui-x
```

`@soybeanjs/ui-x` 基于 `@soybeanjs/ui` 与 `@soybeanjs/headless` 构建。若尚未安装，请一并添加：

```bash
pnpm add @soybeanjs/ui @soybeanjs/headless
```

## 引入样式

在项目入口文件中引入 UI-X 样式表：

```ts
// main.ts 或 main.js
import '@soybeanjs/ui-x/styles.css';
```

若使用 `@soybeanjs/ui`，请同时引入其样式表：

```ts
import '@soybeanjs/ui/styles.css';
```

## 可选 peer 依赖

部分组件通过 peer 依赖启用可选能力，按需安装：

| 包        | 启用能力               |
| --------- | ---------------------- |
| `shiki`   | `SxCodeBlock` 语法高亮 |
| `mermaid` | `SxMermaid` 图表渲染   |

```bash
pnpm add shiki mermaid
```

`SxMarkdown` 由 `markstream-vue`（硬依赖，自动安装）驱动。

## 下一步

- [快速开始](/ui-x/quick-start) —— 配置自动导入并构建第一个聊天界面
- [主题](/ui-x/theming) —— UI-X 继承 SoybeanUI 主题体系
- [组件目录](/ui-x) —— 浏览全部 20 个组件
