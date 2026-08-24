# Enhanced Popper 设计方案

> 定位：基于 Floating UI，在现有定位原语之上扩展触发、开合、嵌套与 dismiss 等通用浮层能力的设计方案；指导 playground 原型与后续 headless 收敛。
> 状态：💡 提案
> 基线：2026-08-24 · 对照源码 `packages/headless/src/components/{popper,popover,tooltip,menu,dropdown-menu,context-menu,hover-card}/`

---

## 1. 目标与范围

### 1.1 目标

在不破坏现有 `Popper`（纯定位原语）公开契约的前提下，设计并落地一套能力更全的 **Enhanced Popper**（下文称 **Popper V2 原型**），优先满足：

1. **`PopperTrigger`**：统一 `trigger: "click" | "hover" | "contextmenu"`。
2. **嵌套 popup**：父子浮层开合联动、指针穿越、dismiss 边界正确。
3. **收敛上层重复逻辑**：从 `Popover` / `Tooltip` / `DropdownMenu` / `ContextMenu` / `HoverCard` 抽取真正属于「浮层壳」的通用能力，下沉到新 Popper，使上层只保留领域语义（dialog / tooltip / menu 等）。

### 1.2 落地策略（强制）

| 阶段        | 位置                                                            | 说明                                                                                                              |
| :---------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **P0 原型** | `apps/playground/src/examples/ui/enhanced-popper/`              | 先在 playground 用本地 `headless/` + `ui/` 验证 API 与交互；**不**改 `packages/headless` / `packages/ui` 公共导出 |
| **P1 收敛** | `packages/headless/src/components/popper/`（或并列 `floating`） | 原型稳定后，按兼容策略迁入 headless                                                                               |
| **P2 消费** | Popover / Tooltip / Menu / …                                    | 逐个改为组合新 API；行为回归由 e2e / playground 覆盖                                                              |

本方案文档只覆盖 **设计与 P0 原型范围**；P1/P2 迁移细则在原型验收后再拆任务。

### 1.3 非目标（本期不做）

- 不重写 Floating UI 定位算法（继续复用 `@floating-ui/dom` + 现有 middleware）。
- 不把 Select 的 `item-aligned` 手工定位并入本期（明确保留为 Select 特例）。
- 不把 Menu 的 roving focus / typeahead / radio-checkbox item 模型下沉到 Popper（领域逻辑仍归 Menu）。
- 不在原型阶段改 `packages/ui` 样式 / 发布包 API / 生成 `sui` 元数据（playground 本地 `ui/` 除外）。

---

## 2. 现状：当前 Popper 是什么

### 2.1 部件

| 部件               | 文件                    | 职责                                                  |
| :----------------- | :---------------------- | :---------------------------------------------------- |
| `PopperRoot`       | `popper-root.vue`       | 提供 `dir` + `anchorElement` / `popupElement` context |
| `PopperAnchor`     | `popper-anchor.vue`     | 注册锚点；支持 `reference?: ReferenceElement`         |
| `PopperPositioner` | `popper-positioner.vue` | `useFloating` + `autoUpdate` + middleware；`@placed`  |
| `PopperPopup`      | `popper-popup.vue`      | 浮层容器；`data-side` / `data-align`；未定位时禁动画  |
| `PopperArrow`      | `popper-arrow.vue`      | 箭头坐标 / 显隐                                       |

底层：`composables/use-floating.ts` → `computePosition`。

### 2.2 已具备

- side / align / `placement`、offset、flip、shift、size、arrow、`hideWhenDetached`
- 碰撞边界 / padding / sticky / `prioritizePosition`
- 虚拟参考元素
- CSS 变量：`--soybean-popper-transform-origin` / `available-width|height` / `anchor-width|height`
- Ui slot：`providePopperUi`（`anchor` | `positioner` | `popup` | `arrow`）

### 2.3 明确不具备（由上层各自实现）

