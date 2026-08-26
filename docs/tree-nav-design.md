# TreeNav 组件设计方案（水平版 TreeMenu）

> 状态：待评审（已吸收决策记录，见文末）
> 作者：AI Assistant
> 日期：2026-08-27

## 0. 已确认决策记录

| #   | 决策点               | 结论                                                                                                                                                        |
| --- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | 命名                 | headless 目录 `tree-nav`，UI 导出 `STreeNav`                                                                                                                |
| D2  | 分支弹层默认展开方式 | **`hover`**（`click` 作为可选覆盖）                                                                                                                         |
| D3  | Menubar 侧改动       | 全部保持原样（此前的高亮改造已由使用者回滚），本组件不触碰 menubar                                                                                          |
| D4  | v1 范围              | **包含**顶层溢出折叠（collapsible）能力                                                                                                                     |
| D5  | 键盘导航             | TreeNav 与 TreeMenu 共同接入共享树键盘导航能力，方案见 [tree-keyboard-navigation.md](./tree-keyboard-navigation.md)；方向键只漫游焦点、Enter/Space 显式激活 |

## 1. 背景与动机

### 1.1 问题起源

在为 `Menubar` 优化 `activeValue` 高亮逻辑的过程中确认了一个根本性矛盾：

- **Menubar 的内核是 ARIA menubar 命令菜单模式**：`modelValue` 表达"哪个菜单正打开"（瞬态 UI 态，关闭即清空），高亮语义只能靠外部输入 `activeValue` 注入；
- **导航场景需要的是持久选择态**：用户选中某叶子后，祖先触发器持续携带 `data-child-active`、叶子自身持续携带 `data-active`，与"是否打开过菜单"无关。

将两者强行收敛到 Menubar 上（把 `modelValue` 重定义为选择值、open 态内部化）会引入双受控值与破坏性 API 变更。经分析确认：**应新建独立组件**，而非继续改造 Menubar。

### 1.2 目标形态

一个由树形数据驱动的**水平导航栏**：

```
┌──────────────────────────────────────────────────────┐
│  Docs ▾   Blog ▾   Pricing    GitHub ↗               │   ← 顶层横向排列
└──────────────────────────────────────────────────────┘
              │
              ▼ (DropdownMenu 弹层)
         ┌──────────────┐
         │ Getting Started │ ← data-active（当前选中）
         │ Components ▸ │ ── data-child-active? 由 activePaths 派生
         └──────────────┘
```

- 顶层叶子项（含链接项）：点击即选中 → `data-active`；
- 顶层分支项：点击/悬停展开弹层；当任一后代被选中时 → `data-child-active`；
- 弹层内递归子树：深层分支向右展开（`MenuSub`），叶子点击后自动收起并更新选择。

## 2. 与既有组件的边界

| 组件                     | 内核状态                              | 定位                             | 是否承载本需求       |
| ------------------------ | ------------------------------------- | -------------------------------- | -------------------- |
| `Menubar` / `SMenubar`   | open 态 + 外部 `activeValue`          | 应用命令菜单（File/Edit）        | 否                   |
| `NavigationMenu`         | 无选择态高亮派生                      | Radix 风格内容型横向导航         | 否                   |
| `TreeMenu` / `STreeMenu` | 持久 selection（`v-model`）           | **垂直侧边栏**，Collapsible 展开 | 需求来源，不复用布局 |
| **TreeNav（本方案）**    | 持久 selection（`v-model`）+ 弹层展开 | **水平顶部导航栏**               | ✅                   |

复用 TreeMenu 的**状态模型**（selection → `getTreePaths` → 高亮派生），但渲染载体改为 DropdownMenu 弹层。

## 3. 状态模型设计

### 3.1 单一数据源

```ts
// 非受控内部态 + 受控代理（纯 computed 派生，无 watcher）
const innerValue = shallowRef<T | undefined>(props.defaultValue);
const isControlled = computed(() => props.modelValue !== undefined);
const selected = computed<T | undefined>(() => (isControlled.value ? props.modelValue : innerValue.value));

const setSelection = (value: T) => {
  if (!isControlled.value) innerValue.value = value;
  emit('update:modelValue', value);
};
```

