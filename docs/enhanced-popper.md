# Enhanced Popper 设计方案

> 定位：基于 Floating UI，在现有定位原语之上扩展触发、开合、嵌套与 dismiss 等通用浮层能力的设计方案；指导 playground 原型与后续 headless 收敛。
> 状态：🔵 P2 消费进行中 —— **PopperV2** 已迁入 `packages` 并通过 Popover/Tooltip 两个上游试点；上信任层（HoverCard/Menu/…）为剩余待迁移清单
> 基线：2026-08-24 · 对照源码 `packages/headless/src/components/{popper,popover,tooltip,menu,dropdown-menu,context-menu,hover-card}/`

---

## 1. 目标与范围

### 1.1 目标

在不破坏现有 `Popper`（纯定位原语）公开契约的前提下，设计并落地一套能力更全的 **Enhanced Popper**（下文称 **Popper V2 原型**），优先满足：

1. **`PopperTrigger`**：统一 `trigger: "click" | "hover" | "contextmenu"`。
2. **嵌套 popup**：父子浮层开合联动、指针穿越、dismiss 边界正确。
3. **收敛上层重复逻辑**：从 `Popover` / `Tooltip` / `DropdownMenu` / `ContextMenu` / `HoverCard` 抽取真正属于「浮层壳」的通用能力，下沉到新 Popper，使上层只保留领域语义（dialog / tooltip / menu 等）。

### 1.2 落地策略（强制）

| 阶段        | 位置                                                            | 说明                                                                                                                                                              |
| :---------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0 原型** | `apps/playground/src/examples/ui/enhanced-popper/`              | 先在 playground 用本地 `headless/`（定位逻辑直接内联，**无**独立 `popper/` 定位层）+ `ui/` 验证 API 与交互；**不**改 `packages/headless` / `packages/ui` 公共导出 |
| **P1 收敛** | `packages/headless/src/components/popper/`（或并列 `floating`） | 原型稳定后，按兼容策略迁入 headless                                                                                                                               |
| **P2 消费** | Popover / Tooltip / Menu / …                                    | 逐个改为组合新 API；行为回归由 e2e / playground 覆盖                                                                                                              |

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
2. **组合优先于替换**：P0 原型定位逻辑内联（不依赖现有 `Popper*` 组件），与现有 `Popper*` 并存；P1 再决定是扩展现有目录还是 `floating` 新目录。
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
>
> **P0 实现口径**：定位逻辑（`useFloating` + middleware + `autoUpdate`）直接内联进 ep 组件（`ep-positioner-impl`），**不建立独立 `popper/` 定位组件层，也不包 headless `PopperPositioner`**；仅复用 `@soybeanjs/headless` 的通用 composables / Primitive / Arrow 图标 / 类型。下表为抽象目标，P1 迁入时再定正式部件命名。

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

- Trigger 默认同时充当 Anchor（原型内联锚点注册，经 `onAnchorElementChange` 登记为 reference）；若存在独立 `EpAnchor` / `reference`，则 Trigger 只负责事件。
- `contextmenu` 模式下，Root/Positioner 的 reference 切到零尺寸 virtual element（复用 ContextMenu 的 `getBoundingClientRect` 模式）。
- `contextmenu` 触发器需内联 `pointer-events: auto`（对齐 `ContextMenuTrigger`）：modal 层打开期间 body 指针事件被禁用，触发器保持可交互，重复右键才能再次到达 Trigger、更新虚拟点坐标并重定位浮层（对齐 ContextMenu 的重复右键行为）。
- `contextmenu` 的虚拟 reference 必须真实依赖坐标状态：在 computed getter 内读取 `point` 再闭包捕获，而不是在 `getBoundingClientRect` 闭包里惰性读取——后者不收集依赖，浮层打开后重复右键不会重定位。ContextMenu 现状用 `update-position-strategy="always"`（animationFrame 轮询）绕过此问题；Enhanced Popper 用响应式 reference 事件驱动重定位，无需轮询。
- 所有 timer 在 unmount / `disabled` / 父关时清理。

### 6.3 `EpPopup` / Positioner / Arrow / Portal

- **定位 props**：原型内联定义 `EpPositionerProps`（表面同 `PopperPositionerProps`，另含 `trapFocus`）；定位逻辑直接在 `ep-positioner-impl` 用 `useFloating` + middleware，**不包 headless `PopperPositioner`**。
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
| Dismiss        | 仅 **根层** 的 outside 关闭整棵树；子层 outside 只关子层自身（含其后代），落在父 popup 内时不关父                                              |
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
│   ├── shared.ts            # middleware / css vars / placement / 默认 props
│   ├── types.ts             # 定位 + 交互壳类型（定位 props 内联定义）
│   ├── context.ts           # root / positioner / ui 三层 context（定位数据直接在此）
│   ├── use-popper-trigger.ts
│   ├── use-popper-nesting.ts
│   ├── use-popper-dismiss.ts
│   ├── use-virtual-point-reference.ts
│   ├── ep-root.vue          # 含 dir / open / nest
│   ├── ep-trigger.vue       # 内联 anchor 注册
│   ├── ep-anchor.vue        # 内联锚点
│   ├── ep-portal.vue        # 薄封装现有 Portal
│   ├── ep-positioner.vue    # presence 薄包装
│   ├── ep-positioner-impl.vue # 内联定位逻辑（useFloating + middleware + dismiss / grace）
│   ├── ep-popup.vue         # 内联 popup 容器
│   ├── ep-arrow.vue         # 内联箭头
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
- 定位：定位逻辑（`useFloating` + middleware + `autoUpdate`）直接内联在 `headless/ep-positioner-impl.vue` 与 `headless/shared.ts`，**不保留独立 `popper/` 定位组件层、也不包 headless `PopperPositioner`**；交互壳与定位逻辑均在原型内闭环，通用设施（`useFloating` 等 composables、Primitive、Arrow 图标、`useDismissableLayer` 等类型）继续复用 `@soybeanjs/headless`。
- 方向：不接 headless 的 ConfigProvider `useDirection`，由 `EpRoot` 传入 `dir`，并沿 `EpRootContext` / `EpPositionerContext` 传递（RTL 能力不变）。
- 不新增 workspace 依赖（Floating UI 已作为 playground 直接依赖，与 headless 同版本）。

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

