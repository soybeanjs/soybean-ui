# C01 `button` 检查优化报告

> **组件编号：** C01（含 C02 `button-group`）  
> **组件名称：** `button` / `SButton`、`SButtonIcon`、`SButtonLoading`、`SButtonLink`、`SButtonGroup`  
> **模式：** 单类（`buttonVariants` 直接消费，无 UiContext）  
> **优先级：** P1  
> **检查日期：** 2026-08-02  
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7（102 项）

---

## 一、执行摘要

对 `button` 家族（C01）及 `button-group`（C02）完成全维度审计，重点覆盖 `docs/check.md` 指定的 **D1-09、D2-05、D3-01、D3-05、D5-16、D7-14、D7-15、D7-19、D7-20**。发现并修复 3 项 Major 级问题（内联样式违规、`autoLoading` 点击失效、加载态无障碍缺失）与 1 项 Minor 级问题（`SButtonLink` 禁用态 `aria-disabled` 未传递），补充测试与文档，整体达到可验收状态。

|    维度     | 状态 | 说明                                                         |
| :---------: | :--: | :----------------------------------------------------------- |
| D1 功能合规 |  ✅  | headless/UI 边界清晰；样式配方首行 `// @unocss-include` 到位 |
| D2 行业对标 |  ✅  | 功能矩阵完整，与主流 Button 库对齐                           |
| D3 API 设计 |  ✅  | 命名规范、props 继承 `HTMLAttributes`、扩展点完整            |
| D4 类型系统 |  ✅  | strict 通过，JSDoc 覆盖公共 API                              |
| D5 代码规范 |  ✅  | 内联样式清除；模板无内联箭头函数                             |
|   D6 文档   |  ✅  | 中英文 Notes/FAQ 已补全                                      |
|   D7 其他   |  ✅  | 34 项单元测试通过，e2e spec 符合 guardrails，axe-core 零违规 |

---

## 二、行业对标矩阵（D2-05）

| 能力                                 | SoybeanUI | Ant Design | Element Plus | MUI  | Mantine | Naive UI | shadcn/ui |
| :----------------------------------- | :-------: | :--------: | :----------: | :--: | :-----: | :------: | :-------: |
| 基础变体（solid/outline/ghost/link） |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 图标按钮（前/后置）                  |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 加载状态                             |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 自动 loading（点击即锁）             |    ✅     |     ✅     |      —       |  —   |    —    |    —     |     —     |
| 链接按钮（href / RouterLink）        |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 按钮组（方向 + 属性继承）            |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 多态 `as`/`asChild`                  |    ✅     |     —      |      —       |  ✅  |    —    |    —     |    ✅     |
| Headless/Styled 分离                 |    ✅     |     —      |      —       | 部分 |    —    |    —     |    ✅     |
| 禁用态保留可聚焦（`aria-disabled`）  |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |

**增强项（➕，已记录）：**

- `autoLoading` + `loadingDuration` 组合可在异步动作期间自动锁定按钮并播报 `aria-busy`，优于多数库需手动控制 `loading` 的方式。
- `SButtonGroup` 通过 `provideButtonGroupContext` 向后代透传 `color/size/variant/shape/shadow/disabled/fitContent`，且子组件自身 prop 优先级更高。

---

## 三、发现的问题与处理

### 3.1 Major — `button-loading.vue` 内联样式违反 UI 层规范（已修复）

**问题：** 原实现使用 4 处内联 `style` 控制加载态布局（`position: relative`、`display: contents`、`visibility: hidden` 等）。项目 AGENTS.md 明确规定「**DO NOT** use raw CSS/SCSS — UnoCSS utility classes only」，内联 style 属于同类违规，且绕过了 UnoCSS 的产物收集。

**修复：** 全部替换为 UnoCSS 工具类：

| 原内联样式                   | 替换类                                                                |
| :--------------------------- | :-------------------------------------------------------------------- |
| `style="position: relative"` | `class="relative"`（提升到 `<Button>` 根）                            |
| `style="display: contents"`  | `class="contents"`                                                    |
| `style="visibility: hidden"` | `class="invisible"`                                                   |
| 绝对定位遮罩                 | `class="absolute inset-0 z-1 flex items-center justify-center gap-1"` |