选材说明：不使用 `useControllableState` 是因为其泛型约束要求非 undefined 默认值（`''` 对泛型 T 不安全），此处手写受控/非受控派生更精确且零类型逃逸。

### 3.2 高亮派生

```ts
// 复用 packages/headless/src/shared/tree.ts 的 getTreePaths（已验证可匹配 MenuOptionData）
const activePaths = computed(() => {
  const value = selected.value;
  return value === undefined ? [] : getTreePaths(value, props.items);
});

const isItemActive = (item: MenuOptionData<T>) => selected.value === item.value;
const isItemChildActive = (item: MenuOptionData<T>) => activePaths.value.includes(item.value);
```

- 叶子命中 `selected` → 顶层叶子按钮/链接携带 `data-active="true"`；
- 分支命中的祖先链 → 触发器携带 `data-child-active=""`（presence 属性，与 Menu 子触发器约定一致）。

### 3.4 属性契约（精确约定）

| 属性                             | 出现位置                           | 形态                                                  | 样式选择器              |
| -------------------------------- | ---------------------------------- | ----------------------------------------------------- | ----------------------- |
| `data-soybean-tree-nav`          | 根元素                             | 固定标记                                              | e2e 定位                |
| `data-soybean-tree-nav-overflow` | 折叠测量容器                       | 仅 collapsible 时渲染                                 | 测试定位                |
| `data-active`                    | 顶层叶子按钮/链接/分支触发器       | **恒显布尔串** `"true"/"false"`（分支恒为 `"false"`） | `data-[active=true]:…`  |
| `data-child-active`              | 分支触发器（顶层与弹层内子触发器） | presence，命中时空串、未命中省略                      | `data-[child-active]:…` |
| `data-state=open`                | 打开中的分支触发器/弹层            | 由 DropdownMenu 内部维护                              | `data-[state=open]:…`   |

说明：`data-active` 采用恒显形态是为了让 CSS 只需一个激活态选择器（`.not([data-active=false])` 无需关心），同时测试断言可以直接读字符串值；这与 Menubar trigger 的既有惯例一致。

### 3.3 下传给弹层的关键设计

顶层分支直接使用 headless `DropdownMenuCompact`，并把 `selected` 以 `active-value` 传入：

```vue
<DropdownMenuCompact :items="item.children ?? []" :active-value="selected" @select="onSelect">
```

`MenuOptionsCompact` 内部会对每层递归调用 `getTreePaths(activeValue, items)`：

- 弹层内叶子命中 → `data-active`
- 弹层内祖先子触发器 → `data-child-active`

**整棵树的高亮派生因此完全内聚，组件本身不需要关心深度**——这是选择复用 Menu 家族而非自写递归渲染的核心原因。

## 4. 数据模型

直接复用 `@soybeanjs/headless/menu` 的 `MenuOptionData<T>`，字段映射：

| 字段                                      | 顶层行为                        | 弹层内行为                         |
| ----------------------------------------- | ------------------------------- | ---------------------------------- |
| `value`                                   | 选择标识                        | 同左                               |
| `label`                                   | 显示文本                        | 同左                               |
| `icon`                                    | 前置图标                        | 同左                               |
| `children`                                | 有则渲染为分支 + 弹层           | 递归子分支                         |
| `to` / `href` / `target` / `external`     | 渲染为 `<Link>`（点击同时选中） | 走 MenuOptionsCompact 自带链接渲染 |
| `disabled`                                | 整个条目惰性化                  | MenuItem disabled                  |
| `shortcut` / `separator` / `isGroupLabel` | 忽略（仅弹层语义）              | 原生支持                           |

不做字段转换层 —— 消费者一份 items 可同时喂给垂直 `STreeMenu` 与水平 `STreeNav`。

## 5. 结构设计

### 5.1 Headless 层（`packages/headless/src/components/tree-nav/`）

```
tree-nav/
├── types.ts              # Props/Emits/Slots/UiSlot（已起草）
├── context.ts            # provideTreeNavUi / useTreeNavUi（桥接 provideMenuUi）
├── tree-nav-compact.vue  # Compact 聚合实现（唯一 SFC）
└── index.ts              # 导出 Compact + provideUi + 类型
```