1. 按 §8.2 对 P0 的 8 个示例执行评审与回归验收。
2. 结合原型结果拍板 §11 的正式命名、focus trigger、Portal、grace 与 trapFocus 决策。
3. 按 §14 任务清单推进优化；P0 通过后补 ADR，再进入 headless 迁移。

---

## 14. 评审发现与优化任务（2026-08-24）

> 来源：对照设计文档、原型源码与主流浮层组件（Radix / Floating UI 系）的功能与实现评审。
> 状态图例：⬜ 待办 · 🔵 进行中 · ✅ 完成

### 14.1 功能缺口

#### T-1 · modal 焦点圈闭 + body 滚动锁（✅ 2026-08-24）

**问题**：`modal=true` 时仅做 `disableOutsidePointerEvents`（body `pointer-events: none`），无焦点圈闭（focus trap）与滚动锁定；wheel 仍可滚动背后页面。Radix DropdownMenu modal 提供 `trapFocus` + `useBodyScrollLock`。

**方案**：在 `use-popper-dismiss` / `ep-positioner-impl` 增加可选 `trapFocus` 钩子（对齐 §11 开放问题 #5）；滚动静默用 `useBodyScrollLock`（headless 已有）。

**验收**：modal 浮层打开后 Tab 在层内循环、背后滚动被锁、Escape 关闭后回焦 trigger 正常。

#### T-2 · 接线 `onOpenAutoFocus` / `onCloseAutoFocus`（✅ 2026-08-24）

**问题**：`usePopupEvents` 已导出 `onCloseAutoFocus` 但从未调用；打开侧无焦点入口钩子，modal 浮层打开不会聚焦首个可聚焦元素。

**方案**：`use-popper-dismiss` 补齐打开/关闭自动聚焦回调；`ep-positioner-impl` 绑定捕获事件与关闭回焦。

**验收**：modal 浮层打开聚焦首个可聚焦元素；关闭时消费方可控制回焦目标（默认回 trigger）。

#### T-3 · Tooltip focus-visible 策略（⬜ P3，可留白）

**问题**：`openOnFocus` 只要有 focus 就打开；Radix Tooltip 仅键盘 focus-visible 打开，鼠标点击不触发。

**说明**：文档 §3.2 将该策略归 Tooltip 领域，原型可不实现，仅记录为对齐差。

### 14.2 逻辑清理

#### T-4 · 删除 `longPressOpened` 死逻辑（✅ 2026-08-24）

**问题**：`use-popper-trigger.ts` 中 `longPressOpened` 仅在 `trigger==='contextmenu'` 时置位、仅在 `trigger==='click'` 的 `onClick` 读取，两种 trigger 互斥，分支永不交叉。

**验收**：删除后 typecheck 通过，contextmenu 长按与 click 行为不变。

#### T-5 · `useGraceArea` 按 trigger 条件启用（✅ 2026-08-24）

**问题**：`ep-positioner-impl` 对 click / contextmenu trigger 也建 grace polygon + pointer 监听；`useGraceArea` 支持 `disabled` 参数却未使用。

**方案**：仅 `trigger==='hover'` 时启用 grace；`disabled` 绑定 `triggerType.value !== 'hover'`。

**验收**：click / contextmenu 示例行为不变，hover 示例 grace 仍正常。

#### T-6 · 清理 `onDocumentPointerEnd` 残留 `setTimeout`（✅ 2026-08-24）

**问题**：`use-popper-trigger.ts:65-67` 的 `setTimeout(() => { isPointerDown = false }, 0)` 在 unmount 后仍执行且不清理。

**方案**：unmount 标记或同步复位，避免未清理异步。

#### T-7 · 确认并绑定 dismiss 捕获事件（✅ 2026-08-24，与 T-2 关联）

**问题**：`use-popper-dismiss` 丢弃 `usePopupEvents` 返回的 `onCloseAutoFocus`；`ep-positioner-impl` 解构未使用 `onPointerdownCapture`（模板只绑 focus/blur capture），当前靠 `isInsideDOMTree` 兜底。

**验收**：明确「已处理」而非死代码；portal 边界场景由捕获事件兜底。

### 14.3 性能优化

#### T-8 · 抽取 `useVirtualPointReference`（✅ 2026-08-24，最有价值）

**问题**：contextmenu 每次右键更新 `point` → `virtualReference` 产出新对象 → `useFloating` 的 reference watch 同步重挂载 → 反复 cleanup / 重建 `autoUpdate`（重新绑定 scroll / resize / IntersectionObserver）。

**方案**：按 §6.5 规划抽出 `useVirtualPointReference`：reference 对象保持稳定，坐标变化时手动调 `positioner.update()`；contextmenu 打开后 `autoUpdate` 只建一次。比现「事件驱动重建」省去每次重挂载，也比 ContextMenu 的 `update-position-strategy="always"`（animationFrame 轮询）更省。

**验收**：03 右键重定位行为不变；性能 profile 显示无 `autoUpdate` 反复创建。

#### T-9 · 嵌套层 document 监听聚合（⬜ P3，P1 迁入时评估）

**问题**：`useDismissableLayer` 每层挂 `pointerdown` + `focusin` 监听，N 层嵌套 = 2N 监听。属 headless 库层面设计，原型不改；迁入 headless 时评估「共享单文档监听 + 按栈分发」。

### 14.4 落地记录（2026-08-24）

T-1/T-2/T-4 ~ T-8 已在 playground 原型落地，关键决策供 P1 迁移参考：

