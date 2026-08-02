# C22 `tabs` 检查优化报告

> **组件编号：** C22
> **组件名称：** `tabs` / `STabs`
> **模式：** 多槽 + Compact（泛型 `TabsCompact<T extends TabsOptionData>` 聚合 Root + List + Trigger + Content + Indicator；`scv()` 配方 `tabsVariants`，6 UI slots：root / list / trigger / content / indicator / indicatorContent + 3 内容槽：trigger / content / indicator）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `STabs` 完成全维度审计。组件架构清晰：headless 层拥有 6 个 SFC（Root / List / Trigger / Content / Indicator / Compact）+ `context.ts`（`useDirection`、`listElement` shallowRef、`registerContentId`/`unregisterContentId` 面板注册、确定性 `getId()` 生成 `soybean-tabs-trigger-{value}` / `soybean-tabs-content-{value}`），`RovingFocusGroup` 提供方向键 roving focus 导航，`useControllableState` 双通道管理 modelValue，`usePresence` 实现内容挂载/卸载动画。styled 层使用 `scv()` 配方 + 6 变体（size × orientation × shape × fill × enableIndicator）。

发现并修复 3 项问题：

1. **Major (D5)**：`shape` 变体（`'rounded' | 'square'`）在 `tabsVariants` 配方中定义却从未暴露——`TabsProps` 未声明 `shape`，`useOmitProps` 未排除，`tabsVariants` 调用未传入，配方成为死代码，用户无法使用。
2. **Major (D7)**：`TabsIndicator` 初始渲染缺陷——指示器在首次挂载时永不出现。根因是 `watch(..., { immediate: true, flush: 'post' })` 在 `listElement` ref 回调（`useForwardElement`）触发之前执行，`updateIndicatorStyle` 因 `if (!activeTab) return` 直接跳过，`indicatorStyle.size` 永远为 `null`，模板 `v-if` 判定不渲染。
3. **Minor (D7)**：`TabsTrigger` 的 `onKeyDown`（Enter/Space 激活）未做 disabled 防护——禁用标签可通过键盘激活，与 `mousedown`/focus 路径的防护不一致。

测试从 10 项扩展到 30 项（新增 shape 变体、RTL/垂直指示器定位、roving focus 键盘导航、禁用跳过、受控/非受控同步、presence 内容挂载、axe 扫描）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                      |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact；泛型 `TabsCompact<T>`；`data-soybean-tabs-*` 全覆盖 + `data-active`/`data-disabled`/`data-orientation`/`data-state` 状态钩子；激活模式 / roving focus 键盘导航 / presence 挂载 / 动画指示器 / RTL 镜像全部就位                            |
| D2 行业对标 |  ✅  | automatic/manual 双激活模式 + roving focus 跳过禁用项 + `unmountOnHide`/`forceMount` presence 内容 + CSS 变量动画指示器 + RTL 偏移镜像，与 shadcn-vue/Radix Tabs 对齐且指标仪为增强项；横向/纵向双布局对标 AntD / Element Plus                            |
| D3 API 设计 |  ✅  | 泛型 `TabsCompactProps<T>`；`modelValue`/`defaultValue` 双通道（`useControllableState`）；`activationMode`/`unmountOnHide`/`enableIndicator`/`dir`/`orientation`/`loop`/`listProps`/`triggerProps`/`contentProps`/`indicatorProps` 完整转发；3 个类型化槽 |
| D4 类型系统 |  ✅  | strict 通过；`TabsOptionData<T>` / `TabsCompactProps<T>` / `TabsUiSlot` 全类型化；UI `TabsProps<T>` 通过 `TabsCompactProps<T>` 继承 + `shape`/`fill`/`size`/`ui` 扩展；JSDoc 齐全                                                                         |
| D5 代码规范 |  ✅  | 修复 shape 变体死代码：`TabsProps` 暴露 `shape?: TabsShape`，`useOmitProps` 排除列表新增 `'shape'`，`tabsVariants` 传入 `shape: props.shape`；`useForwardListeners`/`keysOf(slots)` 动态槽转发                                                            |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（11 条）+ Notes（架构对标表 12 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                                                                                                                        |
|   D7 其他   |  ✅  | 30 项单元测试通过（axe-core 无违规）；修复指示器初始渲染时序缺陷（watch 依赖加入 `listElement.value`）；Enter/Space 键盘激活补 disabled 防护；API 生成物 tabs.json 手动同步 shape 成员（避免 75 文件 node_modules 路径漂移噪音）                          |