| 能力          | 说明                                                                                |
| :------------ | :---------------------------------------------------------------------------------- |
| Open 状态     | Positioner 未接入 `useFloating({ open })`；无 `useControllableState`                |
| Trigger       | 无 click / hover / contextmenu / focus                                              |
| Dismiss       | 无 outside / Escape；上层用 `useDismissableLayer`                                   |
| Portal        | 各组件自带 `*Portal`                                                                |
| 嵌套协调      | 无 popup stack；每层自包 `PopperRoot`（MenuSub 是唯一完整产品模式）                 |
| Delay / Grace | 无；Tooltip / HoverCard / Dropdown hover / MenuSub 各写一套                         |
| Focus trap    | 无                                                                                  |
| ARIA role     | Popup 不设 role；由 Popover(`dialog`) / Menu(`menu`) / Tooltip(VisuallyHidden) 自管 |
| Presence      | 仅未定位时 `animation: none`；无 `usePresence`                                      |

**结论**：当前 Popper = **定位原语**。交互壳在 4～5 个上层组件平行复制，是 Enhanced Popper 要解决的核心问题。

---

## 3. 上层组件能力盘点（抽取依据）

### 3.1 能力矩阵

图例：✅ 原生 · ◐ 部分/间接 · ✗ 不负责

| 能力               | 当前 Popper |  Popover   | Tooltip  |     DropdownMenu     | ContextMenu |  HoverCard   |
| :----------------- | :---------: | :--------: | :------: | :------------------: | :---------: | :----------: |
| 定位 / 碰撞 / 箭头 |     ✅      |  ✅ 组合   | ✅ 组合  |       ✅ 组合        |   ✅ 组合   |   ✅ 组合    |
| Portal             |      ✗      |     ✅     |    ✅    |          ✅          |     ✅      |      ✅      |
| Open 受控/非受控   |      ✗      |     ✅     |    ✅    |          ✅          |     ✅      |      ✅      |
| Click 触发         |      ✗      |     ✅     | ◐ 用于关 |          ✅          |      ✗      |      ✗       |
| Hover 触发         |      ✗      |     ✗      |    ✅    | ✅ `trigger="hover"` |      ✗      |      ✅      |
| Contextmenu 触发   |      ✗      |     ✗      |    ✗     |          ✗           |     ✅      |      ✗       |
| Focus 触发         |      ✗      |     ✗      |    ✅    |          ✗           |      ✗      |      ✅      |
| 嵌套 / Sub         |      ✗      | ◐ layer 栈 |    ✗     |      ✅ MenuSub      | ✅ MenuSub  | ◐ grace 预留 |
| Dismiss outside    |      ✗      |     ✅     |    ✅    |          ✅          |     ✅      |      ✅      |
| Escape             |      ✗      |     ✅     |    ✅    |          ✅          |     ✅      |      ✅      |
| Focus trap         |      ✗      |  ✅ modal  |    ✗     |       ✅ modal       |  ✅ modal   |      ✗       |
| Open/Close delay   |      ✗      |     ✗      |    ✅    |       ◐ hover        |   ◐ 长按    |      ✅      |
| Grace area         |      ✗      |     ✗      |    ✅    |          ✅          |      ✗      |      ✅      |
| Virtual reference  |     ✅      |     ✅     |    ✅    |          ✅          |  ✅ 点击点  |      ✅      |
| Presence           |      ◐      |     ✅     |    ✅    |          ✅          |     ✅      |      ✅      |

### 3.2 各组件「壳」vs「领域」切分

| 组件             | 应下沉到 Enhanced Popper（壳）                                                         | 应留在组件内（领域）                                                                        |
| :--------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **Popover**      | open、click 触发、dismiss、portal、presence、modal 下 focus/scroll lock 的可选策略钩子 | `role="dialog"`、`aria-labelledby`、Close 按钮语义、Dialog 式 title/description             |
| **Tooltip**      | hover/focus 触发、delay / skipDelay、grace、dismiss、portal、presence                  | `role="tooltip"` + `aria-describedby`、Provider 级跨实例 skipDelay、键盘 focus-visible 策略 |
| **DropdownMenu** | click/hover 触发、delay、grace、open、portal、dismiss 边界                             | `role="menu"`、roving focus、typeahead、item / checkbox / radio、键盘方向键打开             |
| **ContextMenu**  | contextmenu + 触控长按、虚拟点参考、open、portal、dismiss                              | 与 Menu 相同的领域模型                                                                      |
| **HoverCard**    | hover/focus、open/close delay、grace（含 sub 标记）、dismiss、portal                   | 内容语义（通常无 dialog role）、selection 时延迟关闭等产品细节                              |