- **T-1/T-2**：`usePopperDismiss` 内部组合 `useFocusScope`（`trapped` 绑定 `trapFocus ?? modal`，`loop: true`）+ `useFocusGuards` + `useBodyScrollLock`（modal 时）。`EpPositioner` 新增 `trapFocus` prop（默认跟随 `modal`，回答 §11 #5：壳层提供可选 trapFocus）；`EpPositionerEmits` 合入 `FocusScopeEmits`（`openAutoFocus` / `closeAutoFocus` 可 preventDefault 接管回焦）。非 trap 层（hover）在 open/close 自动聚焦回调中一律 `preventDefault`，保证 hover 浮层不偷焦点；子层挂载会经由 focus scope 栈暂停父层 trap，嵌套子浮层内部交互不受父层圈闭影响。
- **T-5**：`ep-positioner-impl` 向 `useGraceArea` 传 `disabled: computed(() => triggerType !== 'hover')`，click / contextmenu 不再建 grace polygon 与 pointer 监听。
- **T-6**：`setTimeout` 延迟复位保留（pointerup 后同任务内的 focus/click 仍需观察到 `isPointerDown === true`），但 timer 已可追踪并在 unmount 清理。
- **T-7**：`ep-positioner-impl` 模板绑定 `@pointerdown.capture="onPointerdownCapture"` 与 `@keydown="onKeydown"`，portal 边界场景由捕获事件兜底。
- **T-8**：新增 `useVirtualPointReference`（稳定 reference + `setPoint` 回调通知）；root context 增加 `onPositionerUpdateChange` / `requestPositionerUpdate` 手动重定位通道，`ep-positioner-impl` 挂载时经 context 注册 `useFloating().update` 并于 unmount 清空。contextmenu 重复右键经 `setPoint → requestPositionerUpdate → update()` 事件驱动重定位，`autoUpdate` 每次打开只建一次。

---

## 15. 任务与里程碑映射

- T-1 / T-2（焦点圈闭与自动聚焦）→ 并入 **M3**（dismiss / portal / arrow 验收）或独立 **M3.5**。
- T-8（虚拟点 reference）→ 并入 **M1**（trigger 交互）验收。
- T-4 ~ T-7（逻辑清理）→ 任一轮修 `headless/` 时顺手合入。
- T-3 / T-9 → P1 迁入 headless 时与领域层（Tooltip）一并决策。

---

## 16. P1 迁移记录与待迁移任务（2026-08-24）

### 16.1 迁移完成内容

已将 P0 原型从 playground 迁入 `packages`，成型为正式组件 **PopperV2**（命名见 §11 #1）。

| 层         | 落点                                                            | 说明                                                                                                                                                                                                                                          |
| :--------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headless   | `packages/headless/src/components/popper-v2/`                   | 组件 `PopperV2Root/Trigger/Anchor/Portal/Positioner/PositionerImpl/Popup/Arrow/Sub/SubTrigger/Compact`；context `providePopperV2Ui`；composable `usePopperV2Trigger/Nesting/Dismiss`、`useVirtualPointReference`；helper `getNestedPopupSide` |
| UI         | `packages/ui/src/components/popper-v2/` + `styles/popper-v2.ts` | `SPopperV2`，variants `popperV2Variants`（slots 与 `PopperV2UiSlot` 对齐）                                                                                                                                                                    |
| barrel     | `packages/headless/src/index.ts`、`packages/ui/src/index.ts`    | 均 `export * from ./components/popper-v2`；`pnpm sui headless/ui` 已重生成                                                                                                                                                                    |
| playground | `apps/playground/src/examples/ui/enhanced-popper/`              | 本地 `headless/`、`ui/` 副本已删除；01–08 示例改用 `@soybeanjs/ui` 的 `SPopperV2` 与 `@soybeanjs/headless/popper-v2`                                                                                                                          |

验证：全量 monorepo `pnpm typecheck`（12 workspaces）通过；`pnpm sui headless` / `pnpm sui ui` 通过；`vp lint --fix` + `vp fmt` 通过。

### 16.2 旧版 Popper 使用组件清单（依据模板 `<Popper` 检索）

以下组件在模板中直接使用 `packages/headless/src/components/popper/` 的旧版定位原语 `<PopperRoot/Anchor/Positioner/Popup/Arrow>`（排除 popper 自身目录），是通过 Grep 检索 `<Popper` 得到的**完整**使用清单，即迁移到 `PopperV2` 的对象：

**表 A · 待迁移（主动收敛，删除重复 timer / grace / dismiss 壳逻辑）**

| 组件           | 目录                                                               | 使用的 `<Popper*>`           | 迁移到 PopperV2 的方案                                                            | 阶段  |
| :------------- | :----------------------------------------------------------------- | :--------------------------- | :-------------------------------------------------------------------------------- | :---- |
| **Popover**    | `components/popover`                                               | Root/Anchor/Positioner/Popup | `PopperV2Root` + `PopperV2Trigger(trigger=click)` + dialog 领域；**建议 M5 试点** | M5    |
| **Tooltip**    | `components/tooltip`                                               | Root/Anchor/Positioner/Popup | `trigger=hover` + `openOnFocus` + Tooltip ARIA；此时落地 **T-3**                  | P2    |
| **HoverCard**  | `components/hover-card`                                            | Root/Anchor/Positioner/Popup | ✅ 已迁移（2026-08-24，见 §16.5）                                                 | M5/P2 |
| **Menu 家族**  | `components/menu`（含 dropdown-menu / context-menu 的 `menu-sub`） | Root/Anchor/Positioner/Popup | 嵌套壳替换为 `PopperV2Sub`（保留 roving focus/typeahead）                         | P2    |
| **Popconfirm** | `components/popconfirm`                                            | Arrow                        | 随 `Popover` 收敛自动受益                                                         | P2    |

**表 B · 仅消费定位原语（交互自管，可保持或选择性复用 PopperV2 定位）**

| 组件             | 目录                      | 使用的 `<Popper*>`                 | 说明                                      |
| :--------------- | :------------------------ | :--------------------------------- | :---------------------------------------- |
| **Select**       | `components/select`       | Root/Anchor/Positioner/Popup/Arrow | `item-aligned` 手工定位为特例；仅复用定位 |
| **Combobox**     | `components/combobox`     | Root/Anchor/Positioner/Popup/Arrow | 仅复用定位                                |
| **Autocomplete** | `components/autocomplete` | Root                               | 仅复用定位                                |
| **Cascader**     | `components/cascader`     | Root/Anchor/Positioner/Arrow       | 多列非 nested-Popper；仅复用定位          |

> 注：`TreeMenu` 通过 `tree-menu-tooltip-compact` 间接消费 `Tooltip`，模板不含直接的 `<Popper>`，随表 A 的 Tooltip 收敛自动受益。

> 检索依据：`packages/headless/src/components` 中匹配模板 `<Popper(?:Root|Anchor|Positioner|Popup|Arrow|Sub|Trigger|Portal|Content|Item)>` 的组件（2026-08-24）。### 16.3 迁移期配套任务