**Compact 聚合模式依据**：结构稳定、数据驱动、headless 掌控编排——完全符合 SKILL.md 的 Compact 适用条件。遵循分层规则：headless 零样式；无 ARIA 到 UI 层泄漏；仅依赖公开的 dropdown-menu 子路径导出。

`context.ts` 完全镜像 [menubar/context.ts](../packages/headless/src/components/menubar/context.ts) 的写法：

```ts
export const [provideTreeNavUi, useTreeNavUi] = useUiContext<TreeNavUiSlot>('TreeNavUi', ui => {
  provideMenuUi(ui); // 让弹层内的 Menu 族消费同类 token（缺失槽位自然回退）
  return ui;
});
```

### 5.2 溢出折叠设计（v1 内含，D4）

仿照 [menubar-compact.vue](../packages/headless/src/components/menubar/menubar-compact.vue) 已验证的 reflow 折叠机制，在 `tree-nav-compact.vue` 内部实现：

```
Primitive (root, flex)
└── div[data-soybean-tree-nav-overflow]   ← 测量容器（绝对铺满、invisible 隔离测量）
    └── 原始全量 items 渲染（用于测量宽度）
内部可见区 = items 中放得下的部分；剩余 → "more" 分支
```

- **more 触发器**：复用分支渲染逻辑（`DropdownMenuCompact :items="moreItems" :active-value="selected"`），默认 label 为 `More` + `lucide:ellipsis` 图标，可通过 props/slots 覆写；
- **高亮一致性**：`moreItems` 是同一份 `items` 的切片，因此 `activePaths` 派生天然覆盖折叠项——被折叠的选中叶子所在祖先链会正常携带 `data-child-active`；
- **实现策略**：v1 在本组件内复制 menubar 已验证的 reflow 逻辑（约 60 行，基于 ResizeObserver + 逐项贪心收缩），**不抽取共享 composable**——避免再次触碰 menubar（D3）；公共化重构留待独立任务评估。

新增 API：

| Prop          | 类型        | 默认                | 说明                       |
| ------------- | ----------- | ------------------- | -------------------------- |
| `collapsible` | `boolean`   | `false`             | 是否启用顶层溢出折叠       |
| `moreLabel`   | `string`    | `'More'`            | more 触发器文本            |
| `moreIcon`    | `IconValue` | `'lucide:ellipsis'` | more 触发器图标            |
| `moreProps`   | 对象        | —                   | 转发给 more 触发按钮的属性 |

| Slot           | 参数                          | 说明                 |
| -------------- | ----------------------------- | -------------------- |
| `more-trigger` | `{ item: MenuOptionData<T> }` | 覆写 more 触发器内容 |

### 5.3 tree-nav-compact.vue 内部结构

```vue
<Primitive :as="as" :as-child="asChild" data-soybean-tree-nav :class="cls.root">
  <!-- collapsible 时外层增加测量容器，见附录 B -->
  <template v-for="item in items" :key="item.value">

    <!-- A. 顶层链接叶子 -->
    <Link v-if="isLink(item)" v-slot="{ isHref }" v-bind="linkProps"
      :class="cls.item" :data-active="isItemActive(item)"
      @click="onSelect(item, $event)">
      <slot name="item" :item="item"> …leading/icon/label/trailing/link-icon… </slot>
    </Link>

    <!-- B. 顶层分支 -->
    <DropdownMenuCompact v-else-if="item.children?.length"
      :items="item.children" :active-value="selected"
      :trigger="trigger" :delay-duration="delayDuration" :skip-delay-duration="skipDelayDuration"
      :placement="placement" :show-arrow="showArrow"
      :disabled="props.disabled || item.disabled"
      :dir="dir" :portal-props="portalProps" :popup-props="popupProps" :arrow-props="arrowProps"
      :item-props="itemProps" :link-props="linkProps" :group-label-props="groupLabelProps"
      :shortcut-props="shortcutProps" :separator-props="separatorProps"
      :sub-trigger-props="subTriggerProps" :sub-content-props="subContentProps"
      @select="onSelect">
      <template #trigger>
        <Button :class="cls.item"
          :data-active="false"                          <!-- 分支永不 data-active -->
          :data-child-active="isItemChildActive(item) ? '' : undefined"
          :disabled="props.disabled || item.disabled">
          <slot name="item" :item="item"> …leading/icon/label/trailing/chevron-down… </slot>
        </Button>
      </template>
      <template v-for="name in menuSlotNames" #[name]="props"><slot :name="name" v-bind="props"/></template>
    </DropdownMenuCompact>

    <!-- C. 顶层普通叶子 -->
    <Button v-else :class="cls.item"
      :data-active="isItemActive(item)" :data-child-active="undefined"
      :disabled="props.disabled || item.disabled"
      @click="onSelect(item, $event)">
      <slot name="item" :item="item"> …leading/icon/label/trailing… </slot>
    </Button>

  </template>
</Primitive>
```

