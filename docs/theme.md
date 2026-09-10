# 主题持久化与 FOUC 策略

> 定位：说明 SoybeanUI 主题在 SSG / SSR 下的持久化差异、首帧闪烁（FOUC）成因与主流框架解法，供主题相关改动的方案选型与评审使用。
> 状态：✅ 已实施（SSG 方案 A：CSS 快照 + 首帧注入）；SSR 方案为可选演进方向。
> 基线：2026-09-10 · 分支：v0.40.0

主题引擎 API、存储子路径的权威说明见 [packages/theme/README.md](../packages/theme/README.md)；本文只覆盖「持久化 + 首帧一致性」策略。

## 1. 结论

SSR 与 SSG 的持久化实现差异只有一条主线：**服务端能否知道「当前用户」的主题**。

- **SSR**：每个请求都能读 cookie / session，服务端直接渲染正确主题，天然零闪烁。
- **SSG**：HTML 构建时生成、所有用户共享，服务端永远只能渲染默认主题，首帧必须由客户端脚本补正。

因此 FOUC 只有两条根治路径：服务端渲染正确 CSS（SSR + cookie），或客户端首帧脚本在首次绘制前注入正确 CSS（SSG）。

## 2. 当前实现（SSG，方案 A）

`apps/docs` 是 SSG 站点（[ubean.config.ts](../apps/docs/ubean.config.ts) `mode: 'ssg'`），采用「持久化 CSS 快照 + 首帧注入」：

1. `SConfigProvider` 开启 `persistTheme` 后，客户端从 localStorage 读取主题配置，并用 `createTheme()` 派生 CSS。
2. 派生出的 CSS 通过 `setStoredThemeCss` 写入 `__SOYBEAN_THEME_CSS`（[hooks.ts](../packages/ui/src/components/config-provider/hooks.ts)）。
3. `<head>` 内联脚本 `createThemeInitScript({ injectCss: true })` 在首次绘制前读取该快照，给每条自定义属性加 `!important` 后注入 `<style id="__SOYBEAN_THEME_INIT">`（[ssr.ts](../packages/theme/src/ssr.ts)）。
4. `!important` 用于压过 SSR 渲染的默认主题 `<style id="__SoybeanUI_theme">`——它在 `<body>` 内，文档顺序在后，同优先级会覆盖 `<head>` 的注入。
5. hydration 后 `ThemeStyle` 把响应式 CSS 写入 body 内的 `<style>`，随后移除首帧注入样式，运行时切换不再受 `!important` 影响。

为什么要绕这一圈：我们的主题不是「有限主题集」——`base` / `primary` / `radius` / `size` 会派生出一整份 CSS，无法像 light/dark 那样只切一个 class。

已知边界：

- 升级或清缓存后的**第一次**刷新仍可能闪一次（此时还没有 CSS 快照），mount 时会补写。
- 首帧脚本依赖 localStorage；隐私模式 / 禁用存储时退化为默认主题。
- 严格 CSP 下内联脚本与样式需要 nonce 或 `unsafe-inline`。

## 3. SSR 与 SSG 对照

| 维度                      | SSR 模式                                                          | SSG（当前 docs）                                           |
| :------------------------ | :---------------------------------------------------------------- | :--------------------------------------------------------- |
| 每个请求的 HTML           | 可按 cookie / session 定制                                        | 构建时固定，所有用户共享                                   |
| 服务端能否知道用户主题    | 能（需把主题写进 cookie 并作为 `themeConfig` 传入）               | 不能                                                       |
| 首帧主题 CSS              | 服务端 `createTheme(themeConfig)` 直接渲染正确 token → **零闪烁** | 只能渲染默认主题                                           |
| 暗色 class                | 可由服务端写入 `htmlAttrs`                                        | 只能靠内联脚本切                                           |
| preset 解析               | `presetProvider` 服务端解析                                       | 无服务端，客户端读 localStorage                            |
| 消除派生 token 闪烁的手段 | `themeConfig`（首选），内联脚本可选                               | `injectCss` + `!important`（必须）                         |
| 存储                      | cookie（服务端可见）+ 可选 localStorage                           | 仅 localStorage                                            |
| hydration 一致性          | 服务端 / 客户端同源（cookie）→ 天然一致                           | 服务端默认 vs 客户端持久化 → 需 `onMounted` 修正 innerHTML |
| 应用侧成本                | 需自己读写 cookie、SSR 传参                                       | 零服务端改动，库内部完成                                   |

实现要点（基于源码）：

- `themeConfig` 在客户端也优先于 localStorage（[use-theme.ts](../packages/ui/src/components/config-provider/use-theme.ts)）。SSR 场景应由 cookie 作为权威，两端传同一份值，否则会出现 hydration 不一致。
- 服务端 preset 解析依赖 `presetProvider`，因为服务端没有 localStorage。
- 当前主题**只持久化在 localStorage，没有 cookie 工具**；`packages/theme/README.md` 中「cookie 解析 / `createThemeStore`」的描述已过时。