### 16.4 上游试点迁移落地（2026-08-24，P2）

**PopperV2 修复**：`popper-v2-trigger.vue` 的裸 `as-child` 修正为 `:as-child="true"`（裸值使 `Primitive` 不塌缩、产生多余锚点层并把 ARIA 挂到无 role 元素，曾导致 date-picker/date-range-picker 回归）。

**Popover（M5 试点，✅ 已迁移）**：壳下沉 PopperV2（Root/Trigger/Anchor/Portal/Positioner/Popup/Arrow + presence/dismiss/trap/auto-focus），保留 dialog 领域：`role="dialog"`、`aria-labelledby` 关联、`PopoverClose`（closeProps/close slot/默认 lucide:x）、modal 的 `useHideOthers`、trigger `aria-haspopup="dialog"`。`providePopoverUi → providePopperV2Ui`；删除 `popover-positioner-impl.vue`。公共 API 完全兼容。

**Tooltip（✅ 已迁移）**：壳下沉 PopperV2（Root/Anchor/Positioner/Popup + hover/delay/grace），保留 Tooltip 领域：`role="tooltip"` + `aria-describedby` 关联；**Provider 级共享 skipDelay**（`provideTooltipOpenDelayedContext` + `TOOLTIP_OPEN` 广播，跨实例共享，未依赖 PopperV2 实例级 skipDelay）；`ignoreNonKeyboardFocus`（**落地 T-3** focus-visible 门控，`onFocus` 仅键盘/程序化打开）；`disableClosingTrigger`；scroll 关闭；default delay 150/skipDelay 300。`provideTooltipUi → providePopperV2Ui`；删除 `tooltip-positioner-impl.vue`。公共 API 兼容（`TooltipUiSlot` 拓宽为 `PopperV2UiSlot` 超集）。

**下游同步**：`popconfirm` 因 Popover 自建 RootContext 移除而改用 `usePopperV2RootContext`（非 API 破坏）。

验证：全量 monorepo `pnpm typecheck`（12 workspaces）EXIT 0；Popover/Tooltip/popconfirm/date-* 相关 UI 测试通过；`pnpm sui headless/ui` 无导出漂移。

- **T-9**（document 监听聚合，`useDismissableLayer` 每层 2N 监听）：随 P2 逐组件消费 `PopperV2` 时，评估「共享单文档监听 + 按栈分发」是否下沉到 headless 库层。
- **T-3**（Tooltip focus-visible）：在迁移 Tooltip 时落地 `openOnFocus` 仅响应键盘/程序化 focus。

### 16.5 HoverCard 迁移落地 + T-10（2026-08-24，P2）

**壳层新增（本批次）**：

- `registerHoverCloseGuard(guard)`（`PopperV2RootContext`）：领域级「延迟关闭否决」钩子，在 close timer **触发时**求值——HoverCard 文本选择 / popup 按住场景用，选择发生在延迟期间也能被拦住；Tooltip 类「disableClosingTrigger」未来亦可复用。
- `focusOpenDelay`（`PopperV2TriggerProps` / `PopperV2TriggerConfiguration`）：focus 打开的独立延迟，默认继承 `openDelay`（HoverCard：focus 也走 openDelay）；Tooltip 显式传 0（即时）。修正 §17.6.3 期间写死的「focus 一律跳过延迟」。
- **T-10（✅）**：`useFloating` 的 `reset()` 语义改为 **open→true 时清 `isPositioned`**（关闭期间保持定位，退出动画原位播放）；`popper-v2-positioner-impl` 传 `open: () => context.open`；旧 `popper-positioner` 新增可选 `open` prop（默认 true，纯定位原语由消费方接线自己的 open，向后兼容）。

**HoverCard（✅ 已迁移）**：壳下沉 PopperV2（Root/Trigger/Anchor/Portal/Positioner/Popup/Arrow + hover/open·closeDelay/grace/dismiss），`skipDelayDuration: 0` 保持「每次打开都延迟」（HoverCard 无 skip 窗口语义）；保留领域：文本选择跟踪（`hasSelectionRef`/`isPointerDownOnPopupRef` → `registerHoverCloseGuard`）、选择期间 body user-select 锁、`removeFromTabOrder`、scroll 关闭。删除 `hover-card-positioner-impl.vue`；`update:open` 携带 reason；`provideHoverCardUi → providePopperV2Ui`；`HoverCardPortal/Arrow` 改为 PopperV2 别名。代码 686 → 517 行（−169，−25%）。

**已知行为差异（有意）**：focus 打开从「固定 openDelay」变为「openDelay（默认继承）」——语义一致；grace `subAreaAttribute` 由 `data-soybean-hover-card-sub-popup` 预留标记统一为 PopperV2 的 `data-popper-v2-sub-popup`（原标记无组件使用）。

**验证**：monorepo typecheck 通过；hover-card.spec 7/7、tooltip/popover 全过；全量单测失败集与迁移前基线完全一致（popconfirm a11y ×1 + date-picker 系 ×16，均为存量）；`sui headless/ui`、fmt、lint 通过。

**Menu 家族评估（下一批次）**：`menu`（2629 行）+ `dropdown-menu`（950）+ `context-menu`（748）是最后一批，也是最大一块。要点：① `menu-sub` 嵌套（自建 PopperRoot + grace polygon + `data-soybean-menu-sub-popup`）映射到 `PopperV2Sub`；② Menu 自有 open 状态机与 roving focus / typeahead 深度耦合，需按 Tooltip 模式消除双状态源（popper open 为唯一源，领域只留 highlight/item 模型）；③ `context-menu` 虚拟点 + 长按直接换 `PopperV2Trigger(trigger="contextmenu")`（T-8 稳定 reference 通道）；④ 键盘方向键打开 Sub 的 Enter/Arrow 语义留在 Menu。建议单独批次 + e2e（menubar/navigation-menu 依赖 menu 语义，回归面大）。

---

## 17. Popper vs PopperV2 对比分析（2026-08-24）

> 基线：commit `29ef9d754`（PopperV2 落地）→ `ce37764b8`（Popover/Tooltip 迁移）。本节回答四个问题：实现方式差异、性能影响、代码缩减量化、功能集成方式是否应改为可插拔 hooks。

### 17.1 实现方式差异

