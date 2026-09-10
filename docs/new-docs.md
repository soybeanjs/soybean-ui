# 新版文档站改造方案（apps/docs → apps/docs-new，基于 ubean）

> 生成日期：2026-09-07
> 修订：v2 —— ① pages 增设 `headless/`（新分组）、`(ui)/`（路由分组：components、overview、about、index 归入，URL 不变）、`sbean/` 三个目录；② 内容目录镜像同样的分组（ui 系内容归 `ui/`，新增 `headless/`、`sbean/`）；③ playground 示例代码迁入 docs-new `src/examples/`（apps/playground 后续删除）。
> 范围：将 `apps/docs`（Vite + vite-ssg + unplugin-vue-markdown + markdown-exit）的全部能力迁移到 `apps/docs-new`（ubean ^0.4.1），最终替换旧站；同时把 `apps/docs/src/examples` 的 demo 源码收编为 docs-new 自有资产。

---

## 1. 背景与目标

- **旧站**：`apps/docs`，技术栈为 `vite-ssg` + `unplugin-vue-router` + `vite-plugin-vue-meta-layouts` + `unplugin-vue-markdown` + `markdown-exit`，功能完整（134 篇英文 + 140 篇中文文档、组件 API 表、Playground demo、Cmd+K 搜索、双语、主题、changelog、llms.txt、sitemap）。
- **新站**：`apps/docs-new`，已用 ubean 搭好最小骨架（`mode: 'ssg'` + i18n en/zh + UnoCSS + SConfigProvider），但除 locales 文案外无任何实质内容。
- **目标**：以 ubean 官方文档站（`/Users/soybean/Web/Projects/SoybeanJS/ubean/apps/docs`，下称 "ubean docs 参考实现"）为最佳实践，把旧站全部能力迁移到 docs-new，并借机消除旧站的技术债（如 `pages1`/`layouts1` 死目录、手写 modules 体系）。
- **v2 追加目标**（本次修订）：
  1. `src/pages/` 按产品线重组为三个顶层分组：`headless/`（headless 组件文档，新分组）、`(ui)/`（路由分组，收纳现有全部 ui 系页面：overview、components、ui-x、admin、chart、releases）、`sbean/`（sbean CLI 文档）。分组路由段 `(ui)` 不出现在 URL 中，既有路径 `/components/*` 等保持不变。
  2. 内容目录镜像同样的分组：`src/content/{en,zh}/` 下分 `ui/`、`headless/`、`sbean/` 三个顶层文件夹，ui 系内容全部归入 `ui/`。
  3. `apps/docs/src/examples` 的 demo 源码迁入 `apps/docs-new/src/examples/`，切断 docs → playground 跨 app 依赖；`apps/playground` 应用在新站切换后整体删除。

---

## 2. 调研结论

### 2.1 ubean（0.4.1）能力清单

ubean 是构建在 Vite-Plus 上的 Vue-first 全栈 meta-framework，主包 `ubean` 聚合 `@ubean/*` 子包，导出子路径：`.`、`./vite`、`./client`、`./ssr`、`./server`、`./build`、`./i18n`、`./scaffold`。对文档站相关的关键能力：

| 能力          | API / 配置                                                                                                   | 说明                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 应用模式      | `ubean.config.ts → mode: 'ssg'`                                                                              | SSG 构建时预渲染，产物纯静态；强制走 SSR 渲染                                                                                                                                                                                              |
| 文件路由      | `src/pages/` + `definePage({ layout })`                                                                      | 生成 `.ubean/typed-router.d.ts`、`pages.d.ts`；catch-all 用 `[...slug].vue`                                                                                                                                                                |
| 分组路由      | `(group)/` 目录段，URL 中剥离                                                                                | **已验证 0.4.1 支持**：`@ubean/vue/dist/vite.js` 内含 `ROUTE_GROUP_REGEX = /\(([^(/\\]+)\)[/\\]/g` + `stripRouteGroups`（源码 `ubean/packages/vue/src/route-path.ts:21-40`）。`(ui)/components/[name].vue` → `/components/:name`，路径不变 |
| 布局          | `src/layouts/*.vue` + `<PageView />`                                                                         | `definePage({ layout: 'default' })` 声明                                                                                                                                                                                                   |
| Markdown      | `markdown: { enabled, theme: { light, dark }, wrapperClass, components: { autoImport }, mdx, markdownExit }` | 内置 unplugin-vue-markdown 管线；shiki 双主题；`.md` 编译为 Vue 组件；`components.autoImport: true` 允许 md 中直接使用全局组件（旧站 `<UsageCode>` 等依赖此能力）                                                                          |
| 内容集合      | `content: true \| UbeanContentOptions`（`@ubean/content`）                                                   | `createQueryBuilder`（where/sort/limit/skip）、`buildNavigation`（按目录自动生成侧边栏树）、`parseContent`（frontmatter + excerpt）。**注意：`@ubean/content` 不在主包 dependencies 中，需单独安装（npm 已发布 0.4.1）**                   |
| i18n          | `i18n: { defaultLocale, locales, strategy, detectBrowserLanguage }`                                          | vue-i18n 11 内置；策略支持 `prefix` / `prefix_and_default` / `prefix_except_default` / `no_prefix`；自动导入 `useLocalePath` / `useSwitchLocalePath`；生成 `.ubean/i18n.d.ts` 类型                                                         |
| 预渲染        | `prerender: { all, include, crawlLinks, failOnError }`                                                       | catch-all 属动态路由，`all: true` 会跳过，**必须显式 `include` 每个内容 slug**（ubean docs 用 `collectContentRoutes()` 遍历 content 目录生成）                                                                                             |
| 色彩模式      | `colorMode: { preference, classSuffix, storageKey, cookieName, fallback }`                                   | 内置 no-flash 脚本 + `useColorMode()`；ubean docs 用 `classSuffix: ''` 对齐 shadcn 裸 `.dark` class                                                                                                                                        |
| 自动导入      | `autoImports: { dirs: [...] }`                                                                               | 组合式函数自动导入（`.ubean/auto-imports.d.ts` 已验证生效）                                                                                                                                                                                |
| 组件自动注册  | `components: { dirs, resolvers, ... }`                                                                       | unplugin-vue-components 透传，**支持自定义 `resolvers`**（可传 `UiResolver()`），并与框架内置 resolver 合并                                                                                                                                |
| SEO           | `@ubean/seo`（unhead）+ `useHead()`                                                                          | robots/sitemap 相关路径出现在 `DEFAULT_PRERENDER_EXCLUDE` 中，表明 seo 模块参与 `/sitemap.xml`、`/robots.txt` 生成（迁移时需实测确认）                                                                                                     |
| Islands       | `@ubean/islands`（`v-client` 指令）                                                                          | 部分水合边界，SSG 页面可减小 JS 体积（可选优化，非首版必需）                                                                                                                                                                               |
| Head 管理     | `defineApp({ head })` + `useHead()`                                                                          | 全局 meta + 页面级响应式 head                                                                                                                                                                                                              |
| Vite 插件共存 | `vite.config.ts` 中 `ubeanPlugin()` 之外可加任意 Vite 插件                                                   | 旧站 `soybeanDocsLlmsPlugin` 等自定义插件可直接保留                                                                                                                                                                                        |
| CLI           | `ubean dev / build / preview`                                                                                | 已在 docs-new scripts 中配置                                                                                                                                                                                                               |

