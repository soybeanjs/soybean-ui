# C62 `tree` 检查优化报告

> **组件编号：** C62（`tree`）
> **组件名称：** `STree`（headless 基座：`TreeRoot`/`TreeItem`/`TreeVirtualizerRoot`/`TreeVirtualizerItem` 4 个原语 + `useSelectionBehavior`/`useTypeahead`/`RovingFocusGroup` 组合）
> **模式：** 多槽（root/top/item/bottom + virtualizer 的 `content`/`dynamicContent` 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-04、D2-11、D3-04、D7-01

---

## 一、执行摘要

对 `tree` 完成全维度审计。核心链路：`TreeRoot` 以泛型 `T extends TreeItemData, U extends MaybeArray<string> | undefined, M extends boolean` 经 `useControllableState` 管理 `modelValue`/`expanded` 受控/非受控双通道，`useSelectionBehavior` 处理单选/多选/范围选择（`findValuesBetween` 基于 min/max 排序对称），`RovingFocusGroup` + `useTypeahead` 实现键盘导航（`↑/↓` 移动焦点、`→/←` 展开折叠、`Enter`/`Space` 选中、字符 typeahead、`loop` 默认 `true`）；`flattenItems` 在 bind 中预计算 `aria-setsize`/`aria-posinset`；UI 层 `STree` `TreeRootProps<T, U, M>` 泛型透传 + `withDefaults` 镜像 `loop: true`，`STreeVirtualizer` 叠加 TanStack Virtual 虚拟滚动。