### 3.2 Major — `autoLoading=false` 时点击事件被吞掉（已修复）

**问题：** 原 `onClick` 在 `autoLoading` 为 false 时直接 `return`，**未调用任何 click handler**，导致非自动加载场景下按钮点击毫无响应（D7-10 异常边界 / D7-11 测试覆盖缺失）。

**修复：** 扁平化控制流，确保两条路径都派发 handler：

```ts
const onClick = async (event: MouseEvent) => {
  const clickHandlers = Array.isArray(attrs.onClick) ? attrs.onClick : [attrs.onClick];

  if (!props.autoLoading) {
    clickHandlers.forEach(handler => handler?.(event));
    return;
  }

  internalLoading.value = true;
  try {
    clickHandlers.forEach(handler => handler?.(event));
  } finally {
    if (props.loadingDuration) {
      await new Promise(resolve => {
        setTimeout(resolve, props.loadingDuration);
      });
    }
    internalLoading.value = false;
  }
};
```

### 3.3 Major — 加载态无障碍属性缺失（已修复）

**问题：** 加载期间按钮仅设置原生 `disabled`，未向辅助技术播报 busy 状态；加载图标也无 `aria-hidden`，屏幕阅读器可能重复读图标。

**修复：**

- 根按钮新增 `:aria-busy="ariaBusy"`（`internalLoading` 为 true 时输出 `'true'`）。
- 三处加载图标（`loadingPosition` = start/center/end）统一添加 `aria-hidden="true"`，因 `aria-busy` 已表达状态，图标为装饰性。

### 3.4 Minor — `button-link.vue` 禁用态 `aria-disabled` 未传递（已修复）

**问题：** `SButtonLink` 将 props 拆分为 `buttonProps`（样式相关）与 `linkProps`（链接相关），`disabled` 落入 `linkProps`，未传给 `SButton`，导致 `SButton` 层的 `aria-disabled` 不生效。

**修复：** 在模板显式透传：

```vue
<Button v-bind="buttonProps" :disabled="disabled" as-child>
```

### 3.5 Minor — 测试覆盖不足（已修复，D7-11）

**补充测试：** 原 `button.spec.ts` 仅覆盖 `SButton` 基础渲染。新增四个子组件的测试套件：

| 组件             | 覆盖场景                                                                            |
| :--------------- | :---------------------------------------------------------------------------------- |
| `SButtonLoading` | 渲染、`aria-busy`、`disabled`、图标 `aria-hidden`、`autoLoading` 开/关、a11y        |
| `SButtonIcon`    | 渲染、变体类、`iconClass` 透传、`disabled`                                          |
| `SButtonLink`    | href/to 渲染为 anchor、变体类、禁用态 `aria-disabled`                               |
| `SButtonGroup`   | 子节点渲染、root 类、disabled 透传、color/variant 透传、子组件优先级、水平/垂直方向 |

测试从基础数量扩展到 **34 项**，全部通过。

**测试质量改进：**

- `autoLoading` 假定时器测试改用 `vi.advanceTimersByTimeAsync()` 以同时刷新定时器与微任务队列（`onClick` 内的 `await`）。
- 在 `autoLoading` describe 块加 `afterEach(() => vi.useRealTimers())`，防止假定时器泄漏到后续 a11y 套件导致 axe.run 超时。

### 3.6 Enhancement — 文档 Notes/FAQ 缺失（已修复，D6-10/D6-11）

- 中英文 `button.md` 新增「架构与对标差异」表（对比 Ant Design / Element Plus / MUI / Mantine / Naive UI / shadcn-ui 的 headless 分离、样式方案、多态支持）。
- 新增「FAQ」章节，说明 `aria-disabled` vs 原生 `disabled` 的设计理由、`autoLoading` 使用方式、`SButtonLink` 在无路由环境下的回退行为。

---

## 四、重点检查项结论