### 3.3 现有嵌套模式（必须兼容）

1. **MenuSub（完整产品）** — `menu-sub.vue` 嵌套 `PopperRoot`；父关则子关；`menu-sub-trigger` 建 grace polygon；`data-soybean-menu-sub-popup`；非 root dismiss 不关整棵树。
2. **Dropdown hover + submenu** — `useGraceArea` + 同一 `subAreaAttribute`。
3. **HoverCard 预留** — `data-soybean-hover-card-sub-popup`，尚无官方 Sub 组件。
4. **Popover 嵌套其它浮层** — `popover-positioner-impl` 按 dismissable-layer 写/清 `pointer-events`，避免嵌套 Dropdown 关后点击穿透失效。

Enhanced Popper 的嵌套模型应以 **MenuSub + grace + layer 栈** 为基准抽象，而不是另起一套。

---

## 4. 设计原则

1. **分层清晰**：定位（已有）∪ 交互壳（新增）∪ 领域语义（上层）。Enhanced Popper 只到「壳」。
2. **组合优先于替换**：P0 原型新部件与现有 `Popper*` 并存；P1 再决定是扩展现有目录还是 `floating` 新目录。
3. **策略可插拔**：trigger / dismiss / focus / delay 用策略对象或 composable，避免巨型 Root。
4. **嵌套是一等公民**：Root 注册到 parent stack；默认「父关子关」「子区域不触发父 dismiss」。
5. **默认安全**：无障碍与键盘路径有合理默认，但 role 不写死（由上层注入或 `role` prop）。
6. **Playground 可验证**：每个能力对应至少 1 个 example SFC。

---

## 5. 目标架构

### 5.1 部件树

```
PopperRoot                    # open 状态 + nest stack + dir + 元素注册
├── PopperTrigger             # trigger 策略：click | hover | contextmenu（+ 可选 focus）
├── PopperAnchor              # 可选；无 Trigger 时仍可用；或 virtual reference
├── PopperPortal              # 可选 Teleport（原型可先用 headless Portal）
│   └── PopperPositioner      # 现有定位（可薄封装）
│       ├── PopperPopup       # dismiss / presence / data-state / nest 标记
│       │   └── (slot / PopperSub …)
│       └── PopperArrow
└── PopperSub                 # 嵌套：再包一层「子 Root」语义（或 Recursive Root）
    ├── PopperSubTrigger
    └── … 同上 Popup 树
```

> P0 原型命名建议使用前缀 `Ep`（Enhanced Popper）或目录名 `enhanced-popper`，避免与正式 `Popper*` 冲突，例如 `EpRoot` / `EpTrigger`。迁入 headless 后再统一命名。

### 5.2 职责边界

```
┌─────────────────────────────────────────────────────────┐
│  Domain components (Popover / Tooltip / Menu / …)       │
│  role、键盘领域行为、item 模型、Provider 级策略           │
└──────────────────────────▲──────────────────────────────┘
                           │ compose
┌──────────────────────────┴──────────────────────────────┐
│  Enhanced Popper（壳）                                   │
│  open · trigger · nest · dismiss · delay · grace ·      │
│  portal · presence · virtual-ref helper · RTL helper    │
└──────────────────────────▲──────────────────────────────┘
                           │ compose
┌──────────────────────────┴──────────────────────────────┐
│  Current Popper（定位原语，保持）                         │
│  Anchor · Positioner · Popup · Arrow · middleware       │
└──────────────────────────▲──────────────────────────────┘
                           │
                   @floating-ui/dom
```

### 5.3 Context 模型（草案）