| 维度         | Popper（旧）                                                                                           | PopperV2                                                                                                                                                                                            |
| :----------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 定位         | 纯定位原语；`PopperPositioner` 组件封装 `useFloating` + middleware                                     | 定位逻辑内联在 `popper-v2-positioner-impl.vue`（**不依赖旧 popper 目录**，`shared.ts`/middleware 为平行副本）                                                                                       |
| 交互壳       | 无；open / trigger / dismiss / delay / grace / nesting 由 4~5 个上层组件各自复制                       | 全部收敛：Root 持有受控 open + reason + hover timer 状态机（`context.ts` ~300 行）；Trigger 用 `usePopperV2Trigger` 三态事件；Dismiss 用 `usePopperV2Dismiss` 组合 focusScope / guards / scrollLock |
| 嵌套         | 无 popup stack；MenuSub 是唯一完整实现                                                                 | 一等公民：`usePopperV2Nesting` 父子注册，「父关子关」「子层 outside 只关自身」内建                                                                                                                  |
| 虚拟参考     | 上层各自实现；ContextMenu 用 `update-position-strategy="always"`（animationFrame 轮询）绕过响应性问题  | `useVirtualPointReference` 稳定 reference + `requestPositionerUpdate()` 事件驱动重定位（T-8）                                                                                                       |
| 上游组件形态 | 每个组件一个 `*-positioner-impl.vue`（Popover 96 行 / Tooltip 112 行）手工拼装 dismiss / grace / focus | 上游不再有 positioner-impl；壳能力经 props/emits 透出，上游只保留领域逻辑（role、ARIA、Provider skipDelay 等）                                                                                      |

**关键结构性差异**：PopperV2 把「每组件一份的命令式拼装」变成「一次性声明式编排」。代价是定位栈（middleware / placement / css-var helper）在 `popper/shared.ts`（246 行）与 `popper-v2/shared.ts`（268 行）间形成**平行副本**，类型层（207 vs 325 行）同理。这是当前最大的维护性负债（见 17.5 R-1）。

### 17.2 性能影响评估

**结论：稳态性能持平或更优；每层常驻开销略有增加但量级可忽略（个位数监听器 + 2 个 guard DOM 节点）；已被 T-5/T-8 消掉的两项是净收益。**

净收益（已落地）：

1. **虚拟参考重定位**（T-8）：旧 ContextMenu 右键重定位 = 每次右键重建 `autoUpdate`（重绑 scroll/resize/IntersectionObserver）或 animationFrame 轮询（每帧 `getBoundingClientRect`）；PopperV2 = 稳定 reference + 一次 `update()` 调用，打开期间 `autoUpdate` 只建一次。
2. **grace 条件启用**（T-5）：非 hover 层不再建 grace polygon 与 pointer 监听，click/contextmenu 层比旧实现（无条件 `useGraceArea`）更省。

持平项：定位计算路径相同（同一 `useFloating` + `@floating-ui/dom`）；代码量增大 2.8×（752 → 2139 行）只影响包体积（tree-shaking 后单组件增量远小于此），不影响运行时。

新增常驻开销（每层、打开期间）：

| 开销                                                           | 触发条件                     | 影响                                                                     |
| :------------------------------------------------------------- | :--------------------------- | :----------------------------------------------------------------------- |
| `useFocusGuards()` 无条件挂载（`use-popper-v2-dismiss.ts:84`） | **所有层，含 hover Tooltip** | 2 个 guard DOM 节点 + focusin/out；旧 Tooltip impl 不挂 guards —— 回退点 |
| `useFocusScope` 无条件挂载                                     | 所有层                       | 若干 focus 监听；hover 层 trap 恒 false，监听属空转                      |
| `useDismissableLayer` 每层 2 个 document 监听                  | 所有层（与旧实现相同）       | N 层嵌套 = 2N 监听，即 T-9，未恶化但未解决                               |

结论：无性能回退风险；优化空间集中在「hover 层不该挂 focus 基础设施」（17.4 A-1）与 T-9。

### 17.3 代码缩减量化（实测 + 推算）

**已迁移两组件实测**（`git diff 29ef9d754..ce37764b8`，仅 headless 组件目录）：

| 组件    | 删除 | 新增 | 净变化   | 备注                                                                                                    |
| :------ | :--- | :--- | :------- | :------------------------------------------------------------------------------------------------------ |
| Popover | 349  | 63   | **−286** | 删除 `popover-positioner-impl.vue`（−96）与 RootContext 壳（−62）                                       |
| Tooltip | 184  | 148  | **−36**  | 删除 impl（−112），但 `tooltip-positioner.vue` +61（scroll 关闭、delay 等领域逻辑从 impl 移入，非重复） |
| 合计    | 533  | 211  | **−322** |                                                                                                         |

一次性成本：`popper-v2/` 目录 2139 行（对比旧 `popper/` 752 行，其中约 500 行是与旧 popper 平行的定位副本，见 R-1）。

**待迁移组件推算**（壳逻辑占比参照 Popover 的 ~300 行/组件；HoverCard 壳占比最高，Menu 家族因保留 roving focus/typeahead 领域逻辑，比例略低）：

| 组件                         | 现有规模 | 预计净缩减                                    |
| :--------------------------- | :------- | :-------------------------------------------- |
| HoverCard                    | 686 行   | ~250–350 行（−40%±）                          |
| Menu 家族（menu-sub 嵌套壳） | 2629 行  | ~300 行 + 嵌套模型简化                        |
| DropdownMenu                 | 950 行   | ~150–250 行                                   |
| ContextMenu                  | 748 行   | ~150–250 行（含删除 animationFrame 轮询路径） |

表 A 全部迁移完成后，上游合计预计净减 **900–1200 行**重复壳逻辑，且 timer/grace/dismiss 只剩一份实现。

### 17.4 集成方式评估：可插拔 hooks vs 现状「编排式内建」

**现状**：功能已按 composable 拆分（`usePopperV2Trigger` / `Dismiss` / `Nesting`、`useVirtualPointReference`），但 `popper-v2-positioner-impl.vue` **无条件全量接线**——不管 trigger 是什么，每层都挂 focusGuards、focusScope、grace（已 gated）、dismiss 全家桶。「按需引入」目前只体现在 runtime gating（`trapFocus`、`graceDisabled` 的 computed），未体现在**代码路径与监听器挂载**上。

