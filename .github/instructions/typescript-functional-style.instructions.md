---
applyTo: '**/*.{ts,tsx,js,jsx,vue}'
---

# TypeScript 函数式风格

这份规范用于 soybean-ui 代码库中的 TypeScript、Vue script、composable、shared helper 实现。

## 目标

- 优先函数、组合与数据变换，而不是 class 和共享可变状态。
- 保持代码短、小、显式，降低阅读成本。
- 先保证清晰，再考虑“更函数式”；不要为了形式牺牲可读性。

## 核心规则

1. 优先纯函数

- 不依赖生命周期、DOM、I/O 的逻辑，优先提取为纯函数。
- 输入输出应稳定可预测，避免隐藏副作用。
- 只服务当前模块的纯函数，放到同级 `shared.ts`。
- 具备跨模块复用价值的纯函数，放到现有全局 shared 目录，例如 `headless/src/shared/`。

2. 优先组合而非命令式堆叠

- 优先小函数组合、composable、工具函数。
- 除非外部 API 强制要求，否则不要引入 class。

3. 保持函数短小

- 一个函数只做一件事。
- 如果一个函数同时处理筛选、映射、分支和副作用，应拆分。

4. 降低嵌套层级

- 优先 guard clause 和 early return。
- 条件嵌套超过两层时，优先抽取辅助函数或反转条件。

5. 优先声明式数据变换

- 能用 `map`、`filter`、`find`、`some`、`every` 表达时，优先不用手写循环。
- 只有在明显更清楚或更高效时，才保留局部命令式写法。

6. 限制可变性

- 避免共享可变状态。
- 优先派生值而不是镜像状态。
- 局部 mutation 只在作用域很小且明显更易读时允许。

7. 类型必须精确

- 导出函数、公共工具、复杂返回值应声明清晰参数与返回类型。
- 不使用 `any`、宽泛断言或类型逃逸来掩盖建模问题。

8. 简洁但不炫技

- 不为了“更函数式”而引入难读的链式技巧。
- 如果更短的写法更难懂，选更清楚的版本。

## Vue 语境补充

- 派生状态用 `computed`，不要重复存储到 ref。
- 把副作用与数据转换分开。
- 与模板无关的纯逻辑，优先提取到 helper 或 composable。
- 仅当前组件族使用的纯逻辑，优先放同级 `shared.ts`。
- 跨模块可复用的纯逻辑，优先放项目全局 shared 目录。
- 没必要时不要引入 watcher。
- 在新增 helper、composable 或类型之前，先检查仓库现有实现是否已满足。
- 如果仓库里没有合适的 composable，优先检查 `@vueuse/core`，不要直接从 0 到 1 重写常见能力。

## Import 顺序

- import 顺序同时遵循同目录 `import-order.instructions.md`。
- value import 顺序为：builtin、external、internal、parent、sibling、index。
- 同模块的 `import type` 紧跟在对应 value import 下方。
- parent 组内更远的父路径排在更近的父路径前。

## 重构检查清单

- 能否提取为纯函数？
- 提取后应该放同级 `shared.ts`，还是项目全局 shared 目录？
- 能否用 early return 减少缩进？
- 能否消除重复状态？
- 能否删掉只转手一次的中间变量？
- import 顺序是否符合同目录 `import-order.instructions.md`？
- 导出 API 的参数和返回值是否足够明确？
- 代码是否在更短之后仍然更容易读？

## 示例

较差：

```ts
export function collectEnabledIds(items: Item[]): string[] {
  const result: string[] = [];

  for (const item of items) {
    if (item.enabled) {
      result.push(item.id);
    }
  }

  return result;
}
```

较好：

```ts
export function collectEnabledIds(items: Item[]): string[] {
  return items.filter(item => item.enabled).map(item => item.id);
}
```

较差：

```ts
export function resolveLabel(input?: string | null): string {
  let label = '';

  if (input) {
    label = input.trim();

    if (!label) {
      label = 'unknown';
    }
  } else {
    label = 'unknown';
  }

  return label;
}
```

较好：

```ts
export function resolveLabel(input?: string | null): string {
  const label = input?.trim();

  if (!label) {
    return 'unknown';
  }

  return label;
}
```