**框架限制/风险**：ubean 自身标注 WIP（v0.x，API 可能破坏性变更）；`@ubean/content` 需独立安装；发布版 0.4.1 与本地 ubean 仓库源码可能有行为差异，一切以 `node_modules` 中 0.4.1 的类型定义为准。

### 2.2 ubean docs 参考实现（`/Users/soybean/Web/Projects/SoybeanJS/ubean/apps/docs`）

结构与关键做法（迁移时直接对照）：

- `ubean.config.ts`：`mode: 'ssg'`、`ui: { css: false }`（UnoCSS 模式不注入 styles.css）、i18n `prefix_except_default`（en 无前缀、zh 前缀 `/zh`）、`markdown: { enabled, theme: { light: 'one-light', dark: 'one-dark-pro' }, wrapperClass: 'markdown-wrapper' }`、`colorMode`、`prerender: { all: false, include: ['/', '/zh', ...collectContentRoutes()], crawlLinks: true, failOnError: false }`、`autoImports.dirs`、`components.dirs`。
- `collectContentRoutes()`：遍历 `src/content/{en,zh}/**/*.md` 生成具体预渲染路由（`index.md` → 根路径，zh 加 `/zh` 前缀）。
- `src/pages/[...slug].vue`：catch-all 解析内容——按路径前缀检测 locale；双 `import.meta.glob`（eager 的 `.md`→Vue 组件 + `?raw` 的 `.md`→原文）；`parseFrontmatter` / `extractHeadings` 提取标题与大纲；`translated-stub` frontmatter 触发英文回退 + 提示条；`useHead(computed(...))` 设置 title/description；未命中渲染内联 404。
- `src/components/doc-md.vue`：渲染动态 markdown 组件的 article 卡片外壳（`.markdown-wrapper` 由 wrapperClass 注入）。
- 组件清单：`api-table`、`app-header`、`app-logo`、`background-decoration`、`code-block`、`copy-button`、`doc-md`、`header-nav`、`search-document`、`sider-menu`、`tool-bar`。
- `constants/menus.ts`：手写 `menuSections`（分组 + 双语 label）驱动侧边栏。
- `pages/zh.reuse.ts`：zh 路由复用技巧（避免复制页面）。

### 2.3 旧站（apps/docs）资产盘点