**评估结论：不需要推倒为插件注册表式的架构（过度设计）；应做「预设驱动的条件装配」——保留现有 composables，把装配点从无条件改为按 trigger/modal 预设分支。** 理由：消费方是组件作者而非终端用户，组合点唯一（PositionerImpl），插件化收益低；真正的痛点是 hover 层空转 focus 基础设施。

具体建议（按性价比排序）：

- **A-1（高）· dismiss 分级装配**：`usePopperV2Dismiss` 拆为三层——核心（`useDismissableLayer`，所有层需要）+ focus 模块（`useFocusScope` + `useFocusGuards`，仅 `trapFocus()===true` 时挂载；hover 层现状里的「非 trap 层 preventDefault 空转回调」可整体删除）+ scrollLock（modal，已 gated）。这同时消掉 17.2 的最大回退点。
- **A-2（中）· 继续用 computed gating 而非动态 composable 调用**：Vue setup 期间 composables 必须同步调用，无法真正「按需再引入」；正确的 Vue 式按需 = composable 内部首行 `if (!enabled.value) return` + watch 启停（`useGraceArea(disabled)` 已是这个模式，focusScope/guards 补齐同款即可）。
- **A-3（中）· 领域增强走「外部组合」而非「壳内开关」**：Tooltip Provider skipDelay、scroll 关闭、`ignoreNonKeyboardFocus` 没有进壳，而是留在 Tooltip 层组合 context API——这是正确的样板，后续 Menu typeahead、HoverCard selection 延迟同理，不要往 PopperV2 加 prop。
- **A-4（低）· `OpenChangeReason` 已是解耦关键**：reason 枚举让上游能监听 `update:open(v, reason)` 做领域响应而无需 hack 壳内部——保持这条边界即可，无需事件总线式插件。

#### 17.4.1 A-1 / A-2 / A-3 落地记录（2026-08-24）

- **A-1（✅）· dismiss 分级装配**：`usePopperV2Dismiss` 中 focus 基础设施改为仅 trap 层装配——
  - `useFocusGuards` 新增可选 `enabled: MaybeRefOrGetter<boolean>` 参数（默认 `true`，dialog/menu/select/combobox 等既有调用方零改动），非 trap 层不再创建 guard DOM 节点；
  - `useFocusScope` 的元素 ref 改为 `computed(() => trapFocus() ? layerElement.value : undefined)`：非 trap 层（hover Tooltip 等）不再注册 focus scope 栈、不再派发 open/close auto-focus 事件、卸载时不再尝试回焦——原先「非 trap 层 preventDefault 空转回调」整体删除，净效果等价（hover 层本就不偷焦点）但零开销；
  - `trapFocus` 在实例生命周期内可切换（`modal` / `trapFocus` prop 变化时 computed 自动装/卸）。
- **A-2（✅）· computed gating 模式**：以上即样板——Vue composable 必须 setup 同步调用，真正的「按需」= 响应式 `enabled`/gated element ref 让 composable 内部 watcher 不触发（`useGraceArea(disabled)`、`useFocusScope(trapped)`、`useFocusGuards(enabled)`、`useBodyScrollLock` modal watch 均已对齐）。
- **A-3（✅ 核验，无需改动）**：PopperV2 仅含实例级 `skipDelayDuration`（通用壳能力）；Tooltip 的 Provider 级跨实例 skipDelay、scroll 关闭、`ignoreNonKeyboardFocus`、`disableClosingTrigger` 均保留在 `tooltip/` 层外部组合，未发现领域逻辑泄漏进壳。
- **验证**：monorepo `pnpm typecheck`（12 workspaces）通过；popover/tooltip/popconfirm/context-menu/dropdown-menu/hover-card 共 38 个用例中 37 通过——唯一失败为 popconfirm a11y `aria-allowed-attr`，经 stash 对照确认为**迁移前已存在**的存量问题，与本次改动无关；`vp fmt` + `vp lint` 通过。

### 17.5 风险与后续任务

- **R-1 · 定位栈双副本**：`popper/shared.ts`（246 行）与 `popper-v2/shared.ts`（268 行）平行维护 middleware/placement/css-var。建议：待表 B 组件（Select/Combobox/Cascader）确认是否最终也迁 PopperV2 定位后，二选一收敛（倾向把纯定位 helper 提为共享模块，旧 popper 与 v2 同源引用）。
- **R-2 · 表 B 组件迁移决策**：Select `item-aligned` 仍需手工定位；若表 B 仅复用 PopperV2 的 Anchor/Positioner 定位子集，R-1 的收敛优先级提前。
- **R-3 · A-1 落地时机**：建议在 HoverCard（下一个 hover 型迁移对象）之前完成，避免 hover 层 focus 基础设施空转的回退面继续扩大。
- **T-9 维持原判**：监听聚合下沉 headless 库层评估，不阻塞 P2。

### 17.6 Popover / Tooltip 迁移质量复查与进一步优化（2026-08-24）

#### 17.6.1 Popover：已收敛到位，仅两处小项

Popover 是「全量下壳」的样板：Root/Trigger/Positioner 均为薄透传，领域只剩 `aria-haspopup="dialog"`、`role="dialog"`、`useHideOthers`、Close 语义。

- **P-1 · `update:open` 丢失 reason**：`PopoverRootEmits = DialogRootEmits`（`[value: boolean]`），Root 里 `onOpenChange(value)` 丢掉了 PopperV2 的 `reason` 参数，消费方无法区分 dismiss-outside / escape / trigger-click。建议改为 `[value: boolean, reason?: PopperV2OpenChangeReason]`（additive，不破坏现有监听）。
- **P-2（可选）**：`types.ts` 的空壳接口（`PopoverRootProps extends PopperV2RootProps {}` 等）保留即可，是公共 API 兼容层，不算冗余。

#### 17.6.2 Tooltip：属「半迁移」——定位/dismiss/grace 下了壳，trigger + delay 状态机没有

现状问题（按严重度）：