**发现 Major ×3 + Minor ×2**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                               |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08）：`onSelect` propagateSelect 分支行为完全反转（`exist` 在 `onSelectItem` 切换后求值）且 `flattenChildren` 节点对象直接混入字符串数组 → 点击前捕获 `wasSelected` + `children.map(child => child.value)`（见 3.1）。展开/折叠/禁用/单选/多选/受控通道、`top`/`item`/`bottom` 插槽核验通过（spec 覆盖）                                        |
| D2 行业对标 |  ✅  | `multiple`（数组/单值联动）、`selectionBehavior`、`propagateSelect`/`bubbleSelect`/`allowParentSelect`、`toggleBehavior`、`defaultExpanded`、`virtual`（`STreeVirtualizer`）对齐 Ant Design/Element Plus/Naive UI；`draggable`/`loadData`/`searchValue` 为**遗留增强项**（见七，文档对标表已如实标注 `—`）                                                         |
| D3 API 设计 |  ✅  | `items: TreeItemData<T>[]` 泛型保留自定义字段；`modelValue`/`expanded` 受控/非受控双通道；`selectionBehavior: 'toggle' \| 'replace'`、`toggleBehavior: 'multiple' \| 'single'`、`propagateSelect`/`bubbleSelect`/`allowParentSelect`/`loop`/`disabled`；`item` 插槽暴露 `item`/`modelValue`/`expanded`（自由组合——消费方必须渲染 `TreeItem` 并传 `value`/`level`） |
| D4 类型系统 |  ✅  | **Minor 修复**（D4-01）：泛型 emit `@ts-expect-error` → 精确对齐 emit 参数类型显式收窄；`FlattenedItem.bind` `[key: string]: any` → 具名键类型（见 3.4）。`pnpm typecheck` 全绿（含新增 `loop` 镜像后 UI 层 32 项 spec 类型）                                                                                                                                      |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`（本轮消灭全部 `@ts-expect-error` 与 `bind` 的 `any` 泄漏）；headless 无样式（D5-14）；context 全部经 `transformPropsToContext` 响应式注入                                                                                                                                                                         |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（概述/用法/特性/**组件家族**/演示/API/说明/常见问题），含架构对标矩阵（10 能力 × 4 对标库）+ 7 条 Cautions + 7 组 FAQ；中英文结构完全对齐                                                                                                                                                                       |
|   D7 其他   |  ✅  | 单测 2 → 32 项全通过（渲染/数据属性与 aria/选择/展开折叠/禁用/键盘导航/虚拟滚动/loop 回归/axe 0 违规）；`pnpm typecheck`/`pnpm lint` 全绿；全量回归 109 文件 1616 项通过（D7-09）；`data-soybean-tree-*` 无冗余、root 无 `aschild`/`as` 泄漏（D1-07）                                                                                                              |

---

## 二、行业对标矩阵

> `tree` 是**受控树 + 级联选择 + Roving Focus 键盘导航**模式。Ant Design Tree 与 Element Plus Tree 为同源设计（配置式 `tree-data` + 受控状态）；Naive UI Tree 覆盖异步加载与搜索；SoybeanUI 以 headless 原语 + 插槽自由组合表达树（节点内容、勾选框、缩进/连接线样式全部由消费方注入）。

| 能力                               | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :--------------------------------- | :-------: | :--------: | :----------: | :------: |
| headless/样式分离                  |    ✅     |     —      |      —       |    —     |
| 受控/非受控选中 + 展开（双通道）   |    ✅     |     ✅     |      ✅      |    ✅    |
| 单选/多选（`multiple` 类型联动）   |    ✅     |     ✅     |      ✅      |    ✅    |
| 级联选择（propagate/bubble）       |    ✅     |     ✅     |      ⚠️      |    ✅    |
| 展开策略（single/multiple 手风琴） |    ✅     |     ✅     |      ✅      |    ✅    |
| 虚拟滚动（1000+ 节点）             |    ✅     |     ✅     |      ⚠️      |    ✅    |
| Roving Focus 键盘导航 + typeahead  |    ✅     |     ✅     |      ✅      |    ✅    |
| `draggable` 拖拽                   |     —     |     ✅     |      ✅      |    ✅    |
| `loadData` 异步加载                |     —     |     ✅     |      ✅      |    ✅    |
| `searchValue` 搜索过滤             |     —     |     ✅     |      ✅      |    ✅    |

`⚠️` = 部分支持（Element Plus 虚拟滚动/级联由配置触发；Element Plus 无独立 `bubbleSelect`）；`—` = 缺失，已列入遗留增强项（见七）。

---

## 三、发现的问题与处理

### 3.1 Major — D1-08 propagateSelect 行为反转 + 节点对象混入选中数组

**现象：** [tree-root.vue](../../packages/headless/src/components/tree/tree-root.vue) `onSelect` 的 propagateSelect 分支同时存在两个缺陷：

```ts
// 修复前
onSelectItem(value);
// ...
const exist = modelValue.value.includes(value);
if (exist) {
  modelValue.value = modelValue.value.filter(v => !children.some(child => child.value === v)) as U;
} else {
  modelValue.value = [...modelValue.value, ...children] as U; // ② 节点对象混入
}
```

**根因 ①（行为反转）：** `exist` 在 `onSelectItem(value)` **之后**求值——`onSelectItem` 已把当前项切换进/出选中态。点击未选中项 → `onSelectItem` 置为选中 → `exist` 恒 `true` → 走**删除**子孙分支（本应添加）；点击已选中项 → `onSelectItem` 置为未选中 → `exist` 恒 `false` → 走**添加**子孙分支（本应删除）。propagate 级联行为与预期完全相反。

**根因 ②（类型混入）：** `flattenChildren` 返回 `Omit<T, 'children'>[]` 节点对象数组，直接展开进 `modelValue.value`（`string[]`）→ 产生 `['1', { value: '1-1' }, { value: '1-2' }]` 混合数组，级联选中值全部为节点对象而非字符串。

**修复：** 点击前捕获 `wasSelected`，子孙值映射为 `value` 字符串：

```ts
const wasSelected =
  props.propagateSelect && props.multiple && Array.isArray(modelValue.value) ? modelValue.value.includes(value) : false;

