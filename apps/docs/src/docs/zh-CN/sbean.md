---
title: CLI
description: sbean 命令行工具参考
---

# SBean CLI

`sbean` 是 SoybeanUI 的命令行工具，用于初始化项目、添加组件和管理 UI 配置。

[[toc]]

## 安装

```bash
pnpm add -D sbean
```

或直接运行：

```bash
npx sbean init
```

## 命令

### `sbean init`

初始化 SoybeanUI 项目或为现有项目添加配置。

```bash
sbean init [options]
```

| 选项                    | 描述                                                                  | 默认值                                        |
| ----------------------- | --------------------------------------------------------------------- | --------------------------------------------- |
| `--style <style>`       | 样式预设：soybean / clean / dense                                     | `soybean`                                     |
| `-b, --base <base>`     | 基础色：zinc / neutral / stone / slate / gray                         | `zinc`                                        |
| `--primary <primary>`   | 主色：indigo / blue / green / ...                                     | `indigo`                                      |
| `--feedback <feedback>` | 反馈色预设：classic / vivid / subtle / ...                            | `classic`                                     |
| `--size <size>`         | 组件尺寸：xs / sm / md / lg / xl / 2xl                                | `md`                                          |
| `--radius <radius>`     | 圆角：none / xs / sm / md / lg / xl / 2xl                             | `md`                                          |
| `-p, --preset <code>`   | 预设编码（base62 编码的配置）                                         | —                                             |
| `--icon-library <lib>`  | 图标库：lucide / material-symbols / ph / tabler / solar / radix-icons | `lucide`                                      |
| `--font-sans <font>`    | 无衬线字体：inter / roboto / geist / ...                              | —                                             |
| `--font-heading <font>` | 标题字体或 `inherit`                                                  | —                                             |
| `-m, --monorepo`        | 使用 monorepo（pnpm workspaces）结构                                  | `false`                                       |
| `--ui-dir <path>`       | 组件输出目录                                                          | `src/ui`（单仓库）/ `packages/ui`（monorepo） |
| `-y, --yes`             | 跳过确认提示                                                          | `false`                                       |
| `-d, --defaults`        | 使用默认配置                                                          | `false`                                       |
| `-f, --force`           | 覆盖已有配置                                                          | `false`                                       |

不提供选项时将进入交互式引导。

### `sbean add`

向项目添加组件。

```bash
sbean add <component...> [options]
```

| 选项                | 描述                               |
| ------------------- | ---------------------------------- |
| `-y, --yes`         | 跳过确认提示                       |
| `-o, --overwrite`   | 覆盖已有文件                       |
| `-p, --path <path>` | 目标路径（默认使用配置中的 uiDir） |
| `--dry-run`         | 预览变更而不写入                   |
| `--diff`            | 显示本地与注册表的差异             |
| `--view`            | 查看组件源码而不添加               |
| `-a, --all`         | 添加所有可用组件                   |
| `-s, --silent`      | 静默输出                           |

### `sbean build`

从 registry.json 构建注册表 JSON 文件。

```bash
sbean build [registry] [options]
```

| 选项                  | 描述     | 默认值       |
| --------------------- | -------- | ------------ |
| `-o, --output <path>` | 输出目录 | `./public/r` |

### `sbean search`

搜索可用组件。

```bash
sbean search [query] [options]
```

| 选项                    | 描述                                               |
| ----------------------- | -------------------------------------------------- |
| `-a, --all`             | 显示所有组件                                       |
| `-t, --type <type>`     | 按类型筛选：component / hook / style / lib / theme |
| `-l, --limit <limit>`   | 最大结果数（默认：50）                             |
| `-o, --offset <offset>` | 分页偏移量                                         |

### `sbean view`

查看组件源码。

```bash
sbean view <component>
```

### `sbean info`

显示项目配置和可用的预设值。

```bash
sbean info [options]
```

| 选项     | 描述             |
| -------- | ---------------- |
| `--json` | 以 JSON 格式输出 |

### `sbean template`

从模板快速创建项目。

```bash
sbean template [name] [options]
```

| 选项                 | 描述         |
| -------------------- | ------------ |
| `-l, --list`         | 列出可用模板 |
| `-o, --output <dir>` | 输出目录     |

可用模板：`vue-vite`、`nuxt`。

### `sbean preset`

管理配置预设。

```bash
sbean preset <preset>
```

## 配置

`sbean.json` 存储项目配置：

```json
{
  "style": "soybean",
  "isMonorepo": false,
  "iconLibrary": "lucide",
  "uno": {
    "base": "zinc",
    "primary": "indigo",
    "feedback": "classic",
    "size": "md",
    "radius": "md"
  },
  "font": {
    "sans": "inter",
    "heading": "inherit"
  },
  "menu": {
    "accent": "subtle",
    "color": "default"
  },
  "uiDir": "src/ui"
}
```

| 字段           | 类型      | 描述                             |
| -------------- | --------- | -------------------------------- |
| `style`        | `string`  | 样式预设名称                     |
| `isMonorepo`   | `boolean` | 是否为 monorepo                  |
| `iconLibrary`  | `string`  | 图标库前缀                       |
| `uno.base`     | `string`  | 基础（中性）色                   |
| `uno.primary`  | `string`  | 主（品牌）色                     |
| `uno.feedback` | `string`  | 反馈色预设                       |
| `uno.size`     | `string`  | 基础组件尺寸                     |
| `uno.radius`   | `string`  | 圆角大小                         |
| `font.sans`    | `string`  | 无衬线字体名称                   |
| `font.heading` | `string`  | 标题字体或 `"inherit"`           |
| `menu.accent`  | `string`  | 菜单强调样式：subtle / bold      |
| `menu.color`   | `string`  | 菜单颜色方案                     |
| `uiDir`        | `string`  | 组件输出目录（相对于项目根目录） |

## 项目结构

### 单仓库

```
project/
├── src/
│   └── ui/           ← 组件输出目录 (uiDir)
│       ├── components/
│       ├── styles/
│       ├── theme/
│       ├── constants/
│       ├── resolver/
│       └── nuxt/
├── sbean.json
├── tsconfig.json
└── uno.config.ts
```

### Monorepo（pnpm workspaces）

```
project/
├── packages/
│   └── ui/           ← 组件输出目录 (uiDir)
│       ├── components/
│       ├── styles/
│       ├── theme/
│       ├── constants/
│       ├── resolver/
│       └── nuxt/
├── sbean.json
├── tsconfig.json
├── uno.config.ts
└── pnpm-workspace.yaml
```

## 别名系统

SBean 使用 `#ui` TypeScript 路径别名进行所有组件导入：

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "#ui/*": ["./src/ui/*"]
    }
  }
}
```

所有组件导入都使用此命名空间：

```ts
import { SButton } from '#ui/components/button';
import { buttonVariants } from '#ui/styles/button';
```

## 注册表

SBean 从 SoybeanUI 注册表获取组件源码 `https://ui.soybeanjs.cn/r/{name}.json`。本地缓存（`~/.sbean/cache`）保持 24 小时 TTL 并支持 ETag 条件请求。