```ts
// 逻辑示意，非最终类型文件

type PopperTriggerType = 'click' | 'hover' | 'contextmenu';

interface PopperRootContext {
  dir: ComputedRef<Direction>;
  open: ShallowRef<boolean>;
  onOpenChange: (next: boolean, reason?: OpenChangeReason) => void;
  triggerType: ComputedRef<PopperTriggerType>;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  anchorElement: ShallowRef<ReferenceElement | undefined>;
  popupElement: ShallowRef<HTMLElement | undefined>;
  /** 嵌套 */
  nestingLevel: number;
  parent: PopperRootContext | null;
  registerChild: (child: PopperRootContext) => () => void;
  /** 指针是否处于本层或任一子孙 popup / grace */
  isPointerInTree: ComputedRef<boolean>;
}

type OpenChangeReason =
  | 'trigger-click'
  | 'trigger-hover'
  | 'trigger-contextmenu'
  | 'trigger-focus'
  | 'dismiss-outside'
  | 'dismiss-escape'
  | 'parent-close'
  | 'imperative';
```

---

## 6. API 设计（P0 原型）

### 6.1 `EpRoot`

| Prop / Emit    | 类型                            | 默认                | 说明                      |
| :------------- | :------------------------------ | :------------------ | :------------------------ |
| `open`         | `boolean`                       | —                   | 受控                      |
| `defaultOpen`  | `boolean`                       | `false`             | 非受控初值                |
| `dir`          | `Direction`                     | 继承 ConfigProvider | RTL                       |
| `modal`        | `boolean`                       | 按 trigger 推断¹    | 影响 dismiss / focus 策略 |
| `disabled`     | `boolean`                       | `false`             |                           |
| `@update:open` | `(v: boolean, reason?) => void` |                     |                           |

¹ 推断规则对齐现状：`hover` → 倾向 `modal: false`；`click` / `contextmenu` → 默认 `true`（可覆盖）。

### 6.2 `EpTrigger`（核心新增）

```ts
type EpTriggerType = 'click' | 'hover' | 'contextmenu';

interface EpTriggerProps extends PrimitiveWithBaseProps {
  /** @default 'click' */
  trigger?: EpTriggerType;
  /**
   * hover / 部分 focus 场景：打开延迟
   * @default click: 0 · hover: 150 · contextmenu: 0
   */
  openDelay?: number;
  /**
   * hover：关闭延迟
   * @default 0（Tooltip/HoverCard 上层可再包一层默认）
   */
  closeDelay?: number;
  /**
   * 连续触发时跳过 openDelay（对齐 Tooltip / Dropdown hover 的 skipDelay）
   * @default 300；仅 hover 有意义
   */
  skipDelayDuration?: number;
  /**
   * contextmenu：触控长按打开延迟
   * @default 700
   */
  pressOpenDelay?: number;
  /**
   * 是否额外支持 focus 打开（Tooltip / HoverCard 需要）
   * @default trigger==='hover'
   */
  openOnFocus?: boolean;
  disabled?: boolean;
}
```

#### 行为规格

| `trigger`     | 打开                          | 关闭                                      | 备注                                                                           |
| :------------ | :---------------------------- | :---------------------------------------- | :----------------------------------------------------------------------------- |
| `click`       | click / Space·Enter（button） | 再点 trigger、outside、Escape（策略可配） | 对齐 Popover / Dropdown click                                                  |
| `hover`       | pointer enter（+ delay）      | pointer leave（经 grace）+ 可选 Escape    | 忽略纯 touch 打开（对齐 HoverCard）；可叠加 `openOnFocus`                      |
| `contextmenu` | `contextmenu`；触控长按       | outside / Escape                          | 使用 **点击坐标虚拟 reference**（对齐 ContextMenu）；`preventDefault` 系统菜单 |

实现要点：

- Trigger 默认同时充当 Anchor（内部包 `PopperAnchor`）；若存在独立 `EpAnchor` / `reference`，则 Trigger 只负责事件。
- `contextmenu` 模式下，Root/Positioner 的 reference 切到零尺寸 virtual element（复用 ContextMenu 的 `getBoundingClientRect` 模式）。
- 所有 timer 在 unmount / `disabled` / 父关时清理。

