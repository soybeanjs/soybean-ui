# C04 `link` 检查优化报告

> **组件编号：** C04  
> **组件名称：** `link` / `SLink`  
> **模式：** 单类（`linkVariants(undefined, props.class)` 直接消费，无 UiContext）  
> **优先级：** P2  
> **检查日期：** 2026-08-02  
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7  
> **重点项：** D1-09、D3-08、D7-14

---

## 一、执行摘要

对 `SLink` 组件完成全维度审计。发现并修复 2 项 Major 级问题（`withDefaults` 含不存在的 `custom` prop、冗余 `data-link` 属性违反 D1-07）与 1 项 Minor 级问题（测试覆盖不足，首个测试甚至未测试 SLink），补充测试与文档，整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                         |
| :---------: | :--: | :------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | `link.ts` 首行 `// @unocss-include`（D1-09）；`data-soybean-link` 属性已清理冗余 `data-link` |
| D2 行业对标 |  ✅  | 智能路由检测、外部链接安全默认值、RouterLink 降级，对标 Nuxt Link / React Router Link        |
| D3 API 设计 |  ✅  | `as`/`asChild` 多态 ✅；`class` 覆盖 ✅；slot 透传 ✅（D3-08）                               |
| D4 类型系统 |  ✅  | strict 通过；`withDefaults` 防止 Boolean 转换；移除不存在的 `custom` prop                    |
| D5 代码规范 |  ✅  | type-based `defineProps` + `withDefaults`；UnoCSS 工具类                                     |
|   D6 文档   |  ✅  | 中英文文档统一；新增特性、无障碍、架构对标表、FAQ                                            |
|   D7 其他   |  ✅  | 19 项单元测试通过（D7-14 多态已覆盖）；axe-core 零违规                                       |

---

## 二、行业对标矩阵

| 能力                                       | SoybeanUI | Nuxt Link | React Router Link | Next.js Link | Ant Design Typography.Link | MUI Link |
| :----------------------------------------- | :-------: | :-------: | :---------------: | :----------: | :------------------------: | :------: |
| 内部路由（RouterLink）                     |    ✅     |    ✅     |        ✅         |      ✅      |             —              |    —     |
| 外部链接（href）                           |    ✅     |    ✅     |        ✅         |      ✅      |             ✅             |    ✅    |
| 自动路由/外部检测                          |    ✅     |     —     |         —         |      —       |             —              |    —     |
| 自动 `target="_blank"`                     |    ✅     |     —     |         —         |      —       |             —              |    —     |
| 自动 `rel="noopener noreferrer"`           |    ✅     |     —     |         —         |      —       |             —              |    ✅    |
| 禁用状态（aria-disabled + preventDefault） |    ✅     |     —     |         —         |      —       |             ✅             |    —     |
| `as`/`asChild` 多态                        |    ✅     |    ✅     |        ✅         |      —       |             —              |    ✅    |
| 无 RouterLink 降级为 `<a>`                 |    ✅     |     —     |         —         |      —       |             ✅             |    ✅    |

**增强项（➕）：**

- 自动路由/外部检测：通过 `http` 前缀、`external` prop、RouterLink 可用性三重判断，自动选择渲染方式。
- 安全默认值：外部链接自动设置 `target="_blank"` + `rel="noopener noreferrer"`，无需手动配置。
- 无障碍禁用：`aria-disabled` + `tabindex="-1"` + `role="link"` + `preventDefault()`，优于主流库需手动处理。

---

## 三、发现的问题与处理

### 3.1 Major — `withDefaults` 含不存在的 `custom` prop（已修复，D4）

**问题：** UI `link.vue` 的 `withDefaults` 中包含 `custom: undefined`，但 `LinkProps`（继承自 headless `LinkProps`）不包含 `custom` 属性。`custom` 是 NuxtLink 的 prop，但未在类型中声明，属于死代码。

**修复：** 移除 `custom: undefined`。

```diff
 const props = withDefaults(defineProps<LinkProps>(), {
   disabled: undefined,
   external: undefined,
   noRel: undefined,
   prefetch: undefined,
   noPrefetch: undefined,
-  custom: undefined,
   viewTransition: undefined,
   replace: undefined
 });
```

### 3.2 Major — 冗余 `data-link` 属性违反 D1-07（已修复，D1）