onSelectItem(value);
// ...
if (wasSelected) {
  modelValue.value = modelValue.value.filter(v => !children.some(child => child.value === v)) as U;
} else {
  modelValue.value = [...modelValue.value, ...children.map(child => child.value)] as U;
}
```

**验证（测试驱动）：** 新增「propagates selection to descendants」（`multiple + allowParentSelect + propagateSelect` 点击父节点 → `update:modelValue` 为 `['1', '1-1', '1-2']`，纯字符串数组）、「bubbles selection to ancestors when all children selected」（展开态点击 1-1、1-2 → 值含父 `'1'`），均通过。

### 3.2 Major — D1-08/D1-07 `aria-setsize`/`aria-posinset` 死数据从未渲染到 DOM

**现象：** [shared.ts](../../packages/headless/src/components/tree/shared.ts) 的 `flattenItems` 在 `FlattenedItem.bind` 中**静态计算** `'aria-setsize'`/`'aria-posinset'`（`_id`/`index` 派生），但 [tree-item.vue](../../packages/headless/src/components/tree/tree-item.vue) 模板从未绑定这两个属性——计算结果为纯死数据，DOM 中树项缺失位置/数量信息，屏幕阅读器无法感知当前项在兄弟集合中的序号与总数（对标：AntD/Element Plus 树节点均渲染 `aria-setsize`/`aria-posinset`）。

**修复：** [types.ts](../../packages/headless/src/components/tree/types.ts) 收紧 `bind` 键为具名可选类型，[tree-item.vue](../../packages/headless/src/components/tree/tree-item.vue) 模板绑定：

```html
:aria-setsize="currentItem?.bind['aria-setsize']" :aria-posinset="currentItem?.bind['aria-posinset']"
```

**验证（测试驱动）：** 新增「applies aria-setsize and aria-posinset to tree items」断言展开父节点后 4 个 item 的 `aria-setsize` 均为 `4`、`aria-posinset` 为 `1..4`（axe 全量 0 违规）。

### 3.3 Major — D1-12/D2-11 `STreeVirtualizer`/`TreeVirtualizerRoot` 缺省 `loop` 布尔 cast 覆盖默认值（C55 同款）

**现象：** [tree-virtualizer.vue](../../packages/ui/src/components/tree/tree-virtualizer.vue) 与 [tree-virtualizer-root.vue](../../packages/headless/src/components/tree/tree-virtualizer-root.vue) 均用纯 `const props = defineProps<TreeVirtualizerProps<T, U, M>>()`（无 `withDefaults`），而 headless `TreeRoot` 在 `withDefaults` 中声明 `loop: true`（键盘导航首尾循环）。与 C55 同款陷阱：Vue 运行时将缺失的 Boolean prop **cast 为 `false`**，经 `useOmitProps` 作为显式值透传，覆盖 headless 的 `true` 默认——虚拟滚动树键盘导航 `loop` 静默失效（与 `STree` 非虚拟路径行为不一致）。

**修复：** 两个透传层镜像 headless 默认：

```ts
// tree-virtualizer-root.vue（headless）
const props = withDefaults(defineProps<TreeVirtualizerRootProps<T, U, M>>(), {
  items: () => [],
  loop: true // 镜像 TreeRoot 默认，避免缺失 Boolean prop 被 cast 为 false 透传覆盖
});