要点：

1. **分支永不携带 `data-active`**（即使 `value === selected` 的极端情况），与 TreeMenu「容器节点禁用 active」的行为对齐；
2. `aria-haspopup` / `aria-expanded` / Escape 关闭等全部继承 DropdownMenu 内部实现，不在本组件重复；
3. 选中路径：叶子点击 → `setSelection(value)` + `emit('select')`；弹层内叶子由 Menu 机制自动关闭浮层。

### 5.4 UI 层（`packages/ui/`）

```
styles/tree-nav.ts            # scv() 配方，首行 // @unocss-include
components/tree-nav/
├── types.ts                  # extends TreeNavCompactProps + class/size/ui/variant
├── tree-nav.vue              # STreeNav 包装
└── index.ts                  # export type 回传 headless/tree-nav
```

样式配方 slots（`TreeNavUiSlot` 一一对应）：

```ts
slots: {
  root: 'flex w-fit items-center rounded-md',
  item: [
    'flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.25',
    'font-medium text-sm outline-none transition-colors-200',
    'hover:bg-accent focus-visible:bg-accent focus-visible:text-accent-foreground',
    'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
    'data-[child-active]:text-primary'
  ],
  itemIcon: 'size-4 shrink-0 text-muted-foreground',
  itemChevron: 'ms-auto size-3.5 shrink-0 text-muted-foreground',  // 根节点触发器用 group-data/state 旋转可选
  itemLinkIcon: 'size-3.5 shrink-0'
}
variants: { size: ThemeSize 六档（gap/text/padding 缩放）, variant: default(边框底色阴影)/nav(纯净) }
defaultVariants: { size: 'md', variant: 'default' }
```

`STreeNav` 包装模式与 SMenubar 相同：`useOmitProps` 剥离 class/size/ui/variant → `scv()` 合成 ui map → `provideTreeNavUi(ui)`，并额外 `provideMenuUi(() => props)` 保持与 SMenubar 对弹层样式的透传方式一致。

### 5.5 公开 API 总表

#### TreeNavCompactProps / STreeNavProps（含默认值）

| Prop                                   | 类型                  | 默认                | 说明                             |
| -------------------------------------- | --------------------- | ------------------- | -------------------------------- |
| `items`*                               | `MenuOptionData<T>[]` | —                   | 树形数据源                       |
| `modelValue` (`v-model`)               | `T`                   | —                   | 当前选中值                       |
| `defaultValue`                         | `T`                   | —                   | 非受控初始值                     |
| `as` / `asChild`                       | 继承 Primitive        | `'nav'`             | 根元素（原生导航语义）           |
| `dir`                                  | `Direction`           | 继承 ConfigProvider | RTL/LTR                          |
| `trigger`                              | `'click' \| 'hover'`  | **`'hover'`**       | 分支弹层展开方式（D2）           |
| `delayDuration`                        | `number`              | `150`               | hover 打开延迟                   |
| `skipDelayDuration`                    | `number`              | `300`               | hover 连续进入宽限               |
| `placement`                            | `Placement`           | `'bottom-start'`    | 分支弹层位置                     |
| `showArrow`                            | `boolean`             | `false`             | 分支弹层箭头                     |
| `disabled`                             | `boolean`             | `false`             | 禁用整条栏                       |
| `collapsible`                          | `boolean`             | `false`             | 顶层溢出折叠（D4）               |
| `moreLabel` / `moreIcon` / `moreProps` | 见 §5.2               | —                   | more 触发器定制                  |
| `linkProps` 等 8 个透传                | 见 types.ts           | —                   | 转发到 Link / MenuOptions / 浮层 |

