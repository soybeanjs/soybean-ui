---
applyTo: '**/*.{ts,tsx,js,jsx,vue}'
---

# Import 顺序

修改 TypeScript、JavaScript、Vue 文件时，import 必须按以下分组顺序排列：

- builtin
- external
- internal
- parent
- sibling
- index

## 分组说明

### Builtin

Node.js 内置模块，例如 `fs`、`path`、`node:path`。

### External

- 构建工具与相关库，例如 `vite`、`vitest`、`unplugin-*`、webpack、rollup、esbuild。
- 框架与框架生态，例如 `vue`、`@vue/*`、`vue-router`、`pinia`、`@vueuse/*`、`nuxt`、`@nuxt/*`。
- UI 与样式系统，例如 `@soybeanjs/ui`、`@soybeanjs/*`、`tailwindcss`、`unocss`、`@unocss/*`。
- 通用工具库，例如 `lodash`、`date-fns`、`axios`、`es-toolkit`。

### Internal

项目内部绝对导入，例如：

- `@/constants`
- `@/components`
- `@/composables`
- `@/shared`
- `@/styles`
- `@/types`
- 任意 `@/*` 别名路径

### Parent

父级目录导入，例如 `../foo`、`../../bar`。

- 在 parent 组内，层级更远的路径放前面。
- 例如 `../../bar` 必须排在 `../foo` 前面。

### Sibling

同级文件导入，例如 `./shared`。

### Index

当前目录索引导入，例如 `./`。

## 类型导入

- 同一个模块既有 value import 又有 type import 时，value import 在前，`import type` 紧跟下一行。
- 类型导入统一使用 `import type`。
- 不能为了把所有类型导入聚合成一个区块，而破坏整体分组顺序。
- 整体分组顺序仍然是 builtin、external、internal、parent、sibling、index。

示例：

```ts
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { axios } from 'axios';
import type { Methods } from 'axios';
import { cn } from '@/theme';
import { mergeSlotVariants } from '../shared';
import type { ButtonProps } from './types';
```