### 6.3 `EpPopup` / Positioner / Arrow / Portal

- **定位 props**：原样透传现有 `PopperPositionerProps`（或直接复用 headless `PopperPositioner`）。
- **Portal**：原型可组合现有 `Portal`；提供 `to` / `disabled`。
- **Presence**：`forceMount` + `data-state="open|closed"` + `usePresence`。
- **Dismiss**：基于 `useDismissableLayer` + `usePopupEvents` 的预设：

| Preset      | 行为                                                                                            |
| :---------- | :---------------------------------------------------------------------------------------------- |
| `modal`     | trapFocus（可选）、outside 关、右键 outside 不关、focusOutside preventDefault、关后回焦 trigger |
| `non-modal` | 点 trigger 不重复开关抖动、Safari focus 二次事件忽略（现有 `usePopupEvents`）                   |
| `hover`     | outside / Escape 可关；focusOutside 默认 preventDefault；依赖 grace                             |

### 6.4 嵌套 API

```vue
<EpRoot v-model:open="open">
  <EpTrigger trigger="click">Open</EpTrigger>
  <EpPortal>
    <EpPositioner>
      <EpPopup>
        Parent content
        <EpSub v-model:open="subOpen">
          <EpSubTrigger>More</EpSubTrigger>
          <EpPortal>
            <EpPositioner :side="dir === 'rtl' ? 'left' : 'right'">
              <EpPopup data-ep-sub-popup>
                Nested content
              </EpPopup>
            </EpPositioner>
          </EpPortal>
        </EpSub>
      </EpPopup>
    </EpPositioner>
  </EpPortal>
</EpRoot>
```

#### 嵌套规则

| 规则           | 行为                                                                                                                                           |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| 注册           | `EpSub` ≡ 嵌套 `EpRoot`，自动 `registerChild`                                                                                                  |
| 父关子关       | 父 `open === false` → 强制子关（对齐 `menu-sub.vue`）                                                                                          |
| Dismiss        | 仅 **根层** 的 outside 关闭整棵树；子层 outside 若落在父 popup 内则不关父                                                                      |
| Grace          | 统一 `useGraceArea`；`subAreaAttribute: 'data-ep-sub-popup'`；SubTrigger leave 可附带 polygon（Menu 现有逻辑可抽 `createSubmenuGracePolygon`） |
| 键盘           | Escape：子开着 → 只关子并回焦 SubTrigger；否则关根（领域层可覆盖）                                                                             |
| pointer-events | 继承 Popover 对 layer 栈的修复，避免嵌套关闭后父层不可点                                                                                       |

### 6.5 建议下沉的 composable（原型可先放 playground `headless/`）

| Composable                 | 来源收敛                                 | 职责                        |
| :------------------------- | :--------------------------------------- | :-------------------------- |
| `usePopperOpenState`       | 各 Root                                  | 受控/非受控 + reason        |
| `usePopperTrigger`         | Popover / Dropdown / Tooltip / Context   | 三态 trigger + delay + 长按 |
| `usePopperNesting`         | MenuSub                                  | parent/child 注册与联动     |
| `usePopperDismiss`         | `useDismissableLayer` + `usePopupEvents` | preset                      |
| `usePopperGrace`           | `useGraceArea` + Menu polygon            | 统一 grace                  |
| `useVirtualPointReference` | ContextMenu                              | 点击点 → ReferenceElement   |
| `useRtlSide`               | MenuSubContent                           | `dir` → 默认 side           |

---

## 7. 与现有组件的映射（验收后迁移方向）