---

## 二、行业对标矩阵

| 能力                                 | SoybeanUI | shadcn-vue / Radix `Tabs` | Ant Design `Tabs` | Element Plus `Tabs` |
| :----------------------------------- | :-------: | :-----------------------: | :---------------: | :-----------------: |
| headless/styled 分离                 |    ✅     |            ✅             |         —         |          —          |
| 数据驱动 compact API                 |    ✅     |            ✅             |        ✅         |         ✅          |
| 受控/非受控                          |    ✅     |            ✅             |        ✅         |         ✅          |
| 激活模式（automatic/manual）         |    ✅     |            ✅             |         —         |          —          |
| 键盘导航（roving focus + Home/End）  |    ✅     |            ✅             |        ✅         |         ✅          |
| 禁用标签跳过                         |    ✅     |            ✅             |        ✅         |         ✅          |
| presence / forceMount 内容           |    ✅     |            ✅             |         —         |          —          |
| 动画指示器                           |    ✅     |             —             |        ✅         |          —          |
| 横向 + 纵向                          |    ✅     |            ✅             |        ✅         |         ✅          |
| 变体系统                             |    ✅     |             —             |        ✅         |         ✅          |
| 自定义槽                             |    ✅     |            ✅             |        ✅         |         ✅          |
| ARIA 自动接线（controls/labelledby） |    ✅     |            ✅             |        ✅         |         ✅          |

---

## 三、发现的问题与处理

### 3.1 Major — `shape` 变体配方死代码（已修复，D5）

**问题：** [styles/tabs.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/styles/tabs.ts) 中 `tabsVariants` 已定义 `shape: { rounded, square }` 变体，但 [types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/tabs/types.ts) 的 `TabsProps` 未声明 `shape`，[tabs.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/tabs/tabs.vue) 的 `useOmitProps` 排除列表也无 `'shape'`，`tabsVariants` 调用未传该参数——变体成为不可达死代码，用户无法选择方形/圆角标签。

**修复：**

```ts
// types.ts — 暴露 shape
import type { TabsFill, TabsShape } from '@/styles/tabs';

export interface TabsProps<T extends TabsOptionData = TabsOptionData> extends TabsCompactProps<T> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TabsUi>;
  fill?: TabsFill;
  /** Shape of the component. */
  shape?: TabsShape;
}
```

```ts
// tabs.vue — 排除并透传
const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'fill', 'shape']);
// ...
tabsVariants({ size, orientation, fill, enableIndicator, shape: props.shape }, props.ui, { root: props.class });
```

同步手动更新 [tabs.json](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/generated/api/tabs.json)：`TabsProps` 的 `resolvedType` 追加 `shape?: TabsShape` 并插入完整 member 对象（含 `TabsShape` referencedType）。未重跑 `pnpm sui api`——该命令会因 node_modules 版本路径漂移重新生成 75 个 API 文件（diff 全部为空噪音），已回滚后仅对 tabs.json 应用最小手动 diff。

### 3.2 Major — 指示器初始渲染缺陷（已修复，D7）