> UI 层附加：`class`、`size?: ThemeSize`、`variant?: 'default' | 'nav'`、`ui?: Partial<TreeNavUi>`。

#### Emits

| 事件                | 载荷                                      | 说明           |
| ------------------- | ----------------------------------------- | -------------- |
| `update:modelValue` | `[value: T]`                              | 选中变化       |
| `select`            | `[item: MenuOptionData<T>, event: Event]` | 任一叶子被选中 |

#### Slots

| 插槽                             | 参数       | 说明                                          |
| -------------------------------- | ---------- | --------------------------------------------- |
| `item`                           | `{ item }` | 替换条目默认内容（顶层 + 弹层同槽位转发）     |
| `item-leading` / `item-trailing` | `{ item }` | 前/后置自定义区                               |
| `item-trigger-icon`              | `{ item }` | 分支 chevron 覆盖（顶层）                     |
| `item-link-icon`                 | `{ item }` | 外链箭头覆盖（顶层；弹层走 MenuOptions 自带） |
| `more-trigger`                   | `{ item }` | 覆写溢出折叠的 more 触发器内容                |

## 6. 无障碍方案

- 根元素默认 `as='nav'`（原生导航 landmark 语义，无需额外 role）；消费者可通过 `as` / `as-child` / `aria-label` 覆写，attrs 经 Vue 默认继承落到根节点，**不使用 `menubar` 角色** —— 本组件不是命令菜单模式；
- 分支触发的 `aria-haspopup` / `aria-expanded` / `aria-controls`、弹层焦点陷阱、Escape 关闭均继承 headless DropdownMenu 已有机制，本组件零重复；
- 键盘：按 [tree-keyboard-navigation.md](./tree-keyboard-navigation.md) §4.2 的水平化映射接入共享树键盘导航能力——关闭态顶层 roving（→/← 相邻漫游 + Home/End）、→ 展开分支；弹层打开期间的键盘全权交由 Menu 机制接管；Enter/Space 显式激活。关闭态与打开态的边界互不越界；
- 测试纳入 axe-core 校验（unit spec 关 color-contrast，对齐 menubar.spec 既有做法）。

## 7. 复用清单（为何不新造轮子）

| 能力                                 | 来源                               | 新增代码量                               |
| ------------------------------------ | ---------------------------------- | ---------------------------------------- |
| 树路径派生                           | `shared/tree.ts#getTreePaths`      | 0                                        |
| 分支浮层全交互                       | headless `DropdownMenuCompact`     | 0                                        |
| 弹层内递归选项 + active/child-active | headless `MenuOptionsCompact`      | 0                                        |
| 受控/非受控                          | 手写 12 行纯 computed 派生         | 小（composable 泛型不适配，理由见 §3.1） |
| 数据/链接/图标                       | `MenuOptionData` / `Link` / `Icon` | 0                                        |

新写的实质内容 ≈ 一个 ~150 行的组装 SFC + 配方 + 包装。这满足 SKILL.md "Reuse existing building blocks first" 且每处复用均有明确出处。

## 8. 交付面清单

| 面         | 内容                                                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| headless   | 上述 4 文件 + `src/index.ts` 追加 `export * from './components/tree-nav'` + `pnpm sui headless`                                                       |
| ui         | styles/tree-nav.ts + components/tree-nav 3 文件 + `src/index.ts` + `pnpm sui ui`                                                                      |
| playground | `apps/playground/src/examples/ui/tree-nav/`：01-basic、02-selection（路由驱动示例，树立"打开≠激活"的正确用法）、03-links、04-disabled、05-collapsible |
| docs       | en / zh-CN 两页 `{component}.md`（Usage/Demos/API 四件套）+ `menus.ts` 注册                                                                           |
| tests      | `packages/ui/test/specs/components/tree-nav.spec.ts`（用例见 §9）                                                                                     |
| generated  | `pnpm sui api` + `sui api-translate -- --locale zh-CN`；`sui changelog` + translate                                                                   |

Menubar 保持原样（D3）：不做任何改动、不修正其示例；"打开≠激活"的正确用法由本组件及其 playground 示例承载。

## 9. 测试用例规划（vitest + happy-dom）