// tree-virtualizer.vue（UI 层）
const props = withDefaults(defineProps<TreeVirtualizerProps<T, U, M>>(), {
  loop: true
});
```

**验证（测试驱动）：** 新增「keeps the headless loop default on the virtualizer root」（`data-loop` 属性存在；若 cast 覆盖未修复则被渲染为 `false` 不存在）。`tree.vue`（非虚拟路径）既有 `withDefaults({ loop: true })`，核验无风险。

### 3.4 Minor — D4-01 泛型 emit `@ts-expect-error` + `FlattenedItem.bind` `any`

**现象 ①：** [tree-root.vue](../../packages/headless/src/components/tree/tree-root.vue) 泛型 emit 处存在 `@ts-expect-error` 反模式（历史遗留，掩盖 `MaybeArray<string> | undefined` 与 emit 参数类型不匹配）。

**修复：** 移除 `@ts-expect-error`，将运行时值精确收窄为 emit 参数类型（`TreeRootEmits` 以 `multiple` prop 类型为泛型，条件类型 `IsMultiple<U, M> extends true ? string[] : string` 与裸 `M` 不直接互通，须经 `TreeRootEmits<...>['update:modelValue'][0]` 索引提取——源类型 `string | string[]` 比 color-swatch-picker 的更宽，不能直接 `as M extends true ? string[] : string`）：

```ts
emit('update:modelValue', value as TreeRootEmits<TreeRootProps<T, U, M>['multiple']>['update:modelValue'][0]);
```

**现象 ②：** [types.ts](../../packages/headless/src/components/tree/types.ts) `FlattenedItem.bind` 声明 `[key: string]: any` 索引签名，`any` 泄漏（D4-01）。

**修复：** 具名键类型 `{ data: T; level: number; 'aria-setsize'?: number; 'aria-posinset'?: number }`（与 3.2 的 DOM 绑定闭环）。

### 3.5 核查结论 — C42/C52/C55 同款风险核查

- **C42/C55 同款缺省 Boolean cast 风险：已修复 + 核查。** `STreeVirtualizer`/`TreeVirtualizerRoot` 补 `loop: true` 镜像（3.3）；`tree.vue`（非虚拟路径）既有 `withDefaults({ loop: true })` 无风险；headless `TreeRoot` 自身 `withDefaults` 直接消费 props，无透传覆盖路径。**回归测试**「keeps the headless loop default on the virtualizer root」锁定。
- **C52 同款 `*Props` 声明未绑定：已核验。** `STreeVirtualizer` 的 `contentProps`/`dynamicContentProps` 均 v-bind 转发 `VirtualizerContent`；`STree` 经 `useOmitProps` + `useForwardListeners` 转发，无静默丢弃。
- **C52 同款 `aschild` 泄漏：不存在。** spec「does not leak as / asChild props to the DOM」断言 root 无 `aschild`/`as=` 泄漏（`Primitive` 消费 `as`/`asChild`）。
- **D1-07 数据属性：齐备。** `data-soybean-tree-root`/`data-soybean-tree-item`/`data-soybean-tree-virtualizer-root`/`data-soybean-tree-virtualizer-item` + `data-indent`/`data-expanded`/`data-selected` 无冗余属性（spec 逐一断言）。
- **D7-05 a11y：通过。** `role="tree"`/`treeitem`、`aria-expanded`/`aria-selected`/`aria-level`/`aria-setsize`/`aria-posinset`/`aria-multiselectable`/`aria-disabled` 双通道反射——axe 0 违规。
- **`findValuesBetween` 对称性：核验通过（非缺陷）。** [object.ts](../../packages/headless/src/shared/object.ts) 的 `findValuesBetween` 以 `[minIndex, maxIndex].sort()` 归一化，`prev`/`next` 方向对称（Shift 范围选择双向一致），无需修改。

### 3.6 D7-11 — 单测覆盖不足（已扩展 2 → 32 项）

**处理：** 扩展 [tree.spec.ts](../../packages/ui/test/specs/components/tree.spec.ts)（原 2 项）至 **32 项**，全部通过：

```bash
✓ test/specs/components/tree.spec.ts (32 tests) 291ms
```

> 覆盖组：**rendering 5 项**（根/数据渲染、top/bottom 插槽、defaultExpanded 嵌套、`as`/`asChild` 不泄漏、slot props）；**data attributes/aria 6 项**（`data-soybean-tree-item` 属性、role/aria 属性集、aria-setsize/posinset、axe 0 违规、data attributes 集合、loop 回归）；**selection 8 项**（单选点击/多选 toggle/多选 replace/受控 modelValue/disable 禁用/单值断言/级联 propagate/bubble）；**expand/collapse 4 项**（展开/折叠/单一 toggle 行为/受控 update:expanded）；**disabled 1 项**；**keyboard navigation 5 项**（方向键/展开折叠键/Home/End/typeahead）；**STreeVirtualizer 3 项**。

> 关键测试要点：① `STree` 的 `#item` 插槽为**自由组合**——消费方必须渲染 headless `TreeItem`（`global: { components: { TreeItem } }` 注册），仅渲染 span 无法触发 `[data-soybean-tree-item]`；② 多选/替换/受控测试用 `defaultExpanded: ['1']` 固定 DOM 顺序（`[1, 1-1, 1-2, 2]`），展开后索引重算（bubble 点击 [1]/[2]、single-toggle 点击 [0] 后 [2]）；③ Virtualizer 测试须 mock `ResizeObserver`（TanStack Virtual 依赖）+ 触发含尺寸的 entry + `delay(30)` + `nextTick`；④ propagate 断言点击后值为 `['1', '1-1', '1-2']`（纯字符串）。