## 4. 主流框架的 FOUC 方案

可归为 5 类，前 3 类为主流。

### 方案 1：预生成多套 CSS + 首帧改属性（class / data-theme）

所有主题变体的 CSS 都在静态样式表里，`<head>` 放一个**同步阻塞脚本**，在首次绘制前读取 localStorage，把 `class="dark"` / `data-theme` 写到 `<html>`。

- **next-themes**：`ThemeProvider` 自动往 `<head>` 注入脚本，在 React hydrate 前改 `<html>` 属性；`useTheme()` 首帧返回 `undefined` 以避免 hydration mismatch，`<html>` 需要 `suppressHydrationWarning`。
- **Mantine**：`<ColorSchemeScript />` 放 `<head>`，读 localStorage 写 `data-mantine-color-scheme`；因此 SSR 时**不能**用 `colorScheme` 值渲染 UI，否则不一致。
- **MUI**：`<InitColorSchemeScript />` 放在 `<body>` 首个位置（或 head），读 localStorage + 系统偏好写 `data-mui-color-scheme`。
- **VitePress / Docusaurus / Astro / Tailwind 生态**：同思路，脚本切 `.dark`，两套 CSS 静态生成。

前提：**主题是有限集合（light / dark / …），不需要重新计算 CSS**。这正是我们不适用的地方。

### 方案 2：SSR 按 cookie 渲染（真正零闪烁）

服务端能读 cookie，直接把正确的 class / 属性甚至 CSS 渲染进 HTML，连脚本都不需要。

- **@nuxtjs/color-mode**：SSR 模式用 cookie（`nuxt-color-mode`）在服务端决定 `htmlAttrs`；因为服务端没有 `matchMedia`，`system` 偏好还需要再写一个「已解析值」的 cookie 桥接。
- **Nuxt 官方建议**：用 `useCookie` 而不是 `localStorage`，避免 hydration mismatch。
- **Mantine / MUI / Radix / next-themes 的 cookie 变体**（hybrid cookie + localStorage）均属此类。

### 方案 3：服务端提取并内联「动态生成的 CSS」

适用于 CSS-in-JS / 动态主题：服务端把实际用到的 CSS 收集并内联进 HTML，客户端 hydration 复用。

- **emotion** `CacheProvider` + `extractCritical`、**styled-components** `ServerStyleSheet`、**MUI / antd** 的 cssinjs 提取。
- **本文方案 A 是它的 SSG 简化版**：服务端渲染不出用户的 CSS，就把「上次生成好的 CSS 快照」存到 localStorage，用阻塞脚本带 `!important` 注入，hydration 后再交给响应式 `<style>`。

### 方案 4：首帧隐藏内容直到主题就绪

`visibility: hidden` / 遮罩，把「颜色闪烁」换成「空白闪烁」，体验更差，仅在不便改架构时使用。

### 方案 5：弱化闪烁

默认主题跟随 `prefers-color-scheme`，让默认与用户偏好尽量一致，降低闪烁的对比度；不根治。

## 5. 选型建议

- **保持 SSG**：方案 A 已与主流一致，不需要再改。
- **若切 SSR**：应用侧写 / 读 cookie → 传 `themeConfig`（+ `presetProvider`）→ 服务端直接渲染正确 CSS，可完全去掉 `injectCss` 与 `!important`。代价是引入 Node 运行时、自行维护 cookie ↔ localStorage 一致性、跨标签页同步，并注意 §3 的 `themeConfig` 优先级问题。
- **可选补强**：给首帧脚本补 `nonce` 支持（严格 CSP）；修正 [packages/theme/README.md](../packages/theme/README.md) 中过时的 cookie / `createThemeStore` 描述；把「升级后首次刷新可能闪一次」写入对外文档。

## 6. 参考资料

- [next-themes README（inline head script / no flash）](https://github.com/coffee-cup/next-themes)
- [Fix: next-themes Not Working — FOUC 与 hydration](https://fixdevs.com/blog/next-themes-not-working/)
- [Frontend Dark Mode Without Flash — 方案分类](https://paulyu.me/articles/1110)
- [Nuxt Hydration 最佳实践（useCookie 替代 localStorage）](https://nuxt.com/docs/4.x/guide/best-practices/hydration)
- [@nuxtjs/color-mode SSR 偏好 cookie 桥接](https://gist.github.com/tommie/819457f75a950dfb975e4694524a91ba)
- [Mantine color schemes（ColorSchemeScript / SSR 注意事项）](https://github.com/mantinedev/mantine/blob/master/apps/mantine.dev/src/pages/theming/color-schemes.mdx)
- [Mantine ColorSchemeScript 防闪烁说明](https://claudify.tech/blog/claude-code-mantine)
- [MUI InitColorSchemeScript](https://mui.com/material-ui/react-init-color-scheme-script.md)
- [MUI CSS theme variables（构建时生成两套变量）](https://mui.com/system/experimental-api/css-theme-variables/)