> 默认 trigger 为 `hover`（D2）。happy-dom 下 hover 打开浮层的时序较脆弱，交互类用例统一传 `trigger="click"` 驱动打开/关闭断言；hover 模式的默认行为另设 1-2 个冒烟用例覆盖（触发 pointerenter 后浮层出现），复杂时序留给 browser e2e 兜底。

1. **rendering**：root 渲染、三类顶层条目数量/标签正确、链接项输出 `<a href>`；
2. **selection**：
   - 点击普通叶子 → emit `update:modelValue` + 该项 `data-active=true`；
   - 点击弹层内深层叶子 → 同上，且顶层分支获得 `data-child-active`、其他分支未携带；
   - `modelValue='email'` 直接挂载 → File 分支 `data-child-active`（路径派生效验）；
   - 受控：不透传 update 时选中值不变；
3. **branch popup**：pointerdown 打开弹层、`data-state=open`、portal disabled 下内容可查询、Esc 关闭；
4. **overflow collapsing**：
   - `collapsible` 未开启时不渲染测量容器与 more 触发器；
   - 容器宽度受限时超宽条目移入 more 菜单、可见区不含被折叠项；
   - more 菜单内选中深层叶子 → 顶层对应祖先仍携带 `data-child-active`（切片派生不破坏高亮）；
5. **disabled**：条目级 & 全栏级惰性（aria-disabled、不可打开弹层）;
6. **keyboard**（按 [tree-keyboard-navigation.md](./tree-keyboard-navigation.md) §5）：关闭态顶层 roving（单一 Tab 停留点、→/← 相邻漫游、Home/End）、→ 展开分支弹层且后续焦点交由 Menu 接管、Enter/Space 激活叶子仅触发一次 select；
7. **a11y**：axe 无违规（关闭态 + 打开态两轮）。

## 10. 边界与非目标（v1 明确不做）

- ❌ mega-menu 多列内容面板 —— 非 TreeMenu 语义；
- ❌ expanded 展开态受控 —— 打开态属浮层瞬时行为，参照 Menubar 决策不暴露；
- ❌ type-ahead 打字定位 / `*` 全展开同级 —— 键盘导航的可选增强，见 tree-keyboard-navigation.md §7 O2。

溢出折叠已按 D4 纳入 v1（见 §5.2）；键盘方向键漫游已按 D5 纳入（§6 及关联文档）。

## 11. 风险与开放问题

1. **泛型与 sui api 提取**：`TreeNavCompactEmits` 为 interface 形式的具名事件类型（等价 MenubarRootEmits 的 tuple 写法），需跑 `pnpm sui api` 确认生成器解析正常；
2. **默认 hover 触发在 happy-dom 的稳定性**：见 §9 注记——冒烟覆盖 + browser e2e 兜底，必要时允许测试改写为 click 驱动而不削弱覆盖语义；
3. **折叠 reflow 在 SSR/静态渲染下的初始闪烁**：首帧按全量渲染测量后再收缩，与 menubar 现状一致，不额外做防闪烁优化（v1 接受）。

---

## 附录 A · types.ts 全量骨架（终稿基准）