### 3.7 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：概述（headless/styled 分离 + 受控/非受控 + Roving Focus + 虚拟滚动）、用法、特性（8 条 bullet）、组件家族（`STree` + `STreeVirtualizer` + 4 个 headless 原语）、演示（2 示例导览）、API、说明（架构与对标差异：**10 能力 × 4 对标库矩阵** + 7 条注意事项）、常见问题（7 组：多选类型联动、级联选择、展开策略、虚拟滚动、键盘导航、RTL、插槽自由组合）。中英文结构一一对应；Cautions 收录本轮修复要点（`loop` 默认 `true`、`#item` 自由组合约定、`STreeVirtualizer` 需 `height`、`aria-setsize`/`aria-posinset` 由组件维护等）；对标表对 `draggable`/`loadData`/`searchValue` 如实标注 `—`。

---

## 四、架构与模式要点

### propagateSelect 的「切换前求值」时序是级联状态机的关键

`onSelectItem` 会原地切换当前项选中态，任何基于「切换后」状态的判定（`includes`/`exist`）都会反转。修复模式固化：**级联类分支必须先捕获点击前状态，再执行切换**（`wasSelected` → `onSelectItem` → 按捕获状态增删子孙）。同时 `flattenChildren` 返回节点对象，写入 `string[]` 前必须 `.map(child => child.value)`——对象混入是数组类型编程的经典隐错，spec 断言纯字符串数组锁定。

### `FlattenedItem.bind` 是「计算即渲染」的闭环节点

`flattenItems` 在 bind 中预计算 `aria-setsize`/`aria-posinset`，若组件模板不绑定则全部为死代码。审计 headless 组件时，**凡是 bind/派生数据字段都必须核对模板消费**（C62 的 setsize/posinset 死数据与 C45 的 shallowRef 原地变更同属「数据与渲染脱节」一类问题）。`bind` 由 `[key: string]: any` 收紧为具名可选键后，模板引用获得类型保障。

### 泛型 emit 的类型收窄必须精确对齐 emit 参数类型

`TreeRootEmits<M>` 的条件类型 `M extends true ? string[] : string` 是**对外 API 契约**（消费方 `v-model` 类型随 `multiple` 联动）；内部运行时值 `MaybeArray<string> | undefined` 不能裸 `as M extends true ? ...`（源类型更宽触发 TS2352），须经 `TreeRootEmits<TreeRootProps<T, U, M>['multiple']>['update:modelValue'][0]` 索引提取**同一类型**完成收窄——与 color-swatch-picker 同款模式，但源类型更宽时需要精确对齐（3.4）。这是「消除 `@ts-expect-error` 且不破坏公共类型契约」的推荐形态。

---

## 五、变更文件清单