- **TT-1 · 双 open 状态机（核心冗余，~90 行可删）**：`provideTooltipRootContext` 自带完整 hover 状态机（`startTimer`/`onOpen`/`onClose`/`onTriggerEnter`/`onTriggerLeave`/`wasOpenDelayedRef` + open timer），而 `PopperV2Root` context 已有同构机器（`onHoverOpen`/`onHoverClose`/openTimer/skipDelayTimer/`isOpenDelayed`）。`TooltipTrigger` **完全没用 `PopperV2Trigger`**，手写 7 个指针/焦点监听 + 两个双向 watch 把 domain `open` 与 popper `open` 互相同步——这正是迁移本要消灭的「两份实现」，目前只剩一份半。两个状态源还引入顺序敏感：scroll/TOOLTIP_OPEN 监听必须等 domain open 翻转后才注册（`tooltip-positioner` 注释记录了自关竞态）。
- **TT-2 · `provideTooltipRootContext` 冗余字段**：`popupElement`/`onPopupElementChange` 镜像**无任何读取方**（`ariaLabel` 用的是本地 ref）→ 纯死代码；`triggerElement` 镜像仅 positioner scroll-close 用，可直接读 `usePopperV2RootContext().triggerElement`；`initPopupId` 惰性 `useId` 可简化为一次调用。
- **TT-3 · Provider 配置与跨实例 skipDelay 的实现方式**：没有独立的 `TooltipProvider` 组件，「Provider」= ConfigProvider 的 `tooltip` 全局键 + 每根实例 `TooltipOpenDelayedContext`（又一份 per-instance skipDelay 状态，与 PopperV2 实例级 skipDelay 重复）+ `TOOLTIP_OPEN` document 自定义事件广播做跨实例协调。缺陷：document 事件是**全局**而非树级作用域（两个隔离区域的 Tooltip 会互相打断）；配置只能全局覆盖、不能局部子树覆盖；skipDelay 状态存在三份（Tooltip per-root、PopperV2 per-root、隐含全局语义）。
- **TT-4 · 死类型**：`TooltipPositionerImplProps/Emits`（impl 组件已删）仅剩导出兼容意义。

优化方案（目标形态：TooltipTrigger 塌缩为薄包装，Timer 只剩 PopperV2 一份）：

1. **壳层补两个通用能力**（HoverCard 未来直接复用，符合 A-3「通用才进壳」判据）：
   - `PopperV2Trigger` 新增 `focusVisibleOnly?: boolean`（focus 打开仅响应 `:focus-visible`）——把 Tooltip 的 `ignoreNonKeyboardFocus` 门控从手写 `onFocus` 下沉为壳能力；
   - `PopperV2RootContext` 暴露 `isOpenDelayed`（内部已存在，未导出）——Tooltip 的 `data-state: delayed-open | instant-open` 直接推导，`wasOpenDelayedRef` 删除。
2. **TooltipTrigger 改用 `PopperV2Trigger`**：`trigger="hover"` + `:open-delay="delayDuration"` + `:close-delay="0"` + `open-on-focus` + `focus-visible-only` + `disable-closing-trigger` 时拦截 pointerdown/click 关闭（壳层已有 `onClick` toggle 语义可配）。删除手写监听与双向 sync watch，`TooltipRoot` 里的 domain `open` 镜像与 watch 一并删除（`update:open`/`data-state` 直接从 popper context 派生）。
3. **引入真正的 `TooltipProvider` SFC**（Radix 同款）：树级 `provide` 共享 skip-delay 状态（单个 `isOpenDelayed` ref + onOpen/onClose），跨实例协调从 `TOOLTIP_OPEN` document 广播改为注入共享 context——作用域正确、类型安全；同时支持子树级配置覆盖（`delayDuration` 等，解析链变更为 `props → 祖先 Provider → ConfigProvider 全局 → 默认`）。`TooltipProviderProps` 类型复用不动。ConfigProvider 全局键保留为隐式根 Provider。
4. **清理**：删 `popupElement` 镜像、`initPopupId` 惰性逻辑、`TooltipPositionerImpl*` 死类型（保留别名导出以防破坏）、`tooltip-positioner` 的 defu 默认值块与 `PopperV2Positioner` 自带 `withDefaults` 重复的部分。

预估收益：`tooltip-trigger.vue` 130 → ~30 行、`context.ts` 143 → ~60 行、`tooltip-root.vue` 删 ~25 行同步逻辑，Tooltip 侧净减 **~200 行**；timer/skipDelay 状态从三份收敛为「PopperV2 实例一份 + Provider 树级一份」；消除双 open 源的竞态类（自关竞态注释可删）。

前置依赖：1 完成后 2/3 才可做；建议与 HoverCard 迁移（同为 hover 型）合并为一个任务批次，壳层两个新能力一次验收两处消费。

#### 17.6.3 Tooltip 优化落地记录（2026-08-24）

按 §17.6.2 方案完成 TT-1 ~ TT-4 全部四项（含 P-1 顺带修复）：

- **壳层新增**：
  - `PopperV2Trigger` 新增 `focusVisibleOnly`（focus 打开仅响应 `:focus-visible`），`onFocus` 带 `FocusEvent` 入参；
  - `PopperV2RootContext` 暴露 `isOpenDelayed` / `wasOpenDelayed`；`commitHoverOpen(reason, delayed)` 记录本次打开是否经过延迟，驱动 `delayed-open | instant-open` data-state；
  - `onHoverOpen` 语义补充：**focus 打开跳过 hover delay**（对齐旧 Tooltip「focus 立即打开」与 Radix 行为），delay 仅作用于 hover reason。
