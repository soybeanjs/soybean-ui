# SoybeanUI Roadmap

This document tracks planned improvements to SoybeanUI based on a comparison with mainstream Vue UI libraries (shadcn-vue, Radix Vue, PrimeVue, Nuxt UI, Element Plus, Naive UI).

English | [中文](#中文版)

---

## P0 — Engineering Reliability

> Impacts production trustworthiness. Must be addressed before further feature work.

### Testing Coverage

- [x] Add `test/specs/components/` — component-level render + interaction tests using `@vue/test-utils`
  - [x] Core primitives: `Button`, `Input`, `Checkbox`, `Switch`
  - [x] Disclosure components: `Accordion`
  - [x] Navigation: `Tabs`
  - [ ] (Follow-up) `Dialog`, `Collapsible`, `NavigationMenu`, `DropdownMenu`, `Form`, `Select`, `RadioGroup`
- [x] Integrate `axe-core` for automated a11y testing within vitest (`test/shared/a11y.ts`)
- [ ] (Long-term) Add Playwright E2E tests for critical flows: Dialog open/close, Form submit, Toast trigger

### CI / CD

- [x] Add `ci.yml` — triggered on every PR: `pnpm typecheck && pnpm lint && pnpm test`
- [ ] (Long-term) Add bundle size bot — comment on PRs with per-component size change

---

## P1 — Competitiveness Against Mainstream Libraries

> Missing components and core mechanisms that users expect.

### Missing Components (Priority 2 in README)

| Component        | Equivalent in Other Libraries                         |
| ---------------- | ----------------------------------------------------- |
| Skeleton         | shadcn-vue, Nuxt UI, PrimeVue                         |
| Slider           | All major libraries                                   |
| ScrollArea       | Radix Vue, shadcn-vue                                 |
| PinInput         | shadcn-vue (InputOTP)                                 |
| Menubar          | shadcn-vue, Radix Vue                                 |
| Toggle           | shadcn-vue, Radix Vue                                 |
| ToggleGroup      | ✅ shadcn-vue, Radix Vue                               |
| Table (UI layer) | headless exists; `src/components/table` still missing |
| DataTable        | shadcn-vue (TanStack Table integration)               |
| ColorPicker      | Element Plus, Naive UI                                |

Tracking:

- [x] Skeleton
- [ ] Slider
- [ ] ScrollArea
- [ ] PinInput
- [ ] Menubar
- [ ] Toggle
- [x] ToggleGroup
- [ ] Table (UI layer — `src/components/table`)
- [ ] DataTable (with TanStack Table)
- [ ] ColorPicker

### Internationalization (i18n)

ConfigProvider already has a `locale` prop but has no bundled locale content.

- [ ] Create `headless/src/locale/en.ts` — English strings for component internals (Pagination labels, Dialog close aria-label, etc.)
- [ ] Create `headless/src/locale/zh-CN.ts` — Simplified Chinese
- [ ] Wire locale through ConfigProvider → all components that render user-visible strings
- [ ] Document the locale API and list all locale keys

### Documentation

- [ ] Add `CONTRIBUTING.md` — development setup, PR guidelines, commit convention, coding standards
- [ ] Embed Stackblitz / CodeSandbox for interactive playground in component docs
- [ ] Add CSS variable reference page — document all `@soybeanjs/shadcn-theme` design tokens
- [ ] Add migration guide page for breaking changes between major versions

---

## P2 — Ecosystem Completeness

### Motion / Animation System

Currently: `@formkit/auto-animate` + `unocss-preset-animations`. No `prefers-reduced-motion` support at the component level (only registered in docs via vueuse).

- [ ] Add `reducedMotion?: boolean` option to `ConfigProvider`
- [ ] Headless root elements bind `data-reduced-motion` attribute based on config or OS preference
- [ ] Document animation customization — how to override `@keyframes` and use `data-state` transitions

### Theme System Depth

- [ ] Add multiple built-in theme presets (zinc / slate / stone / rose / etc., matching shadcn color palettes)
- [ ] Add `createShadcnTheme` usage documentation with live preview in docs
- [ ] Add design token export in JSON and CSS formats for design tool integration (Figma, etc.)

### Form Ecosystem

Current: Zod + Valibot validation supported, but missing advanced patterns.

- [ ] Implement `FieldArray` — dynamic form item lists (add/remove fields)
- [ ] Add conditional field examples — show/hide fields based on other field values
- [ ] Write official integration guide for VeeValidate
- [ ] Document server-side validation error injection into form fields

---

## P3 — Long-term Investment

### Priority 3 Components (Complex, Third-party Dependency)

- [ ] Calendar (integrate v-calendar or build from scratch)
- [ ] RangeCalendar
- [ ] DatePicker / DateRangePicker
- [ ] DateField / DateRangeField / TimeField / TimePicker
- [ ] Carousel
- [ ] Stepper
- [ ] TagsInput
- [ ] HoverCard
- [ ] Editable
- [ ] Timeline
- [ ] Resizable / Splitter
- [ ] Toolbar
- [ ] BottomSheet

### Priority 4 Components (Specialized)

- [ ] AutoComplete (with virtualization)
- [ ] Cascader (with virtualization)
- [ ] Combobox (with virtualization)
- [ ] Upload
- [ ] Rating
- [ ] Spinner / LoadingBar
- [ ] Typography
- [ ] QRCode
- [ ] Transfer
- [ ] TreeSelect
- [ ] Watermark
- [ ] Statistic / NumberAnimation
- [ ] Tour
- [ ] Empty / Result
- [ ] Ellipsis

### Visual Testing & Tooling

- [ ] Add Storybook for component-isolated development and visual browsing
- [ ] Add visual regression tests (Chromatic or Percy)
- [ ] Add Figma Kit link / reference in documentation

---

## Completed Reference

| Area                                                                      | Status |
| ------------------------------------------------------------------------- | ------ |
| Headless + styled dual-layer architecture                                 | ✅     |
| UnoCSS + tailwind-variants style system                                   | ✅     |
| TypeScript strict mode throughout                                         | ✅     |
| Sub-path package exports                                                  | ✅     |
| Nuxt module + unplugin resolver                                           | ✅     |
| ConfigProvider (theme / size / dir / iconify / toast)                     | ✅     |
| RTL direction support infrastructure (`useDirection`)                     | ✅     |
| Composable unit tests (12 composables)                                    | ✅     |
| Conventional Commits + automated CHANGELOG                                | ✅     |
| Tag-triggered NPM release pipeline                                        | ✅     |
| Component tests (`Button`/`Input`/`Checkbox`/`Switch`/`Accordion`/`Tabs`) | ✅     |
| axe-core a11y integration (`test/shared/a11y.ts`)                         | ✅     |
| PR CI workflow (`.github/workflows/ci.yml`)                               | ✅     |

---

---

## 中文版

本文档基于与主流 Vue UI 库（shadcn-vue、Radix Vue、PrimeVue、Nuxt UI、Element Plus、Naive UI）对比分析后，追踪 SoybeanUI 的改进计划。

---

## P0 — 工程可靠性

> 影响生产稳定性，应优先于功能扩展解决。

### 测试覆盖

- [x] 新增 `test/specs/components/` — 使用 `@vue/test-utils` 编写组件渲染 + 交互测试
  - [x] 核心原语：`Button`、`Input`、`Checkbox`、`Switch`
  - [x] 展开类：`Accordion`
  - [x] 导航类：`Tabs`
  - [ ] （后续）`Dialog`、`Collapsible`、`NavigationMenu`、`DropdownMenu`、`Form`、`Select`、`RadioGroup`
- [x] 集成 `axe-core`，在 vitest 中运行自动化无障碍测试（`test/shared/a11y.ts`）
- [ ] （长期）添加 Playwright E2E 测试，覆盖关键流程：Dialog 开关、Form 提交、Toast 触发

### CI / CD

- [x] 新增 `ci.yml` — PR 触发：`pnpm typecheck && pnpm lint && pnpm test`
- [ ] （长期）添加 bundle size bot — PR 中评论各组件包大小变化

---

## P1 — 对标主流库的竞争力

### 缺失组件（README 规划中优先级 2）

| 组件           | 主流库覆盖情况                             |
| -------------- | ------------------------------------------ |
| Skeleton       | shadcn-vue、Nuxt UI、PrimeVue              |
| Slider         | 所有主流库均有                             |
| ScrollArea     | Radix Vue、shadcn-vue                      |
| PinInput       | shadcn-vue（InputOTP）                     |
| Menubar        | shadcn-vue、Radix Vue                      |
| Toggle         | shadcn-vue、Radix Vue                      |
| ToggleGroup    | ✅ shadcn-vue、Radix Vue                    |
| Table（UI 层） | headless 已有，`src/components/table` 仍缺 |
| DataTable      | shadcn-vue（集成 TanStack Table）          |
| ColorPicker    | Element Plus、Naive UI                     |

进度追踪：

- [x] Skeleton
- [ ] Slider
- [ ] ScrollArea
- [ ] PinInput
- [ ] Menubar
- [ ] Toggle
- [x] ToggleGroup
- [ ] Table（UI 层 — `src/components/table`）
- [ ] DataTable（集成 TanStack Table）
- [ ] ColorPicker

### 国际化（i18n）

ConfigProvider 已有 `locale` prop，但无任何内置语言包内容。

- [ ] 创建 `headless/src/locale/en.ts` — 组件内部英文字符串（分页文字、Dialog 关闭 aria-label 等）
- [ ] 创建 `headless/src/locale/zh-CN.ts` — 简体中文
- [ ] 通过 ConfigProvider 将 locale 注入所有渲染可见文字的组件
- [ ] 补充 locale API 文档，列出所有 locale key

### 文档完善

- [ ] 新增 `CONTRIBUTING.md` — 开发环境配置、PR 规范、commit 约定、编码规范
- [ ] 组件文档中嵌入 Stackblitz / CodeSandbox 在线 playground
- [ ] 添加 CSS 变量参考页 — 文档化所有 `@soybeanjs/shadcn-theme` design token
- [ ] 添加版本迁移指南页，专项说明 breaking changes

---

## P2 — 生态完整性

### 运动 / 动画系统

当前使用 `@formkit/auto-animate` + `unocss-preset-animations`，组件层面不响应 `prefers-reduced-motion`（仅 docs 通过 vueuse 注册了 hook）。

- [ ] 在 `ConfigProvider` 中添加 `reducedMotion?: boolean` 选项
- [ ] Headless 根元素根据配置或系统偏好绑定 `data-reduced-motion` 属性
- [ ] 编写动画自定义文档 — 如何覆盖 `@keyframes` 以及使用 `data-state` 驱动过渡

### 主题系统深度

- [ ] 添加多套内置主题预设（zinc / slate / stone / rose 等，对齐 shadcn 色板）
- [ ] 补充 `createShadcnTheme` 使用文档，文档中加入实时预览
- [ ] 支持导出 JSON 和 CSS 格式的 design token，便于 Figma 等设计工具对接

### 表单生态

当前已支持 Zod + Valibot 校验，但缺少高级场景。

- [ ] 实现 `FieldArray` — 动态表单项（增加 / 删除）
- [ ] 补充条件字段联动示例 — 根据其他字段值显示/隐藏字段
- [ ] 编写 VeeValidate 官方集成指南
- [ ] 文档化服务端校验错误注入表单字段的方案

---

## P3 — 长期投入

### 优先级 3 组件（复杂度高或依赖第三方）

- [ ] Calendar（集成 v-calendar 或自研）
- [ ] RangeCalendar
- [ ] DatePicker / DateRangePicker
- [ ] DateField / DateRangeField / TimeField / TimePicker
- [ ] Carousel
- [ ] Stepper
- [ ] TagsInput
- [ ] HoverCard
- [ ] Editable
- [ ] Timeline
- [ ] Resizable / Splitter
- [ ] Toolbar
- [ ] BottomSheet

### 优先级 4 组件（专项功能）

- [ ] AutoComplete（支持虚拟滚动）
- [ ] Cascader（支持虚拟滚动）
- [ ] Combobox（支持虚拟滚动）
- [ ] Upload
- [ ] Rating
- [ ] Spinner / LoadingBar
- [ ] Typography
- [ ] QRCode
- [ ] Transfer
- [ ] TreeSelect
- [ ] Watermark
- [ ] Statistic / NumberAnimation
- [ ] Tour
- [ ] Empty / Result
- [ ] Ellipsis

### 视觉测试与工具

- [ ] 接入 Storybook 支持组件独立开发和浏览
- [ ] 添加视觉回归测试（Chromatic 或 Percy）
- [ ] 在文档中添加 Figma Kit 链接 / 参考

---

## 已完成参考

| 方向                                                                | 状态 |
| ------------------------------------------------------------------- | ---- |
| Headless + styled 双层架构                                          | ✅   |
| UnoCSS + tailwind-variants 样式系统                                 | ✅   |
| TypeScript strict 全程应用                                          | ✅   |
| 子路径 package exports                                              | ✅   |
| Nuxt module + unplugin resolver                                     | ✅   |
| ConfigProvider（theme / size / dir / iconify / toast）              | ✅   |
| RTL 方向支持基础设施（`useDirection`）                              | ✅   |
| Composable 单元测试（12 个）                                        | ✅   |
| Conventional Commits + 自动 CHANGELOG                               | ✅   |
| tag 触发 NPM 发布流水线                                             | ✅   |
| 组件测试（`Button`/`Input`/`Checkbox`/`Switch`/`Accordion`/`Tabs`） | ✅   |
| axe-core 无障碍测试集成（`test/shared/a11y.ts`）                    | ✅   |
| PR CI 流水线（`.github/workflows/ci.yml`）                          | ✅   |
