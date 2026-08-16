---
title: CLI
description: sbean 命令行工具参考
---

# SBean CLI

`sbean` 是 SoybeanUI 的命令行工具，用于初始化项目、添加组件和管理 UI 配置。

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
| `-m, --monorepo`        | 使用 monorepo（pnpm workspaces）结构                                  | `false`                                       |
| `--ui-dir <path>`       | 组件输出目录                                                          | `src/ui`（单仓库）/ `packages/ui`（monorepo） |
| `--size <size>`         | 组件尺寸：xs / sm / md / lg / xl / 2xl                                | `md`                                          |
| `--style <style>`       | 样式预设：soybean / clean / dense                                     | `soybean`                                     |
| `-b, --base <base>`     | 基础色：zinc / neutral / stone / slate / gray                         | `zinc`                                        |
| `--primary <primary>`   | 主色：indigo / blue / green / ...                                     | `indigo`                                      |
| `--radius <radius>`     | 圆角：none / xs / sm / md / lg / xl / 2xl                             | `md`                                          |
| `-p, --preset <code>`   | 预设编码（base62 编码的配置）                                         | —                                             |
| `--icon-library <lib>`  | 图标库：lucide / material-symbols / ph / tabler / solar / radix-icons | `lucide`                                      |
| `--font-sans <font>`    | 无衬线字体：inter / roboto / geist / ...                              | —                                             |
| `--font-heading <font>` | 标题字体或 `inherit`                                                  | —                                             |
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

### `sbean list`

列出 registry 中的条目，可按包过滤。

```bash
sbean list [options]
```

| 选项               | 描述                                        |
| ------------------ | ------------------------------------------- |
| `--package <name>` | 按包命名空间过滤：ui / ui-x / admin / chart |
| `--json`           | 以 JSON 格式输出                            |

条目按包命名空间区分（`ui/button`、`ui-x/bubble`、`admin/app-layout`、…）。

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
  "iconLibrary": "lucide",
  "uno": {
    "base": "zinc",
    "primary": "indigo",
    "size": "md",
    "radius": "md"
  },
  "font": {
    "sans": "inter",
    "heading": "inherit"
  },
  "aliases": {
    "ui": "#ui"
  },
  "registries": {}
}
```

| 字段           | 类型     | 描述                                                                                                        |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `iconLibrary`  | `string` | 图标库前缀                                                                                                  |
| `uno.base`     | `string` | 基础（中性）色                                                                                              |
| `uno.primary`  | `string` | 主（品牌）色                                                                                                |
| `uno.size`     | `string` | 基础组件尺寸                                                                                                |
| `uno.radius`   | `string` | 圆角大小                                                                                                    |
| `font.sans`    | `string` | 无衬线字体名称                                                                                              |
| `font.heading` | `string` | 标题字体或 `"inherit"`                                                                                      |
| `aliases`      | `object` | 各包 import 别名（`ui`/`ui-x`/`admin`/`chart`）——经 `tsconfig` paths 映射到输出目录（默认 `src/<package>`） |
| `registries`   | `object` | 额外 registry 命名空间 → URL 映射                                                                           |

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

SBean 从 SoybeanUI 注册表获取组件源码 `https://ui.soybeanjs.cn/r/{name}.json`。注册表条目**按包命名空间区分**——如 `ui/button` 由 `r/ui/button.json` 提供，`ui-x/bubble` 由 `r/ui-x/bubble.json` 提供。核心 `ui` 组件可省略前缀（`sbean add button`）；其他包的组件必须带命名空间前缀（`sbean add ui-x/bubble`）。本地缓存（`~/.sbean/cache`）保持 24 小时 TTL 并支持 ETag 条件请求。