| 文件                                                              | 变更类型                                                                                                                                                                                                                |
| :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/tree/tree-root.vue`             | **Major 修复**（D1-08）：propagateSelect 点击前捕获 `wasSelected` + `children.map(child => child.value)`（行为反转 + 对象混入）；**Minor 修复**（D4-01）：泛型 emit `@ts-expect-error` → 精确对齐 emit 参数类型显式收窄 |
| `packages/headless/src/components/tree/tree-item.vue`             | **Major 修复**（D1-08/D1-07）：模板绑定 `aria-setsize`/`aria-posinset`（此前为 bind 死数据，从未渲染到 DOM）                                                                                                            |
| `packages/headless/src/components/tree/types.ts`                  | **Minor 修复**（D4-01）：`FlattenedItem.bind` `[key: string]: any` → 具名键类型（`data`/`level`/`aria-setsize?`/`aria-posinset?`）                                                                                      |
| `packages/headless/src/components/tree/tree-virtualizer-root.vue` | **Major 修复**（D1-12/D2-11，C55 同款）：`withDefaults` 镜像 `loop: true`（缺失 Boolean prop cast 为 `false` 覆盖 headless 默认）                                                                                       |
| `packages/ui/src/components/tree/tree-virtualizer.vue`            | 同款 `loop: true` 镜像（UI 透传层）                                                                                                                                                                                     |
| `packages/ui/test/specs/components/tree.spec.ts`                  | 单测 2 → 32 项扩展（rendering/aria+axe/selection/expand/disabled/keyboard/virtualizer/loop 回归；`TreeItem` 注册 + `defaultExpanded` 固定 DOM 顺序 + ResizeObserver mock）                                              |
| `apps/docs/src/docs/en/components/tree.md`                        | 文档 4 节 → 8 节 Recommended structure（Component family + 10 能力 × 4 对标库矩阵 + Cautions 7 条 + FAQ 7 组）                                                                                                          |
| `apps/docs/src/docs/zh-CN/components/tree.md`                     | 与 en 一一对应的 8 节中文化版本                                                                                                                                                                                         |
| `docs/check.md`                                                   | C62 行 7 维度 ⏳ → ✅；4.11 批次 10 记录表追加 C62 行 + 批次合计（1 单元，单测 2 → 32 项）                                                                                                                              |
| `docs/check-reports/C62-tree.md`                                  | **新建** 本审计报告                                                                                                                                                                                                     |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/tree.spec.ts   # 32/32 全绿
pnpm --filter @soybeanjs/ui exec vitest run   # 全量 109 文件 1616/1616 全绿（D7-09 回归）
pnpm lint                                # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞）

| 增强项                 | 对标依据     | 说明                                                                                                                                                                                                |
| :--------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `draggable` 拖拽排序   | AntD/Element | 树节点拖拽（`@dragstart`/`drop` 重构 items）属大特性，文档对标表已如实标注 `—`；建议独立排期                                                                                                        |
| `loadData` 异步加载    | AntD/Naive   | 异步懒加载子节点（`loadData` 回调 + loading 态）可基于 `children` 占位实现；文档对标表已标注 `—`                                                                                                    |
| `searchValue` 搜索过滤 | AntD/Element | 关键字过滤 + 自动展开匹配路径（`filterTree` 纯函数已在 D5 模板中规划）；文档对标表已标注 `—`                                                                                                        |
| `tree` 独立浏览器 e2e  | 自研标准     | 按 check.md 2.3.4 清单，`tree` 属键盘导航类（D7-19）且含虚拟滚动（D7-01/D7-02），须补浏览器 e2e（真实 Tab/箭头序列 + 虚拟滚动滚动性能 + axe），本轮以 happy-dom 单测 + axe 静态检查替代，非 Blocker |
| 1k 节点虚拟滚动帧率    | D7-01/D7-02  | 建议纳入浏览器 e2e 性能断言（当前仅单测覆盖虚拟项渲染数量与占位逻辑）                                                                                                                               |
