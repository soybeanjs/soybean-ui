# 安装

通过你喜欢的包管理器安装 `@soybeanjs/admin`：

```bash
pnpm add @soybeanjs/admin
```

`@soybeanjs/admin` 将 `@soybeanjs/ui`、`@soybeanjs/headless` 声明为依赖、Vue 声明为 peer 依赖，安装该包即可开始使用。

## 样式

该包提供基于 UnoCSS 构建的独立样式表，在 UI 样式之后引入一次即可：

```ts
import '@soybeanjs/ui/styles.css';
import '@soybeanjs/admin/styles.css';
```

> admin 样式表由组件 recipe 经 `build:css` 生成；主题 token 通过 `@soybeanjs/ui-uno` 解析。