| 现有组件          | 迁移后组合方式（示意）                                                     |
| :---------------- | :------------------------------------------------------------------------- |
| Popover           | `trigger="click"` + dismiss `modal` + `role="dialog"` + focusScope         |
| Tooltip           | `trigger="hover"` + `openOnFocus` + delay/skipDelay + grace + tooltip ARIA |
| DropdownMenu      | `trigger="click\|hover"` + Menu 领域 + Sub → `EpSub`                       |
| ContextMenu       | `trigger="contextmenu"` + virtual point + Menu 领域                        |
| HoverCard         | `trigger="hover"` + open/closeDelay + grace                                |
| Select / Combobox | 继续只用定位原语；交互仍自管（或仅复用 dismiss helper）                    |
| Cascader          | 多列非 nested-Popper；保持现状                                             |
| Popconfirm        | 继续建在 Popover 上                                                        |

**兼容策略**：正式迁入时保留现有 `PopperRoot/Anchor/Positioner/Popup/Arrow` 作为定位子集；Enhanced 部件为增量导出。禁止无迁移路径的破坏性改名。

---

## 8. Playground 原型计划（P0）

### 8.1 目录

```
apps/playground/src/examples/ui/enhanced-popper/
├── index.vue                 # 示例索引
├── headless/                 # 本地 headless 层（对应 packages/headless，不发 npm）
│   ├── types.ts
│   ├── context.ts
│   ├── use-popper-trigger.ts
│   ├── use-popper-nesting.ts
│   ├── use-popper-dismiss.ts
│   ├── ep-root.vue
│   ├── ep-trigger.vue
│   ├── ep-anchor.vue
│   ├── ep-portal.vue         # 薄封装现有 Portal
│   ├── ep-positioner.vue     # 复用现有 PopperPositioner
│   ├── ep-popup.vue
│   ├── ep-arrow.vue
│   ├── ep-sub.vue
│   ├── ep-sub-trigger.vue
│   ├── ep-compact.vue
│   └── index.ts
├── ui/                       # 本地 UI 层（对应 packages/ui，不发 npm）
│   ├── styles.ts             # scv() recipe（对应 packages/ui/src/styles）
│   ├── types.ts
│   ├── ep.vue                # SEp compact 包装
│   └── index.ts
├── 01-basic-click.vue
├── 02-hover.vue
├── 03-contextmenu.vue
├── 04-nested.vue
├── 05-nested-hover.vue
├── 06-controlled.vue
├── 07-virtual-reference.vue
└── 08-with-arrow-portal.vue
```

> Gallery 只扫描同级 `NN-*.vue`，`headless/` 与 `ui/` 不会被当成示例。示例从 `./ui` 引用 `SEp`；需要组合 API（嵌套等）时再从 `./headless` 引用 `Ep*`。

### 8.2 示例验收标准

| 示例                   | 必须可演示                                         |
| :--------------------- | :------------------------------------------------- |
| `01-basic-click`       | 开关、outside 关、Escape 关、回焦                  |
| `02-hover`             | delay、grace 移入内容不关、离开关                  |
| `03-contextmenu`       | 右键打开在指针处；触控长按（可桌面 DevTools 模拟） |
| `04-nested`            | 父 click + 子 click；父关子关；Esc 分层关          |
| `05-nested-hover`      | 父 hover + 子面板；指针沿 grace 进入子不闪关       |
| `06-controlled`        | `v-model:open` + reason 日志                       |
| `07-virtual-reference` | 任意坐标打开                                       |
| `08-with-arrow-portal` | Portal + Arrow + collision flip                    |

### 8.3 实现约束（原型）

- 分层：`headless/` 只放逻辑 / 状态 / a11y；`ui/` 只放 `scv()` recipe、UiContext 注入与薄包装。
- 样式：写在本地 `ui/styles.ts`；**不要**改 `packages/ui`。
- 定位：优先 `import { PopperPositioner, PopperArrow, … } from '@soybeanjs/headless'`，只自研交互壳。
- 遵守全局 `typescript-functional-style` / `vue-sfc-structure`。
- 不新增 workspace 依赖（Floating UI / VueUse 已有）。

---

## 9. 风险与权衡