- **TT-1/TT-2（✅）**：删除 Tooltip 自有 hover 状态机与 domain `open` 镜像——`TooltipTrigger` 直接调用壳层 `usePopperV2Trigger`（`trigger="hover"` + reactive props 把 provider 级 `isOpenDelayed` 映射为 `openDelay: 0`），模板保留 Tooltip 专属 ARIA（`aria-describedby`、无 `aria-expanded`）；`provideTooltipRootContext` 收敛为纯配置载体（resolved config + `popupId` + provider 引用），删除 `popupElement` 死镜像、`triggerElement` 镜像、`initPopupId`、`onOpen/onClose/onTriggerEnter/onTriggerLeave` 与整套 timer。双向 sync watch 删除，popper open 成为唯一状态源；provider 协调 watch（开→关兄弟、关注册 closer）是唯一新增 watcher。
- **TT-3（✅）**：新增 `TooltipProvider` SFC——树级共享 skip-delay 状态（单个 `isOpenDelayed` + `rootOpened/rootClosed` 协调，打开即关闭同 Provider 内其他 tooltip），**删除 `TOOLTIP_OPEN` document 广播**（不再全局互相打断）；配置解析链 `prop → 祖先 Provider → ConfigProvider 全局 → 默认`，支持嵌套 Provider 覆盖。`TooltipRoot` 无祖先 Provider 时自动创建本地 fallback（行为等价旧全局语义）。
- **TT-4（✅）**：`disableClosingTrigger` 在 `TooltipPositioner` 拦截 `pointerDownOutside`（target 在 trigger 内时 `preventDefault`，事件仍透传消费方）；trigger pointerdown 关闭保留在 Trigger（dismiss layer 对 trigger 目标 preventDefault 不关，属 shell 通用行为）。`TooltipPositionerImpl*` 类型保留为兼容别名；defu 默认块仅保留 Tooltip 特有默认（`side: 'top'` 等）。
- **P-1（✅ 顺带）**：`TooltipRootEmits['update:open']` 拓宽为 `[value, reason?]`，Compact 转发 reason。
- **行为差异（有意）**：`update:open` 现携带可选 reason；`tooltip.open` document 事件不再派发（原为内部机制，无公共导出）。
- **验证**：monorepo `pnpm typecheck` 通过；tooltip.spec 8/8 通过（「兄弟 tooltip 关闭」用例改写为共享 `TooltipProvider` 下的两 tooltip 交互）；全量单测 1778 例中 33 失败均为存量（popconfirm a11y 1 + date-picker/date-range-picker 32，stash 基线对照确认）；`pnpm sui headless/ui`、`vp fmt`、`vp lint` 通过。
- **代码量**：tooltip 目录 806 → 782 行（净 −24），但**新增** `TooltipProvider` 公共组件（52 行）；trigger 130 → 98、context 143 → 74、root 82 → 69。timer/skip-delay 状态从三份收敛为「PopperV2 实例 + Provider 树级」各一份。

### 17.7 `useFloating` 的 `open` 选项分析（2026-08-24）

> 背景：`popper-v2-positioner-impl.vue`（以及旧 `popper-positioner.vue`）调用 `useFloating` 时均未传 `open`；全库仅这两个调用方，`open` 相关分支目前是死路径（默认 `true`）。

#### `open` 在本实现中的作用（`composables/use-floating.ts`）

本 Vue 移植版中 `open` **只**影响 `isPositioned` 的生命周期与重算时机，共三处：

| 位置                                                | 行为                                                                                                                                         |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `update()` 内 `isPositioned.value = open !== false` | 「已关闭但仍挂载」（退出动画 / forceMount）期间发生的重定位计算**不把** `isPositioned` 置 true（源码注释明确目的：保证下次打开初始为 false） |
| `watch(openOption, reset)`                          | open 由 true → false 的瞬间，立即把 `isPositioned` 清为 false                                                                                |
| `watch([... openOption], update)`                   | open 翻转（false → true）时同步重跑一次 `computePosition`                                                                                    |

**注意**：与 `@floating-ui/react` 不同，本实现**不**用 `open` 控制 `whileElementsMounted`/`autoUpdate` 的挂载（`attach()` 只看 reference/floating 元素是否就绪）。因此「不传 open 省 scroll/resize 监听」的收益在本实现不存在。

`isPositioned` 的下游消费（popper / popper-v2 一致）：positioner 的 `transform: isPositioned ? 定位值 : 'translate(0, -200%)'`（未定位时移出视口防闪现）、popup 的 `animation: isPositioned ? undefined : 'none'`（未定位禁动画）、`@placed` 的 emit 触发。

#### 不传 `open` 的影响评估

| 场景                                       | 现状（不传 open，恒视为 true）                                                                                                                                                               | 若直接传 open                                                                                                                                            |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 默认挂载（无 `forceMount`，presence 卸载） | **无差异且正确**：关闭后组件卸载，状态随实例销毁；关闭/退出动画期间 `isPositioned` 保持 true → 浮层在**原位**播放退出动画                                                                    | **有破坏**：close 瞬间 `reset()` 把 `isPositioned` 清 false → transform 跳 `translate(0, -200%)`，浮层瞬间移出视口，退出动画在屏外播放（视觉上立即消失） |
| `forceMount` 常驻挂载                      | **有缺陷**：首次打开后 `isPositioned` 永远 true。重开时：① computePosition resolve 前用旧坐标渲染（闪现旧位置一帧）；② `@placed` 不再 emit；③ 「未定位禁动画」失效，重开动画可能从旧位置起播 | 生命周期正确，但退出动画被上述 reset 破坏                                                                                                                |

**结论**：

1. 默认场景下不传 `open` 是**有意为之且必要**的——本实现的 `reset()` 语义（close 即清 `isPositioned`）与退出动画相冲突，传了反而回归。
2. 唯一受害的是 `forceMount` 场景（重开闪旧坐标 + `placed` 只 emit 一次 + 禁动画门失效）。
3. 若要修 forceMount，正确改法不是简单传入 `open`，而是**调整 reset 语义**：把「open→false 立即清」改为「open→**true** 时清」（重新进入未定位→定位生命周期）。这样传 `open` 后：关闭期间不清（退出动画原位 ✓）、重开时清 false → 走完整 `translate(-200%)` → 定位 → `@placed` 重发（forceMount ✓）、`update()` 的 `open !== false` 守卫继续防「关闭期间计算置位」。属 headless 库层 `useFloating` 的一处小改动 + popper-v2/popper 两处调用补传 `open`，建议随 HoverCard/Menu 迁移批次一并落地（届时 forceMount 用例增加）。

#### T-10 · `useFloating` reset 语义修正 + 接线 `open`（✅ 2026-08-24，随 HoverCard 批次落地，见 §16.5）

- **改动**：`use-floating.ts` 的 `reset()` watcher 改为在 `openOption` 变为 **true** 时清 `isPositioned`（退出动画期间保持 true）；`popper-v2-positioner-impl.vue` 与 `popper-positioner.vue` 的 `useFloating` 调用补传 `open`。
- **验收**：默认场景退出动画原位播放不回归；`forceMount` 场景重开无旧坐标闪帧、`@placed` 每次 open 重新 emit、未定位禁动画门生效。