| 资产      | 位置                                         | 规模/说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 文档内容  | `src/docs/en/`、`src/docs/zh-CN/`            | 134 / 140 个 `.md`：overview 根级（introduction、quick-start、theming、llms、skills、sbean、installation）+ `ui/components/`（约 94 篇）+ `ui-x/components/`、`admin/components/`、`chart/components/` 及各包 installation/quick-start                                                                                                                                                                                                                                                                                        |
| 页面壳    | `src/pages/`                                 | `index.vue`（着陆页，hero + stats + features）、`overview/*`（7 个 vue 壳，内部 `<DocMd path>`）、`components/[name].vue`（组件详情页：hero 头 + DocMd + changelog 区）、`components/index.vue`（目录页）、`ui-x/*`、`admin/*`、`chart/*`、`releases.vue`（版本 changelog，带组件过滤）、`sbean.vue`、`about.md`、`[...all].vue`（404）                                                                                                                                                                                       |
| 布局      | `src/layouts/`                               | `default.vue`（AppHeader + 固定 SiderMenu + 移动端 SDrawer + 右侧 SAnchor 大纲 + 按路由前缀控制显隐）、`home.vue`、`blank.vue`、`404.vue`                                                                                                                                                                                                                                                                                                                                                                                     |
| 组件      | `src/components/`（18 个 + `tables/` 10 个） | `doc-md.vue`（按 locale 动态 glob 加载 md + DOM 扫描生成大纲）、`usage-code.vue`、`playground-gallery.vue`（preview/code tab）、`component-api.vue` + `tables/`（generated-api 类型表体系：type-table/type-reference/callable-type-table/union-type 等）、`component-changelog.vue`、`search-document.vue`（SCommand + Cmd+K，无外部搜索库）、`sider-menu.vue`、`app-header/header-nav/tool-bar/top-bar`、`locale-toggler`、`theme-schema-toggler`（`useTheme`）、`tailwind-palette`、`code-block`、`copy-button`、`app-logo` |
| 组合式    | `src/composables/`                           | `use-doc-outline.ts`（模块级共享大纲 state）、`use-generated-i18n.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 常量      | `src/constants/`                             | `globs.ts`（`import.meta.glob` eager 加载 `../../playground/src/examples/**/*.vue` + `?raw` 源码，按 `NN-name.vue` 排序）、`menus.ts`（menuData 分组：general/groupLayout/navigation/forms/dataDisplay/feedback/overlay/utilities + ui-x-core 等）                                                                                                                                                                                                                                                                            |
| 模块      | `src/modules/`                               | `i18n.ts`（懒加载 `locales/*.json` + `generated/api-locales` + `generated/changelog-locales` 合并）、`markdown.ts`（markdown-it fence 覆写，注入 `<CopyButton code-base64>`）、`pinia.ts`、`progress.ts`                                                                                                                                                                                                                                                                                                                      |
| 生成数据  | `src/generated/`                             | `api/`、`api-locales/`、`changelog/`、`changelog-locales/`（由 `pnpm sui gen api` / `sui gen changelog` 产出，输出路径硬编码指向 apps/docs）                                                                                                                                                                                                                                                                                                                                                                                  |
| 共享工具  | `src/shared/`                                | `encode.ts`（base64）、`generated-changelog.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 动效      | `src/motion/`                                | `background-decoration.vue`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 构建插件  | `build/llms.ts`                              | `soybeanDocsLlmsPlugin`——dev 中间件 + build 产物生成 llms.txt                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 样式      | `src/styles/`                                | `global.css`、`markdown.css`（`.markdown-wrapper` prose 样式）等                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 文案      | `apps/docs/locales/en.json`、`zh-CN.json`    | 站点 UI 文案 + `playground.examples.{component}.{file}` demo 标题（约 1150 行，**docs-new 已原样复制**）                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Vite 配置 | `vite.config.ts`                             | VueRouter（`.vue`+`.md` 扩展名）、MetaLayouts、Markdown（shiki markdown-exit 双主题 + wrapperClasses + headEnabled + customMarkdownPlugin）、AutoImport、Components（`UiResolver()`）、ssgOptions（sync script、minify、beasties、主题 init 脚本注入、sitemap）、`@playground` alias（tsconfig paths）                                                                                                                                                                                                                        |

**旧站遗留问题**：`src/pages1/`、`src/layouts1/` 为空壳死目录（迁移时丢弃）；`src/docs/en` 与 `zh-CN` 数量不一致（134 vs 140，存在未翻译差异，迁移时以 en 为权威逐篇核对）。

### 2.4 docs-new 现状

已具备：

- `package.json`：依赖 `ubean ^0.4.1`、`@soybeanjs/ui`、`@soybeanjs/theme`、`vue`；scripts `dev/build/preview`（build 前跑 `build:registry` → `public/r`）。
- `ubean.config.ts`：`mode: 'ssg'`、favicon、i18n（`en` + `zh`，`prefix_except_default`）。
- `vite.config.ts`：`ubeanPlugin()` + `UnoCSS()`；`optimizeDeps.exclude: ['@soybeanjs/ui', '@soybeanjs/headless']`（防双实例 context Symbol）。
- `uno.config.ts`：`presetSoybean()` + `presetUiUnocss({ resetCSS, globalCSS, uiCSS })` + `docs-card`/`docs-subtle-card` shortcuts。
- `src/app.ts`：`defineApp`——head meta、`createThemeInitScript()` 内联脚本、router progress。
- `src/app.vue`：`SConfigProvider` 包 slot。
- `src/locales/en.json`、`zh-CN.json`：与旧站文案一致（已 diff 验证顶层键无差异）。
- `.ubean/`：typed-router、auto-imports（`defineApp`/`definePage`/`useLocalePath`/`useColorMode` 等）、i18n 类型、components.d.ts 均已生成，证明文件路由/自动导入/i18n 管线工作正常。
- 已提交 git（`65f67d4ed refactor(docs-new): use app.vue add AppRoot`）。

缺失/问题：

1. **包名冲突（阻塞）**：docs-new 与旧站 `name` 均为 `@soybeanjs/ui-docs`，根 scripts `pnpm --filter @soybeanjs/ui-docs dev` 存在歧义。
2. 页面/布局为占位符（`index.vue` 仅 `<div>Ubean</div>`，layout 仅文字 + `PageView`）。
3. 未配置 `markdown`、`prerender`、`colorMode`、`autoImports`、`components`（含 `UiResolver`）。
4. 依赖缺失：`@soybeanjs/headless`（shared 工具）、`@soybeanjs/ui-x`、`@soybeanjs/admin`、`@soybeanjs/chart`（视页面需要）、`shiki`、`@vueuse/core`（搜索 Cmd+K）、`@fontsource-variable/manrope`、`@ubean/content`（可选）。
5. `tsconfig.json` 缺 `@soybeanjs/ui-x`、`@soybeanjs/theme/*` 等 paths（`@playground/*` 在 v2 方案下不再需要，示例迁为本地资产，见 D7）。
6. locale 代码不一致：i18n 配置用 `zh`，但文案文件名是 `zh-CN.json`，内容目录旧站为 `zh-CN`——需统一。
7. `uno.config.ts` 的 `pipeline.include` 仅 `/\.vue($|\?)/`，`.md` 编译产物与 playground 示例（位于 apps/playground）的类名扫描范围需验证。
8. `public/` 为空（registry `public/r` 由 build:registry 生成，无问题；但 favicon/og 图等静态资源未迁移）。

### 2.5 apps/playground 资产盘点（迁移对象，后续删除）

| 资产              | 位置                                                                                                     | 说明                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 组件示例          | `src/examples/{ui,ui-x,admin,chart}/<component>/NN-name.vue`                                             | 464 个编号示例（ui 405 / ui-x 44 / chart 15 / admin 0，95 个 ui 组件目录）；另有 118 个 `index.vue` 仅被 playground 自身首页 glob 使用，docs 的 `globs.ts` 通过 `isIgnoredPlaygroundExample` 忽略                                       |
| 示例逃逸依赖      | —                                                                                                        | NN 示例文件对外仅有两类逃逸引用：`../../../constants/theme`（20 处，主题 size/color 常量）与 `../../../components/playground-gallery.vue`（117 处，**全部位于 index.vue 中**，NN 文件不引用）。其余全部 import `@soybeanjs/*` 或 npm 包 |
| 示例外部 npm 依赖 | `package.json`                                                                                           | docs-new 需补：`zod`、`valibot`、`@tanstack/charts`、`@unovis/vue`、`@unovis/ts`（`@internationalized/date` 为 headless 依赖、shamefullyHoist 下可解析，建议仍显式声明）                                                                |
| 共享工具          | `src/shared/index.ts`                                                                                    | `transformRecordToOption` 等小工具（constants/theme 依赖）                                                                                                                                                                              |
| 组件              | `src/components/theme-configurator.vue`                                                                  | 旧站 tool-bar 跨 app 引用（`@playground/components/theme-configurator.vue`），依赖 `@vueuse/core` + `SThemeCustomizer`——迁移后 docs-new 本地化，Q2 关闭                                                                                 |
| playground 自身   | `src/pages`、`src/router`、`src/i18n`、`src/app.ts`、`src/theme.ts`、`plugins`、`component-libraries.ts` | 独立 Vite 应用壳，**不迁移**，随 app 删除                                                                                                                                                                                               |

**playground 在仓库中的引用面**（删除前置项）：根 scripts `dev`（默认即 `dev:playground`）、`dev:playground`、`build:playground`；`apps/docs`（旧站 globs/alias/tool-bar，随旧站删除自然消失）；`.agents/skills/soybean-ui-develop/` 的 SKILL.md / surfaces.md / e2e.md / audit.md 将 playground 作为交付面与视觉验证载体——删除时需同步改写这些 skill 文档（demo 交付面改为 docs-new `src/examples`）。`@soybeanjs/ui-playground` 不在发布包之列（private app），无 npm 影响。

---

## 3. 差距分析与机制映射（旧 → 新）

| #   | 旧站机制                                                                             | 新站方案                                                                                                                                                                                                                                                                      | 说明                                                                                                                           |
| --- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| M1  | vite-ssg 预渲染 + `ssgOptions`                                                       | ubean `mode: 'ssg'` + `prerender: { all: false, include: [...], crawlLinks: true }`                                                                                                                                                                                           | include 列表用 `collectContentRoutes()` 风格函数遍历 `src/content` 生成（对照 ubean docs `ubean.config.ts:19-53`）             |
| M2  | `unplugin-vue-router`（`.vue`+`.md` 路由）+ `vite-plugin-vue-meta-layouts`           | ubean 文件路由 + `definePage({ layout })` + `<PageView />`                                                                                                                                                                                                                    | `.md` 不再直接作路由；保留旧站「vue 壳页面 + DocMd 动态加载」模式（见 D1 决策）                                                |
| M3  | `Markdown({ wrapperClasses: 'markdown-wrapper', headEnabled, shiki markdown-exit })` | `markdown: { enabled: true, wrapperClass: 'markdown-wrapper', theme: { light: 'one-light', dark: 'one-dark-pro' }, components: { autoImport: true } }`                                                                                                                        | `components.autoImport: true` 是 `<UsageCode>`/`<PlaygroundGallery>`/`<ComponentApi>` 在 md 中可用的前提，迁移后必须实测       |
| M4  | `customMarkdownPlugin`（fence 注入 CopyButton）                                      | `markdown.markdownExit: Record<string, unknown>` 透传位 + 实测；若不满足则改用「渲染后 DOM 注入」或 postprocess 钩子                                                                                                                                                          | 旧实现依赖 markdown-it renderer 覆写；ubean markdown 配置仅暴露 `markdownExit` 选项对象，自定义插件注入路径需先验证（风险 R3） |
| M5  | `AutoImport` + `Components({ resolvers: [UiResolver()] })`                           | `autoImports: { dirs: ['src/composables'] }` + `components: { dirs: ['src/components'], resolvers: [UiResolver()] }`                                                                                                                                                          | `ComponentsOptions` 继承 unplugin-vue-components 全量 options，resolvers 与内置合并（已从 0.4.1 类型确认）                     |
| M6  | `modules/i18n.ts` 手写懒加载 + 三源合并                                              | ubean 内置 i18n（`src/locales/*.json` 自动注册 + 类型生成）；generated api/changelog locales 通过 `defineApp` 或 app.ts 中 `mergeLocaleMessage` 注入                                                                                                                          | 保留「按需加载 generated locale」优化；`use-generated-i18n.ts` 可原样移植                                                      |
| M7  | `useI18n().locale` 切换（同路由换文案）                                              | ubean locale 路由（`/zh/*` 前缀）+ `useSwitchLocalePath`                                                                                                                                                                                                                      | **行为变化**：语言切换从「原地切换」变为「跳转前缀路径」；内容按 locale 目录加载逻辑与 ubean docs `[...slug].vue` 一致         |
| M8  | `main.ts` 的 `createThemeInitScript` 注入                                            | 已在 `src/app.ts` head.script 中完成                                                                                                                                                                                                                                          | 无需改动；ubean colorMode 的 storageKey/classSuffix 与 `@soybeanjs/theme` 的 key 对齐需验证（风险 R5）                         |
| M9  | `generateSitemap()`（vite-ssg-sitemap）                                              | 优先用 `@ubean/seo` 内置 sitemap/robots；不满足则写 `prerender` 完成后钩子或 build 后 Node 脚本                                                                                                                                                                               | 需实测 0.4.1 seo 模块产物（风险 R6）                                                                                           |
| M10 | `soybeanDocsLlmsPlugin`（build/llms.ts）                                             | 原样保留为 Vite 插件，加入 `vite.config.ts` plugins 数组                                                                                                                                                                                                                      | 插件内路径引用（docs 内容目录、generated api）需随新目录调整                                                                   |
| M11 | playground 集成（`@playground` alias + `constants/globs.ts` 跨 app glob）            | **改为本地资产**：示例迁入 `src/examples/`，glob base 改 `../examples`，删除 `@playground` alias 与 tsconfig path                                                                                                                                                             | 切断跨 app 依赖，playground 可整体删除（见 D7）                                                                                |
| M12 | `src/generated/*`（sui gen 输出到 apps/docs）                                        | 过渡期 docs-new 直接 `import` 旧站生成目录不可取；方案：将 `sui gen api/changelog` 输出路径参数化，新增指向 `apps/docs-new/src/generated` 的目标（见 D4）                                                                                                                     | 涉及 `packages/scripts` 的 gen 命令改动                                                                                        |
| M13 | 搜索（SCommand 内存索引）                                                            | `search-document.vue` 原样移植（依赖 `@soybeanjs/ui` SCommand/SDialog + `@vueuse/core` useMagicKeys + menus 数据）                                                                                                                                                            | 无外部搜索服务，零迁移成本                                                                                                     |
| M14 | 404（`[...all].vue`）                                                                | `pages/[...all].vue` 或 `pages/404.vue`（对照 ubean docs）                                                                                                                                                                                                                    | ubean 文件路由语法兼容                                                                                                         |
| M15 | `about.md` 直接成路由                                                                | 改为 `src/content/{en,zh}/ui/about.md` + 壳页面 `pages/(ui)/about.vue` 渲染                                                                                                                                                                                                   | 与 D1/D8 一致                                                                                                                  |
| M16 | 单层 `pages/components/[name].vue` 等扁平结构                                        | ubean 分组路由 `(ui)/`：仅 `components/`、`overview/`、`about.vue`、`index.vue` 归入 `pages/(ui)/`（URL 剥离 `(ui)` 段，保持 `/`、`/about`、`/overview/*`、`/components/*`）；`ui-x/`、`admin/`、`chart/`、`releases.vue` 保持 pages 根级；新增顶层分组 `headless/`、`sbean/` | 0.4.1 已支持（见 2.1 分组路由行）；`stripRouteGroups` 仅剥离 `(xxx)/` 段，不影响 `[name]`、`[...slug]`                         |
| M17 | 内容目录 `src/docs/en/{根级 overview md, ui, ui-x, admin, chart}`                    | 重排为 `src/content/{en,zh}/{ui,headless,sbean,ui-x,admin,chart}/`：根级 overview md（introduction/quick-start/theming/llms/skills/installation）+ 旧 `ui/components/` 合并入 `ui/`；`sbean.md` 入 `sbean/`；`headless/` 新建空；`ui-x/`、`admin/`、`chart/` 保持             | DocMd 的 `path` prop 语义随之变化（见 D8）                                                                                     |

---

## 4. 关键设计决策

### D1：内容路由模型 —— 保留「壳页面 + DocMd」，不照搬 catch-all

旧站组件详情页 `/components/[name]` 有富 hero 头（分组、导入名、快速跳转、相关组件、changelog 区），overview 各页也有独立头部，这些是 `DocMd` 壳无法用单一 `[...slug].vue` 表达的。因此：

- 保留「壳页面 + DocMd」模式，壳页面按 D8 的分组目录组织（`pages/(ui)/…`、`pages/headless/`、`pages/sbean/`）。
- 内容 md 从 `src/docs/{en,zh-CN}/` 迁到 `src/content/{en,zh}/`（对齐 ubean docs 约定），`doc-md.vue` 的 glob base 相应调整，按 locale（路径前缀检测，替代 `useI18n().locale`，见 M7）解析 `../content/{locale}/{path}.md`。
- 仅无壳路由（如 `about`）走 ubean docs 式 catch-all 或直接省略。

### D2：locale 代码统一为 `zh`

i18n 配置已是 `code: 'zh'`。统一：文案文件 `zh-CN.json` → `zh.json`、内容目录 `zh-CN/` → `zh/`、`sui gen --locale` 调用处保持 `zh-CN` 映射到内部 `zh`（generated locale 文件名在合并层做一次别名映射即可）。URL 前缀 `/zh/*` 与旧站（旧站无 URL 前缀、原地切换）不同，属预期 SEO 改进。

### D3：包名与 scripts

- docs-new 包名改为 `@soybeanjs/ui-docs-new`（过渡期），避免 filter 歧义；旧站删除后改回 `@soybeanjs/ui-docs`。
- 根 `package.json` 新增 `dev:docs:new` / `build:docs:new`（`pnpm --filter ./apps/docs-new dev` 路径式 filter 亦可），旧 `dev:docs` / `build:docs` 暂不动。

### D4：generated 数据产出路径

`pnpm sui gen api` / `sui gen changelog` 现硬编码输出到 `apps/docs/src/generated/`。改造 `packages/scripts` 的 gen 命令支持多目标（或读取配置），迁移期同时写旧站与 docs-new 两处，切换后只写 docs-new。api-locales/changelog-locales 的 `--translate` 流程同步适配。

### D5：是否启用 @ubean/content

首版**不启用**内容集合（侧边栏沿用 `constants/menus.ts` 手写分组——组件分组语义无法从文件树推导）。`buildNavigation` 留作后续优化项。

### D6：Islands / 部分水合

首版不引入 `v-client`；SSG 全量水合与旧站行为一致。若构建后 JS 体积明显劣化再评估（优化项 O2）。

### D7：demo 源码归属 docs-new，playground 应用删除

`import.meta.glob` 的 key 是相对路径，把示例目录整体搬到 docs-new 内部（`src/examples/`）即可零改动复用 `globs.ts` 的解析逻辑（正则 `\.\/(?:[^/]+\/)?([^/]+)\/([^/]+)\.vue$` 天然支持 `ui/button/01-basic.vue` 这种两级 key，componentName 取 `button`）。

迁移范围（对照 2.5 盘点）：

- **迁入**：`src/examples/{ui,ui-x,chart}/<component>/NN-*.vue`（464 个；admin 无编号示例，整目录跳过）。
- **丢弃**：118 个 `index.vue`（仅 playground 首页 glob 消费，docs `globs.ts` 本就忽略）。
- **随迁**：`constants/theme.ts`（20 处 NN 示例引用）→ `src/constants/theme.ts`；`shared/index.ts`（`transformRecordToOption`）→ 合并进 docs-new 的 `src/shared/`；`components/theme-configurator.vue` → `src/components/theme-configurator.vue`（旧站 tool-bar 的 `@playground/...` 跨 app 引用改本地，Q2 关闭）。
- **不迁**：playground 的 `pages/`、`router/`、`i18n/`、`app.ts`、`theme.ts`、`plugins/`、`component-libraries.ts`、`playground-gallery.vue`（docs 已有自己的同名组件）。
- **依赖补齐**：docs-new 增加 `zod`、`valibot`、`@tanstack/charts`、`@unovis/vue`、`@unovis/ts`、`@internationalized/date`（版本对齐 playground package.json）。
- **命名冲突**：docs-new 的 `src/components/playground-gallery.vue` 与被丢弃的 playground 同名组件无关，保留 docs 版本即可；`src/examples/` 与 docs-new 现有目录无冲突。

删除时机：playground app 在 T6.5 删除（前置：docs-new 完成切换 + 旧站删除，确保无回退需求）。删除动作包括：`apps/playground/` 目录、根 scripts 的 `dev`（改为 `dev:docs:new`）、`dev:playground`、`build:playground`、`ci.yml` 相关 job（如有）、`.agents/skills/soybean-ui-develop/` 四文档中 playground 交付面改写为 docs-new `src/examples`、`docs/architecture.md` 的 app 清单（14 child workspaces → 13）。

### D8：目录分组与 DocMd path 约定

pages 与 content 采用一致的顶层分组心智，但**只有 ui 主站使用路由分组 `(ui)`**（因为首页 `index.vue` 与 `about.vue` 也属于 ui 产品线，需要共享无 URL 前缀的根路径）：

```
src/pages/
├── (ui)/            # URL: /, /about, /overview/*, /components/*
│   ├── index.vue
│   ├── about.vue
│   ├── overview/
│   └── components/
├── headless/        # 新建空分组（骨架：index.vue 占位 + definePage）
├── sbean/           # sbean.vue → sbean/index.vue（URL: /sbean）
├── ui-x/  admin/  chart/  releases.vue  [...all].vue   # 保持根级
src/content/{en,zh}/
├── ui/              # 旧根级 overview md + ui/components/* 合并
├── headless/        # 空目录（.gitkeep + 骨架 index.md 可选）
├── sbean/           # 旧 sbean.md
└── ui-x/  admin/  chart/
```

`DocMd` 的 `path` prop 约定为**相对 `content/{locale}/` 的完整路径**（如 `ui/components/button`、`sbean/index`、`headless/index`），不再隐式拼接 `ui/` 前缀；壳页面显式传入。`prerender.include` 与 llms.txt 插件遍历 `src/content` 时天然按分组目录生成路由，无需特判。

headless 分组本次只交付骨架：`pages/headless/index.vue`（占位页 + 侧边栏分组入口）、`constants/menus.ts` 预留 `headless` 分组（空 items）、`content/{en,zh}/headless/` 空目录。文档正文由后续独立任务填充。

---

## 5. 任务明细

> 工作量标记：S（≤0.5d 级别的小改动）、M、L；依赖关系以「前置」列标注。

### Phase 0 — 脚手架修正

| ID   | 任务                                                                                                                                                                                                                                                                                                   | 产物 / 验收                                                         | 规模 | 前置 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ---- | ---- |
| T0.1 | docs-new 包名改为 `@soybeanjs/ui-docs-new`；根 package.json 增加 `dev:docs:new`、`build:docs:new` scripts                                                                                                                                                                                              | `pnpm dev:docs:new` 可启动，`pnpm -r` 无 filter 冲突                | S    | —    |
| T0.2 | 补齐依赖：`@soybeanjs/headless`、`@soybeanjs/ui-x`、`@soybeanjs/admin`、`@soybeanjs/chart`、`shiki`、`@vueuse/core`、`@fontsource-variable/manrope`，以及示例所需 `zod`、`valibot`、`@tanstack/charts`、`@unovis/vue`、`@unovis/ts`、`@internationalized/date`（版本对齐旧站/playground package.json） | `pnpm install` 通过，`pnpm --filter ./apps/docs-new typecheck` 通过 | S    | T0.1 |
| T0.3 | tsconfig paths 补全：`@soybeanjs/ui-x`、`@soybeanjs/theme`、`@soybeanjs/theme/*`（对照 `apps/docs/tsconfig.json`；**不加** `@playground/*`，示例改为本地资产，见 D7）                                                                                                                                  | 跨包源码引用可解析                                                  | S    | T0.2 |
| T0.4 | locale 统一：`src/locales/zh-CN.json` → `zh.json`；验证 `.ubean/i18n.d.ts` 重新生成                                                                                                                                                                                                                    | dev 下 `/zh` 可访问且文案加载正常                                   | S    | —    |
| T0.5 | `ubean.config.ts` 补全：`markdown`（M3 全量选项）、`components: { dirs, resolvers: [UiResolver()] }`、`autoImports: { dirs: ['src/composables'] }`、`colorMode`（对齐 `@soybeanjs/theme` storage key，classSuffix 处理见 T5.2）                                                                        | 配置项均有类型提示，dev 启动无警告                                  | M    | T0.2 |
| T0.6 | 清理 docs-new 占位内容（home/default layout 文字占位、index.vue 的 `<div>Ubean</div>` 留待 Phase 4 重写，本步仅确认 `.ubean/` 生成物入库策略：加入 gitignore 或提交，与旧站 typed-router.d.ts 处理一致）                                                                                               | 决策落地并记录                                                      | S    | —    |

### Phase 1 — 内容管线

| ID   | 任务                                                                                                                                                                                                                                                                         | 产物 / 验收                                           | 规模 | 前置       |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---- | ---------- |
| T1.1 | 迁移内容目录（含分组重排，D8）：`apps/docs/src/docs/{en,zh-CN}` → `apps/docs-new/src/content/{en,zh}`，git mv 保留历史；根级 overview md + `ui/components/*` → `ui/`；`sbean.md` → `sbean/index.md`；新建空 `headless/`；`ui-x`/`admin`/`chart` 保持；en/zh 篇目差异清单产出 | 274 篇 md 按新分组就位；差异记录                      | M    | T0.4       |
| T1.2 | 移植 `doc-md.vue`：glob base 改 `../content/**`，locale 检测从 `useI18n().locale` 改为路径前缀（`/zh` → zh）；保留大纲 DOM 扫描逻辑                                                                                                                                          | 壳页面能渲染任意 content md；中英切换正确加载对应文件 | M    | T1.1       |
| T1.3 | 验证 md 内全局组件自动导入：在 `content/en/ui/components/button.md` 中确认 `<UsageCode>`/`<PlaygroundGallery>`/`<ComponentApi>` 经 `markdown.components.autoImport` 解析；若不支持，回退方案为在 md 顶部显式 import 或壳页面 provide                                         | button.md 页面完整渲染三区块                          | L    | T0.5, T1.2 |
| T1.4 | 移植 `composables/use-doc-outline.ts` 与 `use-generated-i18n.ts`；`styles/markdown.css`、`styles/global.css` 迁入并验证 `.markdown-wrapper` prose 样式生效                                                                                                                   | 大纲随滚动高亮；prose 排版与旧站一致                  | M    | T1.2       |
| T1.5 | frontmatter 规范化：为需要 title/description 的 md 补 frontmatter（旧站靠 `headEnabled` 用 h1；ubean docs 靠 frontmatter），`useHead` 在壳页面统一读取                                                                                                                       | 浏览器 tab 标题与 meta description 正确               | M    | T1.2       |

### Phase 2 — 布局与导航

| ID   | 任务                                                                                                                                                                                                                                                               | 产物 / 验收                      | 规模 | 前置 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ---- | ---- |
| T2.1 | 移植 `layouts/default.vue`（header + 固定侧栏 + 移动 SDrawer + 右 SAnchor 大纲 + 路由前缀显隐），layout 声明改为各页 `definePage({ layout: 'default' })`                                                                                                           | 桌面/移动布局与旧站一致          | M    | T1.4 |
| T2.2 | 移植 `constants/menus.ts`（menuData）与 `sider-menu.vue`、`app-header.vue`、`header-nav.vue`、`top-bar.vue`、`app-logo.vue`；路由跳转改用 `useLocalePath()`（zh 下自动加前缀）                                                                                     | 侧边栏分组、激活态、双语跳转正确 | L    | T2.1 |
| T2.3 | 移植 `locale-toggler.vue`：由「原地切 locale」改为 `useSwitchLocalePath` 链接跳转；`tool-bar.vue`、`theme-schema-toggler.vue`（`useTheme`）、`search-document.vue`（Cmd+K + SCommand）移植（tool-bar 中 theme-configurator 的本地化接线放 T3.1，本步先以占位引入） | 语言/主题/搜索三件套可用         | M    | T2.2 |
| T2.4 | 移植 `motion/background-decoration.vue`；`pages/404.vue`（或 `[...all].vue`）                                                                                                                                                                                      | 404 页样式正常                   | S    | T2.1 |

### Phase 3 — 交互组件（demo / API / changelog）

| ID   | 任务                                                                                                                                                                                                                                                                                                                             | 产物 / 验收                                                                  | 规模 | 前置       |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---- | ---------- |
| T3.0 | 迁移 playground 示例（D7）：git mv `apps/docs/src/examples/{ui,ui-x,chart}/**/NN-*.vue` → `apps/docs-new/src/examples/`（丢弃 118 个 index.vue，admin 空跳过）；随迁 `constants/theme.ts`、`shared/index.ts` 工具、`components/theme-configurator.vue`；修正 NN 示例中 `../../../constants/theme` → `~/constants/theme`（20 处） | 464 个示例可被 docs-new 解析；`pnpm --filter ./apps/docs-new typecheck` 通过 | L    | T0.2, T0.3 |
| T3.1 | 移植 `constants/globs.ts`（examples 双 glob 改本地 base `../examples/**` + `NN-name` 排序，逻辑不变）与 `usage-code.vue`、`playground-gallery.vue`、`code-block.vue`、`copy-button.vue`、`shared/encode.ts`；`tool-bar.vue` 引用 theme-configurator 改本地路径                                                                   | button 等组件 demo 区可预览 + 看源码 + 复制                                  | L    | T3.0, T1.3 |
| T3.2 | 移植 `components/tables/` 全目录（generated-api.ts、component-api.vue、type-table/type-reference/type-data/type-anchor/callable-type-table/union-type/data-table/type-preview-*）与 `shared/generated-changelog.ts`、`component-changelog.vue`                                                                                   | API 表格渲染、类型锚点跳转、changelog 区块与旧站一致                         | L    | T3.1       |
| T3.3 | generated 数据接入：过渡期从 `apps/docs/src/generated` 复制脚本或 `pnpm --filter @soybeanjs/scripts` 双写（D4 的 `sui gen` 多目标改造放 T6.2，此处先以最小方式让数据可用）                                                                                                                                                       | docs-new 内 import 路径统一 `~/generated/*`                                  | M    | T3.2       |
| T3.4 | 移植 fence CopyButton（M4）：先验证 `markdown.markdownExit` 能否注入自定义插件；不行则改为客户端增强（markdown 渲染后遍历 `pre` 挂 CopyButton）或 shiki transformer                                                                                                                                                              | 所有 md 代码块有复制按钮且 SSG 产物中可见                                    | M    | T1.3       |
| T3.5 | `tailwind-palette.vue` 等资源组件移植（含其数据源）                                                                                                                                                                                                                                                                              | 主题/调色板页面可用                                                          | S    | T3.1       |

### Phase 4 — 页面

| ID   | 任务                                                                                                                                                                                                           | 产物 / 验收                                   | 规模 | 前置       |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---- | ---------- |
| T4.1 | 着陆页 `pages/(ui)/index.vue`（layout: home）：移植旧站 hero/stats/features + `SConfigProvider` 已有；`layouts/home.vue` 实装                                                                                  | 首页与旧站视觉一致，URL 仍为 `/`              | L    | T2.1       |
| T4.2 | overview 组页面迁入 `pages/(ui)/overview/`：introduction、quick-start、theming、llms、skills、installation（壳 + DocMd，path 用 `ui/{name}`）                                                                  | 6 页可访问，URL `/overview/*` 不变            | M    | T1.2       |
| T4.3 | `pages/(ui)/components/index.vue`（目录卡片页）+ `[name].vue`（hero + DocMd + changelog 区，DocMd path 用 `ui/components/{name}`，`route.params` 类型用 `.ubean/typed-router.d.ts`）                           | 94 个组件详情页全通，URL `/components/*` 不变 | L    | T3.1, T3.2 |
| T4.4 | ui-x / admin / chart 三组页面保持根级（各自 index + [name] + installation + quick-start；ui-x 另有 i18n.vue、theming.vue）                                                                                     | 三组页面全通                                  | L    | T4.3       |
| T4.5 | `releases.vue`（版本 changelog + 组件过滤 + query 同步，根级）、`pages/sbean/index.vue`（URL `/sbean`，DocMd path `sbean/index`）、`pages/(ui)/about.vue`（DocMd path `ui/about`）                             | 全页面覆盖                                    | M    | T3.2       |
| T4.6 | headless 分组骨架（D8）：`pages/headless/index.vue` 占位页（说明文档建设中）、`content/{en,zh}/headless/.gitkeep`、`menus.ts` 预留 headless 分组（空 items，侧边栏不渲染空组）、`search-document.vue` 预留分组 | `/headless` 可访问，不影响其余导航            | S    | T2.2       |
| T4.7 | 路由 parity 检查：对照旧站全部路由清单逐条验证（含 `/zh` 前缀镜像、`(ui)` 剥离后路径与旧站完全一致、`.ubean/typed-router.d.ts` 中 RoutePathMap 无 `(ui)` 泄漏）                                                | parity 清单 100%                              | M    | T4.1–T4.6  |

### Phase 5 — 构建、SEO 与部署

| ID   | 任务                                                                                                                                                                                          | 产物 / 验收                                 | 规模 | 前置 |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---- | ---- |
| T5.1 | `prerender.include`：`collectContentRoutes()` 遍历 `src/content/{en,zh}`（按 ui/headless/sbean/ui-x/admin/chart 分组目录）+ 壳页面路由 + `/zh` 镜像；`crawlLinks: true`、`failOnError: false` | `ubean build` 产出全部静态 HTML             | M    | T4.7 |
| T5.2 | 主题 no-flash 验证：`app.ts` 的 `createThemeInitScript` 与 ubean `colorMode`（classSuffix/storageKey）共存策略——参照 ubean docs D20 用裸 `.dark`；SSG 产物中检查首帧无闪烁                    | 刷新深色页无闪白                            | M    | T2.3 |
| T5.3 | sitemap + robots：验证 `@ubean/seo` 0.4.1 是否自动生成 `/sitemap.xml`；否则补 build 后脚本（含多语言 alternates）                                                                             | 产物含正确 sitemap.xml                      | M    | T5.1 |
| T5.4 | llms.txt：移植 `build/llms.ts` 为 docs-new Vite 插件，调整内部路径（content 分组目录、generated api）                                                                                         | dev 中间件 + build 产物 llms.txt 与旧站等价 | M    | T3.3 |
| T5.5 | 静态资源迁移：`public/`（favicon、og 图、sw.js 等旧站 public 内容盘点后迁移）；`@fontsource-variable/manrope` 引入                                                                            | 无 404 资源                                 | S    | T0.2 |
| T5.6 | UnoCSS 扫描范围验证：`.md` 编译产物、本地 `src/examples/`（464 个示例）、ui 包源码中的类名均被生成（`pipeline.include` 调整 + 产物 CSS 抽查）                                                 | 无样式丢失                                  | M    | T3.1 |
| T5.7 | 水合一致性：SSG 产物加载后 dialog/drawer/command/progress 等交互组件无 hydration mismatch 警告                                                                                                | console 干净                                | M    | T5.1 |

### Phase 6 — 验证、切换与 playground 下线

| ID   | 任务                                                                                                                                                                                                                                                                                         | 产物 / 验收                                               | 规模 | 前置      |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---- | --------- |
| T6.1 | 质量门禁：`typecheck`、`lint`、`ubean build` 全绿；对照 `.agents/skills/soybean-ui-develop/e2e.md` Tier 2 思路做 docs 冒烟（首页/组件页/demo 交互/搜索/双语/深色）                                                                                                                           | CI 可运行                                                 | M    | Phase 5   |
| T6.2 | `sui gen api/changelog` 输出多目标化（D4），移除过渡复制；`--translate` 流程回归                                                                                                                                                                                                             | 生成链路与新站闭环                                        | L    | T3.3      |
| T6.3 | 文档与配置收尾：更新 `AGENTS.md`/`docs/architecture.md` 中 apps/docs 描述、根 scripts 指向新站、CI `ci.yml` docs 相关 job（如有）调整                                                                                                                                                        | 文档一致                                                  | S    | T6.1      |
| T6.4 | 切换：删除 `apps/docs`（含 `pages1`/`layouts1` 死目录随旧站一并消失）；docs-new 包名改回 `@soybeanjs/ui-docs`                                                                                                                                                                                | 仓库仅存一个 docs 站                                      | S    | T6.1–T6.3 |
| T6.5 | 删除 `apps/playground`（D7）：目录移除、根 scripts 删 `dev:playground`/`build:playground` 并把默认 `dev` 指向 `dev:docs`、`.agents/skills/soybean-ui-develop/`（SKILL.md/surfaces.md/e2e.md/audit.md）demo 交付面改写为 docs-new `src/examples`、`docs/architecture.md` workspace 清单 14→13 | 全仓 grep 无 playground 残留引用；`pnpm install` 与 CI 绿 | M    | T6.4      |

---

## 6. 风险与开放问题

| ID     | 风险                                                                                                                                         | 影响                       | 缓解                                                                                                                         |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| R1     | 发布版 ubean@0.4.1 与本地仓库源码行为差异（文档站以 0.4.1 为准，本报告部分能力来自仓库源码）                                                 | 配置项/行为与预期不符      | 一切以 `node_modules/.pnpm/@ubean+*0.4.1` 的 `.d.ts` 为准；T0.5/T1.3 提前做能力 spike 验证                                   |
| R2     | `markdown.components.autoImport` 对 `src/components` 全局组件在 md 内的解析可能不完整（旧站靠 unplugin-vue-components `include: [/\.md$/]`） | Phase 3 组件在 md 中不可用 | T1.3 专项验证；回退：md 显式 import 或壳页面 provide                                                                         |
| R3     | fence 级 CopyButton 注入无官方 markdown-it 插件钩子                                                                                          | md 代码块无复制按钮        | T3.4 三套备选（markdownExit 透传 / 客户端增强 / shiki transformer）                                                          |
| R4     | UnoCSS 对 `.md` 编译产物与本地 `src/examples/`（464 文件）扫描遗漏 → 样式丢失                                                                | demo 渲染错乱              | T5.6 产物抽查；必要时 `content.pipeline.include` 显式加 `\.vue` 之外的路径（示例已是 app 内文件，风险较跨 app 版本显著降低） |
| R5     | ubean colorMode 与 `@soybeanjs/theme` 的存储 key/class 命名冲突导致闪烁或双状态源                                                            | 深色模式异常               | 以 `@soybeanjs/theme` 为唯一状态源，ubean colorMode 仅 `preference` 或禁用（对照 ubean docs D20）                            |
| R6     | `@ubean/seo` 0.4.1 的 sitemap 生成能力未证实                                                                                                 | SEO 产物缺失               | T5.3 自写脚本兜底（vite-ssg-sitemap 逻辑简单，可移植）                                                                       |
| R7     | SSG 预渲染 + `@soybeanjs/ui` 复杂组件（Dialog/Command/HoverCard 的 popper 定位）hydration mismatch                                           | 交互异常                   | 保留 `optimizeDeps.exclude`；T5.7 专项；必要时对纯交互壳用 `v-client`（Islands）                                             |
| R8     | ubean 处于 v0.x，0.4.x 间可能破坏性变更                                                                                                      | 升级成本                   | 锁 `^0.4.1` 内小版本；Phase 6 后评估 pin 精确版本                                                                            |
| R9     | 旧站 en(134)/zh(140) 内容不对称，迁移后 zh 存在多余或缺失篇目                                                                                | 双语 parity 破损           | T1.1 产出差异清单；zh 多余篇目保留但标记 `translated-stub` 反过来的缺英文回退（可复用 ubean docs 机制）                      |
| Q1     | 是否借迁移把 `/components/{name}` 等 URL 结构调整（旧站无前缀、新站 zh 有 `/zh` 前缀）                                                       | 外链兼容                   | 开放问题：如需旧链接兼容，用 `routeRules` 配置 redirect。`(ui)` 分组本身不改 URL，无此顾虑                                   |
| ~~Q2~~ | ~~playground 的 ThemeConfigurator 是否长期跨 app 引用~~                                                                                      | —                          | **已关闭**：v2 决策 D7 将示例与 theme-configurator 全部迁入 docs-new，playground 应用删除                                    |
| Q3     | headless 文档正文的排期与来源（本次仅交付骨架）                                                                                              | `/headless` 长期占位       | 开放问题：headless 组件是否逐一对应文档、API 表是否复用 `sui gen api`（headless 已有类型抽取），需单列需求                   |
| Q4     | `sui gen api` 对 headless 分组的输出结构（`generated/api/headless/*`？）                                                                     | 生成链路                   | 与 T6.2 多目标化一并设计，需确认 `packages/headless` 的公开组件清单如何映射到 docs 分组                                      |

---

## 7. 里程碑与完成定义

- **M-A（Phase 0–1）**：`pnpm dev:docs:new` 下 `/`、`/zh`、`/overview/*`、`/components/*` 双语内容按新分组（`(ui)` 路由 + content 分组目录）可渲染，md 内组件区块可用 → 内容管线打通。
- **M-B（Phase 2–3）**：布局/导航/搜索/主题/demo/API/changelog 全部功能对齐旧站；464 个示例在 docs-new 本地运行 → 功能 parity。
- **M-C（Phase 4–5）**：全页面（含 headless 骨架、sbean 分组）+ 全路由预渲染产物通过，SEO 产物齐备 → 可部署。
- **M-D（Phase 6）**：CI 绿、生成链路闭环、旧站删除、playground 删除、`dev:docs`/`build:docs` 指向新站 → 切换完成。

完成定义（DoD）：新站在功能、内容、双语、主题、SEO、llms.txt、registry 产物上与旧站逐项等价；demo 源码归属 docs-new；`typecheck`/`lint`/`build` 通过；`apps/docs` 与 `apps/playground` 从仓库移除，全仓无残留引用。
