# Drawer 重构方案:采纳 Base UI 模型重写 headless drawer

> 定位:v0.50.0 窗口内对 headless `drawer` 家族(原 bottom-sheet,commit de5cb8680 落地)的**二次重构执行清单**——解决交付后暴露的手势/吸附缺陷,采纳 [Base UI Drawer](https://github.com/mui/base-ui/tree/v1.8.0/packages/react/src/drawer) 的核心架构模型。
> 状态:🚧 执行中(2026-09-13:D1/D2/D3.1/D3.2/D3.3/D4 已完成,D4.3 测试合同已随契约测试落地;仅剩 D3.4 真机矩阵待收尾。D4.3 移植过程中修复四个实现缺陷:releaseVelocity 尾速度恒为 0、手势速度采样混用 client/transform 两套坐标系、双指 pinch 经 bubble 委托泄漏拖拽、SwipeArea 非受控打开失效;另修 `update:snapPoint` 双发)。
> **D3.4 真机进展(2026-09-14,iOS Safari)**:吸附点抽屉首次打开先在约 25% 处停一下、再动画纠正到目标吸附点。**根因(Playwright 逐帧复现 + 真机采样确认)**:① 打开抽屉会锁 body 滚动([useBodyScrollLock](../packages/headless/src/composables/use-body-scroll-lock.ts) 用 `position: fixed` + 负 `top`),而 **iOS Safari 在 body 不再可滚动时会把工具栏重新显示出来** —— 真机实测视口 `741 → 659`(工具栏可见时打开不复现、收起后打开才复现),固定层(含抽屉)整体位移 82px;② 该视口变化发生在打开过程中,而盒子高度(ResizeObserver,100ms 防抖)与吸附高度(按视口换算)读取时刻不同,真机采样到偏移走 `338.5 → 379.5 → 297.5`(中间那步是「新视口 + 旧盒子高度」),抽屉停在错误位置,等盒子重测到 627 才带 `transform` 过渡纠正。**修复两处**:① **iOS 上不打 body 样式**(背景触摸滚动本就由 document 上的 `touchmove` 守卫承担),页面滚动状态不变 → 工具栏不复现、无位移;内容槽补 `[overscroll-behavior:contain]`,避免抽屉滚到边界链式滚动到背景。② 视口变化时**立刻重测盒子**(`viewportRevision`),使高度与偏移**同帧一致**。回归用例:drawer「视口变化重算几何」一条(含逆向验证:禁用修复即失败)+ `use-body-scroll-lock` 的 iOS「不打 body 样式」一条。**已知残余**:视口**变大**时被 `--soybean-drawer-height` 钉住的盒子不会自动长大(约 46% 而非 50%),不闪烁;需要时按「清一帧高度变量再重测」处理。**iOS 复验(2026-09-14)**:工具栏不再复现,抽屉一次滑入 50% ✅(提交 `918000b3f` + `4f32ccf9e`);待 Android Chrome / 移动 Firefox 复验。
> 分析基线:Base UI v1.8.0 源码实读(非测试源码约 4700 行,含 1159 行共享手势引擎 `useSwipeDismiss`)+ 本仓 `packages/headless/src/components/drawer/`(约 2900 行,Vaul 移植)实读。
> 组件规范:[`.agents/skills/soybean-ui-develop/`](../.agents/skills/soybean-ui-develop/SKILL.md)。

## 0. 结论先行

1. **现有实现是 Vaul 的命令式移植,三个交付缺陷(见 §1)均为其模型缺陷,修补无解,需换模型。**
2. **不是 1:1 照抄 Base UI**(React 基建差异决定抄不动),而是采纳它的**三支柱**:CSS 变量驱动 transform、统一手势引擎、可解析 snap point 值模型。
3. **scale-background 的 Vaul 式命令式实现退役,由 Base UI 的 Indent 效果承接**:删除 `use-scale-background.ts` + `DRAWER_SCALE_SELECTOR`(querySelector + 命令式写 scale/border-radius),改落地 `Drawer.Indent` / `Drawer.IndentBackground` 原语——页面内容缩进与背景层都由 `--soybean-drawer-swipe-progress` / `--soybean-drawer-height` CSS 变量声明式驱动,backdrop swipe-progress 同时保留。删的是实现方式,能力不降级。
4. 难度集中在手势引擎与触摸管线;snap point / popup / root 部分比现状更简单。
5. API 有 breaking 变化(`swipeDirection` 显式 prop、snapPoints 值语义、`activeSnapPoint=null` 表示关闭),正好落在 v0.50.0 窗口,不另开兼容层。

## 1. 现状缺陷与根因

| #   | 现象                                                            | 根因(源码定位)                                                                                                                                                                                                                                                      |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | handle 在所有 side 都渲染,仅 bottom 语义正确                    | [drawer-compact.vue](../packages/headless/src/components/drawer/drawer-compact.vue) 无条件渲染 `<DrawerHandle />`;`drawerVariants` 的 handle 样式全部按 bottom 朝向(`mt-*` 横条)                                                                                    |
| 2   | bottom 侧先下后上拖拽,popup 脱离底边露出背景,状态卡滞           | [context.ts](../packages/headless/src/components/drawer/context.ts) `onDrag` 向上拖直接写 `translate3d(0,-Xpx,0)`,而 popup 是 `bottom-0` 锚定;`shouldDrag`/`isAllowedToDrag` 启发式放行后不收回,`resetDrawer` 靠 matrix 反解复位                                    |
| 3   | snap points:拖到顶再往下闪现中间档、遮罩消失、重开后 hover 即关 | ① `snapPoint` 默认 `null` 而非 `snapPoints[0]`,打开时 popup 未被定位(UI 层也没消费 `--snap-point-height`);② `snapToPoint` 命令式写 overlay `opacity` 并入 WeakMap 缓存,与 Dialog overlay 过渡互相覆盖;③ `closeDrawer` 500ms 定时器重置 snapPoint 与重开/resize 竞态 |

共性病灶:**JS 直接写 inline transform/opacity + WeakMap 样式缓存 + `getComputedStyle` matrix 反解 + `setTimeout` 状态恢复**,与 Vue 声明式渲染、Dialog 过渡生命周期天然竞态。

## 2. Base UI v1.8.0 架构要点(实读结论)

非测试源码分布:root 477 / provider 117 / popup 480 / viewport 1237 / swipe-area 526 / handle 22 / backdrop 79 / indent 161 / virtual-keyboard-provider 858 / 共享手势引擎 `utils/useSwipeDismiss.ts` 1159。

三支柱:

1. **CSS 变量驱动 transform**。拖拽全程 JS 只写变量,从不写 `transform` 字符串。popup 的 transform 由消费者 CSS 承担:`translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y)))`。换吸附点 = 改一个变量,动画交给 CSS transition;拖拽中才冻结 `transition: none`。配套 `CSS.registerProperty({ inherits: false })` 优化重算。变量清单:`--drawer-snap-point-offset`、`--drawer-swipe-movement-x/y`、`--drawer-swipe-progress`、`--drawer-swipe-strength`、`--drawer-height`。
2. **统一手势引擎,两个消费者**。`useSwipeDismiss` 是单一状态机:指针/触摸双通道、带 bias 的轴锁定(6px slop)、方向 sqrt 阻尼、反向 10px「反悔取消」阈值、速度采样(尾样本 + 80ms 时效)、scroll-edge 起滑、跨轴滚动仲裁(`findScrollableTouchTarget` + 非 cancelable touchmove 让位 + 双指缩放豁免)、文本选区/range input 豁免。`DrawerViewport`(关闭手势)与 `DrawerSwipeArea`(打开手势)都消费它;触摸走原生 capture 阶段 touchmove 灌回同一管线。
3. **Snap point 值模型**。snapPoints(≤1 为视口比例,>1 为 px,支持 `'30rem'`)解析为 `{ value, height, offset }`,基于 ResizeObserver 实测 popupHeight + viewportHeight,clamp + 去重。释放判定:`targetOffset = clamp(当前offset + dragDelta + velocity×300)`,取最近吸附点;离关闭更近或快扫则关闭(`activeSnapPoint = null`)。受控/非受控统一走可取消的 `onSnapPointChange(details)`。

辅助机制:**Indent 效果(scale-background 的对位物)**——`Drawer.Provider` 持有 `visualStateStore`(swipeProgress + frontmostHeight,外部 store 订阅不触发重渲染);`Drawer.Indent` 包裹消费者应用主 UI,任意抽屉打开时挂 `data-active` 并同步 `--drawer-swipe-progress` / `--drawer-height` 两个 CSS 变量,缩进/缩放/圆角量由消费者 CSS 以 `calc(var(--drawer-swipe-progress) * Npx)` 自行声明;`Drawer.IndentBackground` 置于 Indent 之前作背景层。其余:嵌套抽屉栈(frontmostHeight / 嵌套 swipe progress 向父传播)、SwipeArea 防止松手 click 立即关掉刚打开抽屉的精确守卫、Android CloseWatcher、iOS 虚拟键盘 provider。Root 本身很薄,开关状态完全复用 Dialog store。

## 3. 目标架构(本仓落地形态)

- headless `drawer` 家族保留现有解剖(Root / Trigger / Portal / Overlay / Popup / Viewport / Handle / SwipeArea / Content / Header / Footer / Title / Description / Close / Nested),**内部逻辑整体换血**;新增 **Indent / IndentBackground** 两个原语(承接 scale-background 能力)。
- popup transform 改为 CSS 变量驱动;UI 层 `styles/sheet.ts` 的 popup 槽声明 `transform: translateY(calc(var(--soybean-drawer-snap-point-offset) + var(--soybean-drawer-swipe-movement-y)))`(变量名沿用本仓 `--soybean-*` 命名空间)。
- `use-snap-points.ts` 删除,换 `use-drawer-snap-points.ts`(值解析 + 实测高度);`use-swipe-dismiss.ts` 扩展为全量手势引擎;`use-scale-background.ts` 删除,由 Indent 原语 + visualStateStore(`swipeProgress` / `frontmostHeight`)承接。
- Overlay 透明度/scale 全部走 CSS 变量 + data 属性,不再命令式写。
- headless 不默认渲染 handle;Compact 按 `side === 'bottom'` 决定是否渲染 handle(问题 1 的定论)。

## 4. 分阶段任务清单

| 阶段 | 主题               | 内容                                                                                    |
| ---- | ------------------ | --------------------------------------------------------------------------------------- |
| D1   | 模型切换(修三缺陷) | CSS 变量接线、snap point 换模型、handle 按 side 渲染、overlay 声明式化;桌面指针路径可用 |
| D2   | 手势引擎全量化     | `useSwipeDismiss` 扩展(反悔取消、速度尾采样、scroll-edge、跨轴仲裁)                     |
| D3   | 触摸管线           | 原生 capture touchmove 灌管、滚动仲裁、SwipeArea 打开手势 + release-click 守卫;真机验证 |
| D4   | 收尾与合同         | 删 scale-background、迁移文档、测试合同、API/生成数据重生成                             |

### D1 模型切换(最小版本,约 3–4 天)

| #    | 任务                                                                                                                                                                                      | 验收                                                                 | 状态 |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---- |
| D1.1 | popup transform 改 CSS 变量驱动:headless 写 `--soybean-drawer-snap-point-offset` / `--soybean-drawer-swipe-movement-x/y`,`styles/sheet.ts` popup 槽声明 calc transform 与 transition      | 拖拽全程无 JS 写 `transform` 字符串;松手弹回无卡滞                   | ✅   |
| D1.2 | 新建 `use-drawer-snap-points.ts`(值解析 ≤1 比例 / >1 px / 字符串单位 → {value,height,offset},ResizeObserver 实测,clamp + 去重),替换 `use-snap-points.ts`;`snapPoint` 默认 `snapPoints[0]` | 打开即定位第一档;换档 = 变量变化,CSS transition 动画;无 500ms 定时器 | ✅   |
| D1.3 | 释放判定移植:`targetOffset = clamp(offset + dragDelta + velocity×300)` 取最近;离关闭更近或快扫关闭;`snapToSequentialPoints` 逐级                                                          | 快扫/慢拖/反向收回判定正确                                           | ✅   |
| D1.4 | overlay 声明式化:透明度/进度由 `--soybean-drawer-swipe-progress` + `data-state` 承担,删除 WeakMap `set/reset` 对 overlay 的命令式写入                                                     | 遮罩不再消失/闪烁                                                    | ✅   |
| D1.5 | handle 按 side 条件渲染:headless Compact 仅 `side === 'bottom'` 渲染 handle;`drawerVariants` handle 样式收敛到 bottom 分支                                                                | top/left/right 无 handle;bottom 不回归                               | ✅   |
| D1.6 | `--soybean-drawer-height` 实测接线(popup ResizeObserver 上报);popup/viewport 状态属性对齐(`data-swiping` / `data-swipe-direction` / `data-expanded`)                                      | 高度变化(内容增删)不破坏定位                                         | ✅   |

### D2 手势引擎全量化(约 1–2 天)

| #    | 任务                                                                                                                                                                                           | 验收                                      | 状态 |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---- |
| D2.1 | 扩展 [use-swipe-dismiss.ts](../packages/headless/src/components/drawer/use-swipe-dismiss.ts):反向「反悔取消」阈值、速度尾样本 + 80ms 时效、pending-start、首帧位移吸收(iOS touchmove 起步偏移) | 快扫尾速不被末帧抖动污染;反向拖 10px 收回 | ✅   |
| D2.2 | scroll-edge 起滑与滚动仲裁:滚动容器边缘可起滑、非 cancelable touchmove 让位、跨轴锁定(6px slop + bias)                                                                                         | 内容滚动与抽屉拖拽不互相吞                | ✅   |
| D2.3 | 交互元素/选区豁免:`button,a,input,textarea,[role=button]` 上不起滑(触摸可配)、选区/range input 豁免                                                                                            | 表单控件内拖拽不误触                      | ✅   |

### D3 触摸管线 + SwipeArea(约 2–3 天)

| #    | 任务                                                                                                                                                                                                             | 验收                                                      | 状态                                                                                                                                                                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D3.1 | Viewport 原生 capture touchmove 管线:`addEventListener(touchmove, {passive:false, capture:true})` → 灌入手势引擎 + `stopPropagation`,TouchScrollState 仲裁状态机                                                 | 触摸拖拽帧稳定不抖;页面滚动不被误锁                       | ✅                                                                                                                                                                          |
| D3.2 | SwipeArea 打开手势改吃统一引擎:`trackDrag=false` + sqrt 阻尼跟手、50% 距离或速度开档、松手 click 守卫(capture pointerdown/click 恢复 outside-press)                                                              | 边缘滑开不闪;松手不会立刻误关                             | ✅                                                                                                                                                                          |
| D3.3 | 层级感接线:backdrop swipe-progress + `Drawer.Indent` / `Drawer.IndentBackground` 原语(visualStateStore 同步 `swipeProgress` / `frontmostHeight`,缩进量由消费者 CSS calc 声明),替代 scale-background 的命令式缩放 | 拖拽时 backdrop 与页面内容缩进跟随进度;嵌套抽屉进度不互串 | ✅                                                                                                                                                                          |
| D3.4 | 真机验证:iOS Safari / Android Chrome / 移动 Firefox,滚动让位、双指缩放豁免、键盘弹起场景                                                                                                                         | 三平台核心手势无回退                                      | ⬜(进行中:iOS 首轮已定位并修复「滚动锁致工具栏复现 → 几何中途重算」，**iOS 复验通过**(2026-09-14，工具栏不再出现、抽屉一次滑入 50%)；待 Android Chrome / 移动 Firefox 复验) |

### D4 收尾与合同(约 1 天)

| #    | 任务                                                                                                                                                                | 验收                                                 | 状态                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D4.1 | 删除 scale-background 全链路:`use-scale-background.ts`、`DRAWER_SCALE_SELECTOR`、`shouldScaleBackground` / `setBackgroundColorOnScale` props、相关样式              | `grep scale-background packages` 为 0                | ✅                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| D4.2 | 迁移对照文档(双语):`swipeDirection`、snapPoints 值语义、scale-background → Indent 原语(`Drawer.Indent` / `Drawer.IndentBackground` + CSS 变量)、handle 渲染策略变化 | 双语文档进 `content/{en,zh}/ui/components/drawer.md` | ✅                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| D4.3 | 测试合同:从 Base UI `DrawerRoot.test.tsx` / `DrawerViewport.test.tsx` 移植核心场景(开合、snap 点判定、滚动仲裁、SwipeArea、嵌套)到 vitest browser mode              | 行为合同单测全绿;axe 通过                            | ✅(2026-09-13:新增 `drawer-snap` 7 例(近点吸附/慢拖贴边关闭/快扫关闭/越界 sqrt 阻尼/跨重开持久/受控事件)、`drawer-touch` 6 例(滚动顶边认领/中途滚动让位/非 cancelable 续驱/跨轴让位/range input 豁免/双指豁免)、`drawer-swipe-area` 5 例(过半提交/短拖回落/快扫开档/disabled/非受控打开),共享 `test/browser/shared/drawer.ts`(timeStamp 钉定的 timed swipe + 合成 Touch 管线);开合与嵌套复用既有 drawer/drawer-drag 套件,axe 通过。模型差异:not cancellable close、snap 点跨重开持久(非关闭时重置)、无受控 null snap 打开语义) |
| D4.4 | 重生成:`pnpm sui gen catalog headless` / `gen catalog ui` / `gen api` / `gen changelog` / `gen skills`;e2e 用例更新                                                 | catalog/api 无 drift                                 | ✅                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## 5. API 变化对照(breaking,v0.50.0 窗口内)

| 项                                                    | 现状(Vaul 移植)         | 目标(Base UI 模型)                                                                                                              |
| ----------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 拖拽方向                                              | 从 `side` 隐式推导      | 显式 `swipeDirection` prop(默认 `'down'`),有 snapPoints 时垂直方向自动双向                                                      |
| snapPoints 值                                         | 数字 ≤1 为比例,>1 px    | 不变,另支持 `'148px'` / `'30rem'` 字符串                                                                                        |
| `snapPoint` 默认值                                    | `null`(打开不定位)      | `snapPoints[0]`(打开即定位)                                                                                                     |
| 关闭表示                                              | `open=false`            | `open=false`;snap point 模型下关闭 = `activeSnapPoint=null` + swipe 关闭动画                                                    |
| `shouldScaleBackground` / `setBackgroundColorOnScale` | 存在(Vaul 遗产)         | **删除命令式实现**,由 `Drawer.Indent` / `Drawer.IndentBackground` + `--soybean-drawer-swipe-progress` 承接(与 Base UI 同名机制) |
| handle                                                | 所有 side 渲染          | 仅 `side='bottom'` 渲染(Compact);headless 保持为独立可组合 part                                                                 |
| `onSnapPointChange`                                   | `update:snapPoint` 事件 | 保留 `update:snapPoint`,补可取消 details(reason: swipe 等)                                                                      |

## 6. 明确不做(第一期)

- iOS 虚拟键盘 provider(Base UI 858 行,需真机矩阵验证,出现真实需求再立项)。
- Android CloseWatcher(随 Dialog 域统一处理,不在 drawer 单独做)。
- 横向 side 的 snap points(维持「仅纵向吸附」的首版声明)。

## 7. 风险

| 风险                                            | 缓解                                                                                   |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| 触摸管线平台敏感(capture/滚动仲裁/iOS 起步偏移) | D3.4 真机矩阵;Base UI 测试场景作为合同先行移植;触摸路径与指针路径分阶段上线            |
| 删 scale-background 引发视觉回退                | D3.3 Indent 原语 + backdrop 进度先行接线,与 scale-background 并存一版,验收后再删(D4.1) |
| 与 Dialog 过渡生命周期的竞态(问题 3 病灶)       | 模型切换后 JS 不再写 overlay/transform 样式,竞态面消失;保留竞态专项用例                |
| API breaking 面扩大                             | 全部 breaking 收敛在 v0.50.0 迁移文档(D4.2),不建兼容层(见 v0.50.0.md §11)              |

## 8. 工作量与排期

| 阶段 | 内容                            | 估算     |
| ---- | ------------------------------- | -------- |
| D1   | 模型切换(修三缺陷,指针路径)     | 3–4 天   |
| D2   | 手势引擎全量化                  | 1–2 天   |
| D3   | 触摸管线 + SwipeArea + 真机     | 2–3 天   |
| D4   | 收尾、迁移文档、测试合同        | 1 天     |
| 合计 | 完整核心(不含虚拟键盘 provider) | 1.5–2 周 |
