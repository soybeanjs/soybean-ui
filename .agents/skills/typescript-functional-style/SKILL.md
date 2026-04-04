---
name: typescript-functional-style
description: 'TypeScript 代码风格约束。用于编写或重构 TypeScript、Vue script、composable、utility 时，要求函数式编程优先、代码简洁、避免共享可变状态、减少嵌套、保持精确类型。关键词：TypeScript、TS、函数式、functional programming、FP、简洁、重构、composable、utility。'
argument-hint: '可选：说明目标文件、模块或希望强化的约束'
---

# TypeScript 函数式风格

## 何时使用

- 编写新的 TypeScript 工具函数、composable、模块逻辑
- 重构冗长、命令式、嵌套过深的 TS 代码
- 希望统一为函数式优先、简洁可读的实现风格

## 工作目标

- 以函数和组合为主，而不是类和继承
- 让逻辑表达尽量短而清楚，而不是堆叠中间状态
- 在简洁、类型安全、可维护性之间取平衡

## 执行规则

1. 优先纯函数

- 不依赖外部可变状态的逻辑，优先提取为纯函数。
- 输入和输出要稳定，避免隐藏副作用。
- 抽离纯函数时，如果功能只服务当前业务或当前模块，放到同级 `shared.ts`。
- 如果纯函数具有通用复用价值，放到项目现有的全局 shared 目录中，而不是继续堆在局部文件里。

2. 优先组合而非命令式堆叠

- 优先使用小函数组合、composable、工具函数。
- 除非外部 API 强制要求，否则不要引入 class。

3. 保持函数短小

- 一个函数只做一件事。
- 当函数同时处理数据筛选、映射、分支和副作用时，应拆分。

4. 降低嵌套层级

- 优先 guard clause 和 early return。
- 嵌套条件超过两层时，优先抽取辅助函数或反转条件。

5. 优先声明式数据变换

- 能用 `map`、`filter`、`find`、`some`、`every` 表达时，优先不用手写循环。
- 只有在明显更清楚或更高效时，才保留局部命令式写法。

6. 限制可变性

- 避免共享可变状态。
- 优先派生值而不是镜像状态。
- 局部 mutation 只在作用域很小且明显更易读时允许。

7. 类型必须精确

- 导出函数、公共工具、复杂返回值应声明清晰类型。
- 不用 `any`、不靠宽泛断言掩盖建模问题。

8. 简洁但不炫技

- 不为了“更函数式”而引入难读的链式技巧。
- 如果更短的写法更难懂，选更清楚的版本。

## Vue 语境补充

- 派生状态用 `computed`，不要重复存储。
- 副作用与数据转换分离。
- 与模板无关的纯逻辑，可提取到 helper 或 composable。
- 仅当前组件族使用的纯逻辑，优先收敛到同级 `shared.ts`。
- 跨模块可复用的纯逻辑，优先放到项目全局 shared 目录。
- 没必要时不要引入 watcher。

## Import 顺序

- import 顺序遵循 [.github/instructions/import-order.instructions.md](.github/instructions/import-order.instructions.md)。
- value import 顺序为：builtin、external、internal、parent、sibling、index。
- Parent 组内按层级距离排序，更远的父级路径放上面，例如 `../../bar` 在 `../foo` 上面。
- 如果同一个模块同时有 value import 和 type import，则 `import type` 紧跟在该模块的 value import 下一行。
- 类型导入使用 `import type`。
- 即使类型导入与 value 导入相邻，也不能打乱整体分组顺序。

## 重构检查清单

- 能否提取为纯函数？
- 提取后应该放同级 `shared.ts`，还是项目全局 shared 目录？
- 能否用 early return 减少缩进？
- 能否消除重复状态？
- 能否删掉只转手一次的中间变量？
- import 顺序是否符合 [.github/instructions/import-order.instructions.md](.github/instructions/import-order.instructions.md)？
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