**问题：** Headless `link.vue` 在两个渲染分支上都同时设置了 `data-soybean-link` 和 `data-link`。D1-07 规定每个 headless slot 根元素携带 `data-soybean-{name}` 属性，`data-link` 是冗余的。

**修复：** 移除 `data-link`，仅保留 `data-soybean-link`。

### 3.3 Minor — 测试覆盖严重不足（已修复，D7-11）

**问题：** 原测试仅 4 项，且首个测试（`renders an anchor element with default slot content`）直接在 `SConfigProvider` 中渲染原生 `<a>` 标签，完全没有测试 `SLink` 组件。缺少对 `href`/`to`、外部链接检测、`target`/`rel` 默认值、禁用点击阻止、多态渲染的覆盖。

**修复：** 重写测试，从 4 项扩展到 19 项，新增覆盖：

| 套件              | 覆盖场景                                                                                             |
| :---------------- | :--------------------------------------------------------------------------------------------------- |
| rendering         | 锚点渲染、`data-soybean-link` 属性、`data-link` 冗余已移除、`linkVariants` 基础类、自定义 class 透传 |
| href and external | `href` 设置、`target="_blank"` 默认、`rel` 默认、显式 `target`、`to` 为 http 字符串时视为外部        |
| disabled state    | `aria-disabled`、`role="link"`、`tabindex="-1"`、`preventDefault` 点击阻止、`data-disabled` 属性     |
| polymorphic       | `as="button"` 渲染为 button、`as="span"` 渲染为 span                                                 |
| accessibility     | 正常状态 axe-core 零违规、禁用状态 axe-core 零违规                                                   |

---

## 四、重点检查项结论

| 检查项                   | 结论 | 证据                                                                                                                                          |
| :----------------------- | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方完整性 |  ✅  | `packages/ui/src/styles/link.ts` 首行 `// @unocss-include`；单类组件无 slots，slot key 匹配 N/A                                               |
| **D3-08** 扩展点         |  ✅  | `as`/`asChild` via `PrimitiveWithBaseProps` ✅；`class` 覆盖 via `linkVariants(undefined, props.class)` ✅；slot 透传 `v-slot="slotProps"` ✅ |
| **D7-14** 多态支持       |  ✅  | `as="button"` / `as="span"` 测试通过；`asChild` via `Primitive` 支持；不强制固定根标签                                                        |

---

## 五、变更文件清单

| 文件                                             | 变更类型                                                                             |
| :----------------------------------------------- | :----------------------------------------------------------------------------------- |
| `packages/ui/src/components/link/link.vue`       | 修复：移除不存在的 `custom` prop（withDefaults 死代码）                              |
| `packages/headless/src/components/link/link.vue` | 修复：移除冗余 `data-link` 属性（D1-07 合规）                                        |
| `packages/ui/test/specs/components/link.spec.ts` | 重写：4 项 → 19 项（rendering、href/external、disabled、polymorphic、accessibility） |
| `apps/docs/src/docs/zh-CN/components/link.md`    | 文档：新增特性、无障碍、架构对标表、FAQ                                              |
| `apps/docs/src/docs/en/components/link.md`       | 文档：added Features, Accessibility, architecture table, FAQ                         |
| `docs/check.md`                                  | 标记 C04 各维度为 ✅                                                                 |

---

## 六、验证命令

```bash
# 单元测试（19 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/link.spec.ts
# → Test Files 1 passed (1) | Tests 19 passed (19)

# 类型检查（UI 包通过）
cd packages/ui && pnpm exec vue-tsc --noEmit --skipLibCheck
# → 无错误

# Lint
pnpm exec eslint packages/ui/src/components/link/link.vue packages/headless/src/components/link/link.vue
# → 无错误无警告
```

---

## 七、后续建议

1. **P3 增强：** 补充 playground 示例（`apps/playground/src/examples/link/`），当前 `<PlaygroundGallery>` 渲染为空。建议添加 `01-basic`（href/to）、`02-disabled`、`03-external`、`04-polymorphic` 示例。
2. **P3 增强：** 为 `SLink` 补充 e2e 测试，验证真实浏览器中 RouterLink 集成、外部链接 `target`/`rel`、禁用状态键盘交互。
3. **P3 增强：** 考虑增加 `underline` 变体（`hover`/`always`/`none`），对标 MUI Link / Mantine Text `td` 属性。

---

_报告生成于组件审计工作流 C04，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