**问题：** [tabs-indicator.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/tabs/tabs-indicator.vue#L75-L81) 中 `watch(() => [modelValue.value, dir.value], ..., { immediate: true, flush: 'post' })` 在 `listElement` ref 回调（`useForwardElement`，组件更新期间异步触发）之前执行。首次执行时 `listElement.value` 仍为 `undefined`，`updateIndicatorStyle` 走 `if (!activeTab) return` 提前退出，`indicatorStyle.size` 保持 `null`，模板 `v-if="typeof indicatorStyle.size === 'number'"` 永远不渲染——指示器在首次挂载时消失。

**调试证据：** 直接 mount 时 `[data-soybean-tabs-indicator]` 存在性为 `false`，但 `nextTick` 后执行 `setProps({ modelValue })` 变为 `true`——证明是初始测量时序 bug 而非逻辑缺失。

**修复：** watch 依赖数组加入 `listElement.value`，ref 回调赋值后重新触发测量：

```ts
watch(
  () => [modelValue.value, dir.value, listElement.value],
  () => {
    updateIndicatorStyle();
  },
  { immediate: true, flush: 'post' }
);
```

修复后 30/30 测试通过（含新增的 indicator 渲染/定位套件）。

### 3.3 Minor — 禁用触发器键盘激活未防护（已修复，D7-05）

**问题：** [tabs-trigger.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/tabs/tabs-trigger.vue#L40-L44) 的 `onKeyDown`（Enter/Space 激活）未检查 `props.disabled`，而 `onMouseDown`/`onFocus` 均有防护——禁用标签仍可通过键盘激活，行为不一致。

**修复：**

```ts
const onKeyDown = () => {
  if (!props.disabled) {
    changeModelValue(props.value);
  }
};
```

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                 |
| :----------------- | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-08** 键盘导航 |  ✅  | `TabsList` 基于 `RovingFocusGroup`：ArrowLeft/Right（纵向 ArrowUp/Down）方向键移动、Home/End 首尾跳转、`wrapArray` 跳过禁用项；Enter/Space 激活当前标签；`activationMode: 'automatic'` 时 focus 即激活（[tabs-trigger.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/tabs/tabs-trigger.vue#L46-L52)） |
| **D1-16** 动画     |  ✅  | 指示器以 CSS 变量 `--soybean-tabs-indicator-size` / `--soybean-tabs-indicator-position` 定位，`useResizeObserver` 监听 list + tabs 变化实时重测；RTL 下偏移镜像为 `list.clientWidth - offsetLeft - offsetWidth` 且 CSS `rtl:-translate-x-…` 翻转；内容面板 `usePresence` 支持退场动画后再卸载                                                        |
| **D2-11** 防篡改   |  —   | 标签页为导航控件，无遮罩/水印等防篡改需求；`activationMode`/presence/indicator 对标覆盖 `D2-02`                                                                                                                                                                                                                                                      |
| **D7-05** 无障碍   |  ✅  | 触发键 `role="tab"` + `aria-selected` + `aria-controls`（面板注册后才输出），面板 `role="tabpanel"` + `aria-labelledby` 回指，list `role="tablist"` + `aria-orientation`；axe-core 扫描无违规（含颜色对比）                                                                                                                                          |

---

## 五、架构亮点

### 确定性 ARIA id 注册（`context.ts`）

`getId(value)` 生成确定性 id（`soybean-tabs-trigger-{value}` / `soybean-tabs-content-{value}`），Content 通过 `registerContentId`/`unregisterContentId` 在挂载时登记；`existContentId` 是响应式布尔——trigger 的 `aria-controls` 仅在对应面板真实注册后才输出，动态增删 items 时 ARIA 始终同步，无悬挂引用。

### 泛型 Compact + useControllableState 双通道（`tabs-compact.vue`）

`TabsCompact<T extends TabsOptionData>` 用 `useControllableState` 管理 `modelValue`：受控时内部写操作仅触发 `update:modelValue`，DOM 跟随 prop；非受控时写回内部状态。item 循环渲染 `TabsTrigger`/`TabsContent`，`enableIndicator` 决定是否挂载 `TabsIndicator`；3 个插槽（trigger/content/indicator）全部可覆盖默认组合。

### 指示器测量管线（`tabs-indicator.vue`）

`watchPostEffect` 收集 `[role="tab"]` 元素集 → `useResizeObserver(computed(() => [listElement, ...tabs]))` 监听布局变化 → watch（依赖含 `listElement.value`）在 value/direction/ref 就绪三个时机重测；`getHorizontalIndicatorPosition` 对 RTL 镜像偏移。测量成功前渲染抑制（`v-if`），避免 0 尺寸闪烁。

### 禁用语义（roving focus 协作）

禁用标签保留 `data-disabled`（非原生 `disabled`），使 RovingFocusGroup 仍能遍历并跳过（`focusable: !disabled`），同时 mousedown/focus/keydown 三条路径全部阻断激活——聚焦能力与激活行为解耦。

---

## 六、变更文件清单

| 文件                                                       | 变更类型                                                                                                                                                                                                        |
| :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/src/components/tabs/types.ts`                 | 新增 `shape?: TabsShape` 到 `TabsProps` 并导入 `TabsShape`                                                                                                                                                      |
| `packages/ui/src/components/tabs/tabs.vue`                 | `useOmitProps` 排除列表新增 `'shape'`；`tabsVariants` 调用传入 `shape: props.shape`（消除配方死代码）                                                                                                           |
| `packages/headless/src/components/tabs/tabs-indicator.vue` | 修复初始渲染缺陷：watch 依赖数组加入 `listElement.value`，ref 就绪后触发首次测量                                                                                                                                |
| `packages/headless/src/components/tabs/tabs-trigger.vue`   | 修复禁用态键盘激活：`onKeyDown` 增加 `if (!props.disabled)` 防护                                                                                                                                                |
| `packages/ui/test/specs/components/tabs.spec.ts`           | 从 10 项扩展到 30 项（rendering / active state（含 RTL+垂直指示器定位）/ activation mode / keyboard（roving focus + 禁用跳过）/ disabled / content mounting / aria / indicator / variants（含 shape）/ axe ×2） |
| `apps/docs/src/generated/api/tabs.json`                    | 手动同步 `shape` member（`TabsProps.resolvedType` + referencedType）；避免 `pnpm sui api` 的 75 文件 node_modules 路径漂移噪音                                                                                  |
| `apps/docs/src/docs/en/components/tabs.md`                 | 重写：Features（11 条）+ Notes（架构对标表 12 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                                                                                         |
| `apps/docs/src/docs/zh-CN/components/tabs.md`              | 重写：功能（11 条）+ 备注（架构对标表 12 维度 + 运行时注意事项 7 条）+ 常见问题（6 条）                                                                                                                         |
| `docs/check.md`                                            | 标记 C22 各维度为 ✅，模式修正为「多槽 + Compact」                                                                                                                                                              |

---

## 七、验证命令

```bash
# 单元测试（30 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/tabs.spec.ts
# → Test Files 1 passed (1) | Tests 30 passed (30)

# 类型检查（全工作区通过）
pnpm typecheck
# → 全部 Done

# Lint
pnpm lint
# → 0 errors（2 个 ignored-file warnings 与本次变更无关）
```

---

## 八、遗留 P3 增强项

- **`aria-controls` 渐进输出**：trigger 的 `aria-controls` 依赖面板注册（`existContentId`），首帧可能短暂缺失。此为满足确定性 id 与动态 items 一致性的权衡，可考虑注册表初始化时预置默认值。记录为增强项，非阻塞。
- **指示器测量仅覆盖 offset 几何**：`offsetWidth`/`offsetLeft` 不含 transform/过渡动画中间态；极端布局（旋转、缩放容器）下指示器定位依赖 CSS 变量同步。记录为增强项，非阻塞。
- **e2e 键盘导航**：`tabs` 在 check.md 的 D7-19/D7-20 e2e 范围内（键盘导航类），当前依赖单元测试 + axe 静态扫描；roving focus 方向键与 Home/End 的端到端验证留待 e2e 专项补充，非 Blocker。