```ts
import type { Direction, Placement } from '../../types';
import type { DropdownMenuTriggerType } from '../dropdown-menu/types';
import type {
  MenuArrowProps,
  MenuGroupLabelProps,
  MenuItemProps,
  MenuOptionCompactSlots,
  MenuOptionData,
  MenuPopupProps,
  MenuPortalProps,
  MenuSeparatorProps,
  MenuShortcutProps,
  MenuSubContentProps,
  MenuSubTriggerProps
} from '../menu';
import type { IconValue } from '../_icon/types';
import type { LinkExtraProps } from '../link/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

export interface TreeNavCompactProps<T extends DefinedValue = DefinedValue> extends Omit<
  PrimitiveWithBaseProps,
  'onSelect'
> {
  /** The value of the currently selected item. Can be used as `v-model`. */
  modelValue?: T;
  /** The value of the item that should be selected when initially rendered. */
  defaultValue?: T;
  /** The tree items rendered as top-level navigation entries. */
  items: MenuOptionData<T>[];
  dir?: Direction;
  /** @defaultValue 'hover' */
  trigger?: DropdownMenuTriggerType;
  delayDuration?: number; // 150
  skipDelayDuration?: number; // 300
  placement?: Placement; // 'bottom-start'
  showArrow?: boolean; // false
  disabled?: boolean;
  /** Whether top-level overflow items collapse into a "more" branch popup. @defaultValue false */
  collapsible?: boolean;
  /** @defaultValue 'More' */
  moreLabel?: string;
  moreIcon?: IconValue; // 'lucide:ellipsis'
  moreProps?: ButtonProps;
  linkProps?: LinkExtraProps;
  itemProps?: MenuItemProps;
  groupLabelProps?: MenuGroupLabelProps;
  shortcutProps?: MenuShortcutProps;
  separatorProps?: MenuSeparatorProps;
  subTriggerProps?: MenuSubTriggerProps;
  subContentProps?: MenuSubContentProps;
  portalProps?: MenuPortalProps;
  popupProps?: MenuPopupProps;
  arrowProps?: MenuArrowProps;
}

export interface TreeNavCompactEmits<T extends DefinedValue = DefinedValue> {
  'update:modelValue': [value: T];
  select: [item: MenuOptionData<T>, event: Event];
}

export type TreeNavCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionCompactSlots<T> & {
  'more-trigger': (props: { item: MenuOptionData<T> }) => any;
};

export type TreeNavUiSlot = 'root' | 'item' | 'itemIcon' | 'itemChevron' | 'itemLinkIcon';
export type TreeNavUi = Record<TreeNavUiSlot, string>;
```

要点：emits 采用 interface 具名 tuple 形式；`more-trigger` 是本组件唯一自有插槽，其余槽位别名转发到 `MenuOptionCompactSlots`。

## 附录 B · tree-nav-compact.vue 结构骨架

```ts
// —— 状态 ——
const innerValue = shallowRef(props.defaultValue);
const isControlled = computed(() => props.modelValue !== undefined);
const selected = computed(() => (isControlled.value ? props.modelValue : innerValue.value));
const setSelection = (v: T) => {
  if (!isControlled.value) innerValue.value = v;
  emit('update:modelValue', v);
};
const onSelect = (item: MenuOptionData<T>, event: Event) => {
  if (item.disabled || props.disabled) return;
  setSelection(item.value);
  emit('select', item, event);
};

// —— 派生 ——
const activePaths = computed(() => (selected.value === undefined ? [] : getTreePaths(selected.value, props.items)));
const isActive = (i: MenuOptionData<T>) => selected.value === i.value;
const isChildActive = (i: MenuOptionData<T>) => activePaths.value.includes(i.value);

// —— 溢出折叠（collapsible 时）——
// containerWidth ← ResizeObserver(rootElement)
// wrapperItems   ← 全量 items 的隐形测量容器宽度数组（逐项 offsetWidth + gap）
// visibleCount   ← 贪心：Σ(前 n 项宽 + moreTrigger 预留宽) ≤ containerWidth 的最大 n
// moreItems      ← computed(() => items.slice(visibleCount))
// 触发时机：containerWidth / items 引用变化 → requestAnimationFrame 重算（对齐 menubar reflow 循环）
```

模板层次：

```vue
<Primitive data-soybean-tree-nav :class="cls.root">
  <div v-if="collapsible" data-soybean-tree-nav-overflow> <!-- absolute inset-0 invisible 测量 -->
    <VisibleRow :items="items"/>      <!-- 仅测量用途 -->
  </div>
  <template v-if="collapsible">
    <TopItem v-for="item in items.slice(0, visibleCount)" :key="item.value" :item="item"/>
    <DropdownMenuCompact v-if="moreItems.length" :items="moreItems" :active-value="selected" @select="onSelect">
      <template #trigger><slot name="more-trigger" :item="moreEntry">…ellipsis…</slot></template>
    </DropdownMenuCompact>
  </template>
  <template v-else>
    <TopItem v-for="item in items" :key="item.value" :item="item"/>
  </template>
</Primitive>

<!-- TopItem = 内联三种分支：Link 叶子 | DropdownMenuCompact 分支 | Button 叶子（见 §5.3）-->
```

实现注意：

- `TopItem` 三态逻辑抽为同文件内函数式渲染片段或子 SFC 均可，优先保持单文件（menubar-compact 同款做法）；
- 折叠开启时选中项若被收进 more 菜单，无需任何特殊处理——`activePaths` 基于 `props.items` 计算，不随切片变化。