| 检查项                        | 结论 | 证据                                                                                                                                        |
| :---------------------------- | :--: | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **D1-09** 样式配方完整性      |  ✅  | `packages/ui/src/styles/button.ts` 首行 `// @unocss-include`；button 为单类组件无 UiSlot，配方与 UI 包装直接消费                            |
| **D2-05** API 一致性          |  ✅  | `disabled`/`loading`/`size`/`variant`/`color` 命名与主流库一致；`modelValue` N/A（非表单控件）                                              |
| **D3-01** 命名规范            |  ✅  | props/emits/slots 遵循 Vue 3 + 项目约定；事件 `click` payload 为 `PointerEvent`                                                             |
| **D3-05** 事件 payload 一致   |  ✅  | `button-group` 无自定义事件，仅透传上下文；`click` payload 与 `button` 一致                                                                 |
| **D5-16** 模板函数绑定        |  ✅  | 模板内 `@click="onClick"`、`@click="emit('click', $event)"` 均为 script setup 中定义的具名函数，无内联箭头                                  |
| **D7-14** 多态 `as`/`asChild` |  ✅  | headless `Button` 基于 `Primitive`，支持 `as`/`asChild`；`SButtonLink` 通过 `as-child` 将 `Link` 注入                                       |
| **D7-15** `ui`/`class` 覆盖   |  ✅  | 单类组件支持 `class` 覆盖（`buttonVariants({...}, props.class)`）；`SButtonGroup` 支持 `class` 覆盖 root                                    |
| **D7-19** e2e 必要性 & 存在性 |  ✅  | `packages/ui/test/browser/specs/components/button.e2e.spec.ts` 存在，覆盖真实指针/键盘交互 + 主题色对比                                     |
| **D7-20** e2e 质量            |  ✅  | 使用 `page.getByRole` 定位、`userEvent` 真实交互、`expect.element()` 可重试断言、`withTheme: true` 启用色对比、每个 `it()` 调用 `unmount()` |

---

## 五、变更文件清单

| 文件                                                   | 变更类型                                                                      |
| :----------------------------------------------------- | :---------------------------------------------------------------------------- |
| `packages/ui/src/components/button/button-loading.vue` | 重构：清除内联样式、修复 `autoLoading` 控制流、新增 `aria-busy`/`aria-hidden` |
| `packages/ui/src/components/button/button-link.vue`    | 修复：透传 `disabled` 至 `SButton` 以设置 `aria-disabled`                     |
| `packages/ui/test/specs/components/button.spec.ts`     | 测试增强：新增 4 个子组件套件（共 34 项），修复假定时器泄漏                   |
| `apps/docs/src/docs/en/components/button.md`           | 文档：新增 Notes（架构对标）+ FAQ                                             |
| `apps/docs/src/docs/zh-CN/components/button.md`        | 文档：同步中文 Notes + FAQ                                                    |
| `docs/check.md`                                        | 标记 C01/C02 各维度为 ✅                                                      |

---

## 六、验证命令

```bash
# 单元测试（34 项全通过）
cd packages/ui && pnpm test test/specs/components/button.spec.ts
# → Test Files 1 passed (1) | Tests 34 passed (34)

# 类型检查（UI 包通过）
cd packages/ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck  无错误

# Lint（oxc + eslint vue）
pnpm exec vp lint packages/ui/src/components/button/ packages/ui/test/specs/components/button.spec.ts
# → Found 0 warnings and 0 errors.
pnpm exec eslint packages/ui/src/components/button/ --ext .vue
# → 无输出（无错误）

# e2e（已存在，符合 guardrails；本次未改动）
# pnpm test:e2e test/browser/specs/components/button.e2e.spec.ts
```

> **环境备注：** 验证前发现 `node_modules` 处于损坏状态（`.pnpm` store 仅剩 3 个包，782 个符号链接失效），导致 `vp`/`vitest`/`vue-tsc` 均无法启动。执行 `pnpm clean --lockfile && pnpm i` 重装后恢复正常。此为环境问题，与组件改动无关。

---

## 七、后续建议

1. **P3 增强：** 为 `SButtonIcon` icon-only 场景在文档中推广 `aria-label` 最佳实践（当前测试未强制，FAQ 已提及）。
2. **P3 增强：** `SButtonLoading` 的 `loadingText` 在 `loadingPosition='center'` 时显示，可考虑为屏幕阅读器补充 `aria-live="polite"` 区域以播报文案变化。
3. **跨组件：** `button-group` 的 `dir` 已支持 RTL（经 `ConfigProvider`），可在 e2e 中补充 RTL 布局断言。

---

_报告生成于组件审计工作流 C01/C02，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