| 风险                              | 缓解                                                              |
| :-------------------------------- | :---------------------------------------------------------------- |
| 与 Menu 领域逻辑纠缠              | 明确 Sub 只提供壳；键盘 item 行为不进 Ep                          |
| Tooltip Provider 跨实例 skipDelay | Root 级可先做；Provider 仍留 Tooltip                              |
| modal + hover 组合矛盾            | 文档规定 hover 默认 non-modal；显式 `modal` 时给开发者警告        |
| 双套 Popper 认知成本              | 命名 `enhanced-popper` / `Ep*` 仅限 playground；迁入时写 ADR 定名 |
| pointer-events 历史坑             | 直接移植 Popover positioner-impl 的 layer 同步逻辑并加嵌套用例    |
| Select item-aligned               | 明确排除，避免方案膨胀                                            |

### 被拒方案

1. **在现有 `PopperRoot` 上直接堆 open/trigger** — 破坏「定位原语」语义，牵动所有仅需定位的消费者（Select/Cascader）。→ 采用增量壳层。
2. **三套 Trigger 组件（ClickTrigger / HoverTrigger / …）** — API 碎片化。→ 单一 `EpTrigger` + `trigger` 枚举。
3. **完全重写定位，弃用现有 Positioner** — 无收益、回归面大。→ 复用。

---

## 10. 里程碑建议

| 里程碑 | 产出                                                         | 完成定义                      |
| :----- | :----------------------------------------------------------- | :---------------------------- |
| **M0** | 本文档                                                       | 评审通过（本文状态 → 🔵）     |
| **M1** | playground `headless/` + `ui/` + 01～03                      | 三种 trigger 可交互           |
| **M2** | 04～05 嵌套 + grace                                          | 嵌套用例通过人工验收          |
| **M3** | 06～08 + dismiss/portal/arrow                                | P0 示例清单全部通过           |
| **M4** | ADR：命名 / 目录 / 兼容策略                                  | `docs/adr/` 立案              |
| **M5** | 迁入 headless + 选 1 个上游试点（建议 HoverCard 或 Popover） | 行为无回归                    |
| **M6** | Dropdown / Context / Tooltip 收敛                            | 删除重复 timer/grace 代码路径 |

---

## 11. 开放问题（评审时拍板）

1. **正式包命名**：扩展现有 `popper` vs 新目录 `floating` / `popper-interactive`？
2. **`focus` 是否进入 `trigger` 联合类型**（`"click" | "hover" | "contextmenu" | "focus"`），还是仅用 `openOnFocus` 布尔？
3. **Root 是否默认包含 Portal**，还是始终显式 `EpPortal`（更接近现状、更灵活）？
4. **Grace polygon（Menu 子菜单）与 `useGraceArea` 是否在 M2 合并**，还是分两阶段？
5. **是否在壳层提供可选 `trapFocus`**，还是一律由 Popover/Menu 自己挂 `useFocusScope`？

---

## 12. 参考源码索引

| 主题                | 路径                                                                   |
| :------------------ | :--------------------------------------------------------------------- |
| 定位原语            | `packages/headless/src/components/popper/`                             |
| Floating composable | `packages/headless/src/composables/use-floating.ts`                    |
| Grace               | `packages/headless/src/composables/use-grace-area.ts`                  |
| Dismiss helpers     | `use-dismissable-layer.ts` · `use-popup-events.ts`                     |
| Popover 壳          | `components/popover/popover-{root,trigger,positioner-impl,popup}.vue`  |
| Tooltip 壳          | `components/tooltip/tooltip-{root,trigger,positioner-impl}.vue`        |
| HoverCard 壳        | `components/hover-card/hover-card-{root,trigger,positioner-impl}.vue`  |
| Menu 嵌套           | `components/menu/menu-sub.vue` · `menu-sub-trigger.vue` · `context.ts` |
| Dropdown trigger    | `components/dropdown-menu/types.ts` · `dropdown-menu-root.vue`         |
| ContextMenu 虚拟点  | `components/context-menu/context-menu-trigger.vue`                     |

---

## 13. 下一步

1. 评审本文 §6 API 与 §11 开放问题。
2. 按 §8 在 `apps/playground/src/examples/ui/enhanced-popper/` 落地 M1。
3. M3 通过后补 ADR，再进入 headless 迁移。