## 附录 C · styles/tree-nav.ts 配方草稿

```ts
// @unocss-include
import { scv } from '@soybeanjs/cva';

const sizeMap = {
  xs: { gap: 'gap-2', text: 'text-xs', padding: 'px-1.5 py-1', icon: 'size-3.5' },
  sm: { gap: 'gap-2.5', text: 'text-sm', padding: 'px-2 py-1', icon: 'size-4' },
  md: { gap: 'gap-2.5', text: 'text-sm', padding: 'px-2 py-1.25', icon: 'size-4' },
  lg: { gap: 'gap-3', text: 'text-base', padding: 'px-2.5 py-1.5', icon: 'size-4' },
  xl: { gap: 'gap-3', text: 'text-base', padding: 'px-3 py-2', icon: 'size-4.5' },
  '2xl': { gap: 'gap-3.5', text: 'text-lg', padding: 'px-3 py-2', icon: 'size-5' }
} satisfies Record<ThemeSize, Record<'gap' | 'text' | 'padding' | 'icon', string>>;

export const treeNavVariants = scv(
  {
    base: '',
    variants: {
      size: sizeMap,
      variant: {
        default: { root: 'rounded-md border bg-background shadow-sm p-1' },
        nav: { root: '' }
      }
    },
    defaultVariants: { size: 'md', variant: 'default' },
    slots: {
      root: 'flex w-fit items-center',
      item: [
        'flex cursor-pointer select-none items-center rounded-sm font-medium outline-none',
        'transition-colors-200 focus-visible:bg-accent hover:bg-accent',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
        'data-[child-active]:text-primary'
      ],
      itemIcon: 'shrink-0 text-muted-foreground',
      itemChevron: 'ms-auto shrink-0 text-muted-foreground',
      itemLinkIcon: 'size-3.5 shrink-0'
    }
  },
  props.ui,
  { root: props.class }
);
```

说明：size 通过 `base/slots` 注入 gap/text/padding/icon 四类 token，slots 最终类名由 `{...sizeMap[size], ...staticSlots}` 组合而成——以最终 `cv()/scv()` API 细节为准实现时微调，此处为设计意图表达。

## 附录 D · 执行序列（对齐 SKILL.md Phase 0–6）

| Phase        | 动作                                                                                                                                                                                                         | 校验                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| P0 分类      | 场景=新组件；模式=Compact 聚合；范围=全交付面                                                                                                                                                                | —                         |
| P1 参照      | 已核对 menubar-compact / dropdown-menu-compact / menu-options-compact / tree-menu                                                                                                                            | —                         |
| P2 headless  | types → context → tree-nav-compact.vue → index.ts → `src/index.ts` 追加导出；含键盘导航接入（依赖 `use-roving-tabindex` / `resolveTreeNavigation`，见 tree-keyboard-navigation.md §6 排序）                  | 键盘单测随 headless 提交  |
| P3 ui        | styles/tree-nav.ts → types.ts → tree-nav.vue → index.ts → `src/index.ts` 追加导出                                                                                                                            | —                         |
| P4 generated | `pnpm sui headless` && `pnpm sui ui`（生成器不可手编文件）                                                                                                                                                   | diff 审查                 |
| P5 surfaces  | playground 5 示例 + docs en/zh 页 + menus.ts + spec + browser e2e(Tier1) + app smoke(Tier2) 注册                                                                                                             | —                         |
| P6 validate  | `pnpm typecheck` / `pnpm lint` / `pnpm fmt` / `pnpm vitest packages/ui/test/specs/components/tree-nav.spec.ts` / `pnpm test:e2e`（如环境可用）/ `pnpm sui api` + translate、`pnpm sui changelog` + translate | 全绿后走 finish checklist |

e2e 分层（`.agents/skills/soybean-ui-component-development/e2e.md`）：Tier1 组件级 `packages/ui/test/browser/specs/components/tree-nav.e2e.spec.ts` 覆盖打开/选中/高亮断言 + axe（color-contrast 开启）；Tier2 应用级冒烟把 `STreeNav` 挂入 playground 冒烟页校验 route 驱动 selection。
