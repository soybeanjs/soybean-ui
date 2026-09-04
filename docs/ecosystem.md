# SoybeanUI 生态架构方案

> 本文记录 SoybeanUI 周边 UI 组件生态（ui-x / admin / chart 及未来 ui-pro / ui-lowcode 等）的依赖架构、文档展示、分发与扩展契约。
> 决策来源：`/grilling` 会话（3 轮）+ `CONTEXT.md` 术语表 + `docs/adr/0001-peripheral-package-layering.md`。
> 生成日期：2026-08-13。

## 1. 背景与目标

核心库（`@soybeanjs/headless` + `@soybeanjs/ui` + `@soybeanjs/theme` + `@soybeanjs/ui-uno`）已稳定。现需围绕它构建多条领域扩展线：

| 包                      | 领域                                        | 当前状态                                                    |
| ----------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `@soybeanjs/ui-x`       | AI 组件（Bubble/Sender/ThoughtChain…）      | `ui-x` 分支已初始化，含独立的 `headless-x`（待拆解）        |
| `@soybeanjs/admin`      | 后台应用壳（AppLayout/AppMenu/Breadcrumb…） | `admin` 分支已初始化，单包                                  |
| `@soybeanjs/chart`      | 图表组件（对标 shadcn charts）              | `chart` 分支，尚无包                                        |
| `@soybeanjs/editor`     | 富文本编辑器（Tiptap 内核，MIT 边界）       | 立项提案（见 [ecosystem/editor.md](./ecosystem/editor.md)） |
| `@soybeanjs/table`      | 高级数据网格 / ProTable                     | 立项提案（见 [ecosystem/table.md](./ecosystem/table.md)）   |
| `@soybeanjs/form`       | Schema 驱动高级表单                         | 立项提案（见 [ecosystem/form.md](./ecosystem/form.md)）     |
| `@soybeanjs/ui-pro`     | 高级/付费组件                               | 未来                                                        |
| `@soybeanjs/ui-lowcode` | 低代码渲染组件                              | 未来                                                        |

> 商业化：editor / table / form 三生态的方向与执行建议见 [ecosystem/commercialization.md](./ecosystem/commercialization.md)；市场调研原始结论见 [research/](./research/)。

目标：在保持核心 headless/ui 分层招牌的前提下，给出一个**一致、可扩展、低耦合**的外围包架构；统一文档展示与 sbean 分发；为新包接入提供契约化清单。

## 2. 总体架构

### 2.1 分层依赖图

```
Layer 4 · 外围包（单包自治：领域逻辑 + 样式同居）
   @soybeanjs/ui-x      @soybeanjs/admin ──► @soybeanjs/chart
        │                      │                    ▲
        │                      │                    │
        └──────────┬───────────┴────────────────────┘
                   │  (admin → chart：有向依赖, peerDep; 见 §5)
                   ▼
Layer 3 · 核心样式层
                @soybeanjs/ui
                   │
                   ▼
Layer 2 · 核心逻辑层
        @soybeanjs/headless        @soybeanjs/theme
            ▲                         ▲
            │                         │
Layer 1 · 适配层                  @soybeanjs/ui-uno （消费 theme）

横切 · @soybeanjs/sbean
  CLI / registry / 文档分发 / 模板；非运行时依赖，按源码路径消费各包
```

依赖方向铁律：

- 外围包 → 核心（headless / ui / theme）。允许。
- 外围包 → 外围包。仅限 §5 白名单的有向边，禁止环。
- 核心 → 外围包。**禁止**（会成环）。
- `headless` → `ui`。**禁止**（已有铁律，复述）。

### 2.2 包清单与角色

| 包                    | 层  | 运行时依赖                           | 前缀          | 独立逻辑层?      |
| --------------------- | --- | ------------------------------------ | ------------- | ---------------- |
| `@soybeanjs/theme`    | 2   | —                                    | —             | —                |
| `@soybeanjs/headless` | 2   | —                                    | —             | 是（唯一逻辑层） |
| `@soybeanjs/ui-uno`   | 1   | theme                                | —             | —                |
| `@soybeanjs/ui`       | 3   | headless, theme                      | `S`           | —                |
| `@soybeanjs/ui-x`     | 4   | headless, ui, theme                  | `Sx`          | 否（逻辑在包内） |
| `@soybeanjs/admin`    | 4   | headless, ui, theme, **chart**(peer) | `S`+`App*`    | 否               |
| `@soybeanjs/chart`    | 4   | headless, ui, theme                  | `S`+`Chart*`  | 否               |
| `@soybeanjs/editor`   | 4   | headless, ui, theme（Tiptap peer）   | `S`+`Editor*` | 否（提案）       |
| `@soybeanjs/table`    | 4   | headless, ui, theme, **form**(peer)  | `S`+`Table*`  | 否（提案）       |
| `@soybeanjs/form`     | 4   | headless, ui, theme                  | `S`+`Form*`   | 否（提案）       |

## 3. 分层模型（核心决策，详见 ADR-0001）

### 3.1 规则

1. **核心 `@soybeanjs/headless` 是唯一逻辑层**。它只承载：a11y primitives、通用 composables、共享 types。
2. **外围包均为单包**（领域逻辑 + 样式同居于 `packages/<pkg>/src/`），**不另建"领域逻辑包"**。
3. **绝大多数外围组件是包装型组件**——由现有 headless primitives 组合/包装而成，不引入新原子能力。
4. **仅"原子原语"级新组件可上浮到核心 headless**。判据：无法由现有 primitives 组合而成 + 提供可复用的 a11y/交互原语。判据由作者按规则自决（R1，无强制 PR 评审；但建议在 PR 描述中标注"上浮 headless"并说明判据命中点）。
5. **Compact 聚合暂不考虑**在外围包内单独建模——外围包目前只做基础包装型组件。

### 3.2 拆解 `headless-x`（Q1=C 的直接后果）

当前 `ui-x` 分支存在 `@soybeanjs/headless-x`（仅 composables + types，无 SFC）。按本方案拆解：

- 删除包 `packages/headless-x/`。
- 将其内容迁移进 `packages/ui-x/src/`：
  - `headless-x/src/composables/*` → `ui-x/src/composables/*`（use-chat / use-send / use-think / use-typing / use-x-stream / use-bubble-list-scroll / use-conversations / use-sender / use-thought-chain）
  - `headless-x/src/types/*` → `ui-x/src/types/*`
  - `headless-x/test/specs/*` → `ui-x/test/specs/*`
- `packages/ui-x/package.json` 移除 `@soybeanjs/headless-x` 依赖；exports 增补 `"./composables"` 与 `"./types"` 子路径（见 §5.2）。
- 若其中存在真正"原子原语"级 hook（评估：`use-x-stream` 如属通用流式原语，可考虑上浮核心 headless 的 `composables/`），按 §3.1 判据单独评估；其余 AI 领域逻辑留在 `ui-x`。

### 3.3 命名（Q2）

- 样式包名保留 `@soybeanjs/ui-x`（不改 `ui-ai`）。`-x` 作为"AI/扩展"的样式品牌。
- 不存在 `headless-ai` / `headless-x` 包。

## 4. 命名与前缀规则（Q3）

| 包                      | 组件前缀           | 示例                     | 规则                      |
| ----------------------- | ------------------ | ------------------------ | ------------------------- |
| `@soybeanjs/ui`         | `S`                | `SButton`                | 核心                      |
| `@soybeanjs/ui-x`       | `Sx`               | `SxBubble` `SxSender`    | 强领域词汇表 → 2 字母前缀 |
| `@soybeanjs/admin`      | `S`+`App*`         | `SAppLayout` `SAppMenu`  | 领域名词前缀防撞          |
| `@soybeanjs/chart`      | `S`+`Chart*`       | `SChartBar` `SChartLine` | 领域名词前缀防撞          |
| `@soybeanjs/ui-pro`     | `S`+`Pro*`（待定） | —                        | 未来                      |
| `@soybeanjs/ui-lowcode` | `S`+`Lc*`（待定）  | —                        | 未来                      |

判据（写入 `CONTEXT.md`「组件前缀」）：**领域词汇表强度**。当组件名构成该领域专属词汇表（AI 的 Bubble/Sender/ThoughtChain 在普通 UI 词汇中不存在）→ 用 2 字母前缀；否则用 `S` + 领域名词前缀防撞。`@soybeanjs/admin` 包名保留（表意"应用壳"而非"另一种 UI 风格"），不改为 `ui-admin`。

## 5. 依赖方向（Q5）

### 5.1 跨包依赖方向白名单

外围包之间允许**有向依赖、禁止环**。白名单初始条目：

| 消费方             | 被依赖方           | 理由                               | 声明形式                                                                           |
| ------------------ | ------------------ | ---------------------------------- | ---------------------------------------------------------------------------------- |
| `@soybeanjs/admin` | `@soybeanjs/chart` | 后台仪表盘常嵌图表                 | `peerDependencies`                                                                 |
| `@soybeanjs/table` | `@soybeanjs/form`  | 查询表单（`STableQuery` 可选增强） | `peerDependencies`（提案，立项时出 ADR，见 [table.md](./ecosystem/table.md) §4.3） |

- 其余外围包之间默认**独立**，不互相依赖。
- 新增有向边需更新本表与 `CONTEXT.md`「跨包依赖方向白名单」。
- 跨外围包依赖**一律**声明为 `peerDependencies`（非 `dependencies`），由宿主统一版本，与 lockstep（§9）协同。

### 5.2 composables 子路径暴露（C 的代价缓解）

`@soybeanjs/ui-x` 在 `package.json` 的 `exports` 增补：

```jsonc
{
  ".": "./src/index.ts",
  "./composables": "./src/composables/index.ts", // 新增
  "./types": "./src/types/index.ts", // 新增
  "./resolver": "./src/resolver/index.ts",
  "./styles.css": "./src/styles/index.css",
  "./*": "./src/components/*/index.ts"
}
```

消费者可 `import { useChat } from '@soybeanjs/ui-x/composables'`，无需挂载 SFC。仍需依赖 `ui-x` 包，但树摇友好。

### 5.3 渐进上浮规则

当某个 `ui-x` composable 被其它外围包（如未来 `ui-pro`）需要时，按 §3.1「原子原语」判据评估是否上浮核心 `@soybeanjs/headless`；单域独享则留 `ui-x`。

## 6. sbean registry（Q4）

### 6.1 命名空间 item

单一 `packages/sbean/registry.json`，顶层增补 `packages` 元数据，items 改为命名空间形式：

```jsonc
{
  "name": "soybean-ui",
  "homepage": "https://ui.soybeanjs.cn",
  "packages": [
    { "name": "ui", "scope": "@soybeanjs/ui", "prefix": "S" },
    { "name": "ui-x", "scope": "@soybeanjs/ui-x", "prefix": "Sx" },
    { "name": "admin", "scope": "@soybeanjs/admin", "prefix": "S", "nounPrefix": "App" },
    { "name": "chart", "scope": "@soybeanjs/chart", "prefix": "S", "nounPrefix": "Chart" }
  ],
  "items": [
    {
      "name": "ui/button",
      "package": "ui",
      "type": "registry:ui",
      "dependencies": ["@soybeanjs/headless"],
      "files": [/* … */]
    },
    {
      "name": "ui-x/bubble",
      "package": "ui-x",
      "type": "registry:ui",
      "dependencies": ["@soybeanjs/ui"],
      "files": [/* … */]
    },
    {
      "name": "admin/app-layout",
      "package": "admin",
      "type": "registry:ui",
      "dependencies": ["@soybeanjs/ui"],
      "files": [/* … */]
    },
    {
      "name": "chart/bar",
      "package": "chart",
      "type": "registry:ui",
      "dependencies": ["@soybeanjs/ui"],
      "files": [/* … */]
    }
  ]
}
```

- item `name` 形如 `<package>/<component>`；附 `package` 字段标识归属。
- 既有 `name`（如 `accordion`）迁移为 `ui/accordion`（向后兼容：`sbean docs` 的 `getComponentSlug` 已能处理 `@scope/name`，CLI 同时接受 `accordion` 作为 `ui/accordion` 的别名）。

### 6.2 CLI

- `sbean add ui-x/bubble` —— 命名空间路径寻址。
- `sbean add bubble` —— 仍可用（唯一时直查；重名时提示补命名空间）。
- `sbean list --package ui-x` —— 按包列出。
- `sbean docs <item>` —— 输出对应命名空间文档链接（`/ui-x/components/bubble` 等，见 §7）。

### 6.3 文档展示

文档站按 `package` 字段分组展示各包的 registry 条目（见 §7.4）。

## 7. 文档站架构（Q6）

### 7.1 路由命名空间

单一 `apps/docs/` 应用，路由命名空间化：

| 路由前缀      | 包                      | 侧边栏 menu data |
| ------------- | ----------------------- | ---------------- |
| `/components` | `@soybeanjs/ui`（核心） | `menuData`       |
| `/ui-x`       | `@soybeanjs/ui-x`       | `uiXMenuData`    |
| `/admin`      | `@soybeanjs/admin`      | `adminMenuData`  |
| `/chart`      | `@soybeanjs/chart`      | `chartMenuData`  |

每命名空间页面结构（沿用 ui-x 已验证模板）：

- `index.vue` —— hero 落地页（每包独立品牌）
- `installation.vue` / `quick-start.vue` —— 安装与快速开始
- `i18n.vue` —— 仅多语言组件才写
- `theming.vue` —— 仅当该包有独立主题步骤才写；否则命名空间下指向核心 `/components/theming`
- `[name].vue` —— 组件详情（按 `Sx` / `SApp*` / `SChart*` 前缀渲染导入名）

### 7.2 顶部包切换器（Q6b=II）

`apps/docs/src/layouts/default.vue` 的 header 增补包切换下拉（UI / UI-X / Admin / Chart），切换时跳转对应命名空间根并切换侧边栏 menu data。

`shouldShowSidebar` 由 `route.path.startsWith` 列表适配：`/overview`、`/components`、`/ui-x`、`/admin`、`/chart`。每加一个包追加一项 + 一个 `<Pkg>MenuData`。

### 7.3 API / Changelog 生成（Q6c=P2 子目录）

`pnpm sui gen api` / `pnpm sui gen changelog` 扩展为按包遍历 exports：

```
apps/docs/src/generated/
  api/
    ui/accordion.json          # 原 generated/api/accordion.json 迁移
    ui/button.json
    ui-x/bubble.json
    ui-x/sender.json
    admin/app-layout.json
    chart/bar.json
  api-locales/
    ui/en.json  ui/zh-CN.json
    ui-x/en.json  ui-x/zh-CN.json
    ...
  changelog/
    ui/...  ui-x/...  admin/...  chart/...
  changelog-locales/
    ui/...  ui-x/...  ...
```

`scripts/cli.ts` 的 `api` / `changelog` 命令改为：遍历 `packages` 元数据 → 对每个包的 `src/index.ts` 提取类型/变更 → 写入对应子目录。`<ComponentApi>` / `<PlaygroundGallery>` 渲染时按当前路由命名空间定位子目录。

### 7.4 落地页分层共享（Q6d）

- 每包都有独立 hero `index`（品牌区分）。
- `installation`：仅核心 ui 与有独立安装步骤的包写；chart 无独立步骤则其命名空间下指向核心。
- `theming`：仅核心 ui 写；外围包命名空间下指向核心。
- `i18n`：仅多语言组件才写。

### 7.5 sbean 在文档中的展示

文档站新增 `/registry`（或在每包命名空间下加 `registry` 子页），按 `package` 字段分组展示 sbean registry 条目，附 `sbean add <name>` 命令与源码链接。

## 8. playground（Q8）

### 8.1 examples 目录结构（Q8a=D 全 per-package 子目录）

全部 per-package 子目录，**core 也迁移到 `examples/ui/`**：

```
apps/playground/src/examples/
  ui/                  # 原 examples/<component>/ 全部迁入此目录
    accordion/  button/  ...
  ui-x/
    bubble/  sender/  ...
  admin/
    index.vue  01-shell.vue  ...
  chart/
    bar/  line/  ...
```

- 迁移影响：docs 中 `<PlaygroundGallery>` 引用路径、playground 内部导航、`AGENTS.md` 表格中的 Demo source 路径需同步更新。
- core 迁移 churn 较大（几十个组件），但在 §11 合并主干时一次性完成，换取长期对称。

### 8.2 playground 包切换器（Q8b）

镜像 docs §7.2，playground 顶部加包切换器，切换时切到 `examples/<pkg>/` 入口与对应导航。

### 8.3 playground 依赖（Q8c）

每新增外围包都加入 `apps/playground/package.json` 的 `dependencies`（admin 已加；ui-x、chart 同步加）。

## 9. 版本 / 分支 / 发布（Q7）

### 9.1 lockstep 版本（Q7a=L）

所有包共享单一版本号（当前 `0.29.3`）。`pnpm publish -r` 一次发布全包。跨包依赖无需 range 协商（`workspace:^` 在仓内、`peerDependencies` 在发布态）。退出路径见 `CONTEXT.md`「lockstep 版本」。

### 9.2 单主干（Q7b=M）

- `main` 是唯一长期分支。
- 当前 `ui-x` / `admin` / `chart` 分支仅为各包功能开发的临时分支，按 §11 合并到 main 后即归档/删除。
- 后续每包功能走短生命周期 feature branch，频繁合回 main。

### 9.3 单 tag（Q7c）

单一 `v<x.y.z>` tag 触发 `release.yml`，全包同发。

## 10. 新包接入清单（Q9，扩展性契约）

新增外围包 `@soybeanjs/<pkg>` 必改 touchpoints（Q9a=C1，仅以本文档为 checklist；Q9b=R1，原子原语判据作者自决）：

1. **包骨架** `packages/<pkg>/`：
   - `package.json`：`name`/`description`/`version`(=当前 lockstep)/`exports`(含 `.`/`./composables`?/`./types`?/`./resolver`/`./styles.css`/`./nuxt`?)/`peerDependencies`(vue, unplugin-vue-components, 可选 nuxt/vue-router)/`dependencies`(`@soybeanjs/headless` `@soybeanjs/ui` `@soybeanjs/theme` `@soybeanjs/cva`)/`scripts`(`build`/`build:css`/`test`/`typecheck`)
   - `src/{components,composables?,types?,styles,index.ts,resolver/index.ts,nuxt/index.ts?}`
   - `tsconfig.json`、`vite.config.ts`
2. **根 `package.json`**：追加 `build:<pkg>` 脚本；接入 `build` 依赖序（外围包在 `build:headless`/`build:ui`/`build:libs` 之后）。
3. `pnpm-workspace.yaml`：已是 `packages/**` glob，无需改。
4. **docs**：
   - `apps/docs/src/docs/{en,zh-CN}/<pkg>/{index,installation,quick-start,i18n?,theming?}.md` + `components/<name>.md`
   - `apps/docs/src/pages/<pkg>/{index,[name],installation,quick-start,i18n?,theming?}.vue`
   - `apps/docs/src/constants/menus.ts` 追加 `<Pkg>MenuData`
   - `shouldShowSidebar` 追加 `/<pkg>`
   - header 包切换器追加入口
5. **sui 生成**：`scripts/cli.ts` 的 `api`/`changelog` 按 §7.3 遍历新包 exports → `generated/api/<pkg>/*.json` 等。
6. **sbean registry**：`packages/sbean/registry.json` 顶层 `packages` 追加 `<pkg>` 元数据；items 追加命名空间条目 `<pkg>/<component>` + `package` 字段。
7. **playground**：`apps/playground/src/examples/<pkg>/` + `apps/playground/package.json` 追加 dep + 包切换器入口。
8. **CONTEXT.md**：若引入新领域词汇，追加 glossary 条目。
9. **`AGENTS.md` + `docs/architecture.md`**：把新包补进 WHERE TO LOOK 表与依赖图。
10. **跨外围依赖**（仅当命中 §5 白名单）：在白名单追加有向边，并声明为 peerDependencies。

## 11. 迁移路径

### 11.1 三分支合并到 main（Q7b 执行步骤）

1. 从 `main` 拉取最新基线。
2. 按依赖顺序合并：先 `ui-x`（拆解 headless-x，见 §11.2）→ 再 `chart`（新建包）→ 最后 `admin`（接入 `admin→chart` peerDep）。
3. 每步合并后跑 `pnpm typecheck` + `pnpm test` + `pnpm build` 验证。
4. 合并完成后归档/删除 `ui-x` / `admin` / `chart` 分支，后续 feature branch 走 main。

### 11.2 拆解 headless-x（§3.2 执行步骤）

1. 在合并 `ui-x` 时执行：`packages/headless-x/src/composables/*` → `packages/ui-x/src/composables/*`；`types/*` → `ui-x/src/types/*`；`test/specs/*` → `ui-x/test/specs/*`。
2. 删除 `packages/headless-x/`。
3. `packages/ui-x/package.json` 移除 `@soybeanjs/headless-x` 依赖；exports 增补 `./composables`、`./types`。
4. 评估 `use-x-stream` 是否上浮核心 headless（§3.2）。
5. 更新 `packages/ui-x/src/index.ts` re-export 新路径。

### 11.3 core examples 迁移（§8.1 执行步骤）

1. `git mv apps/playground/src/examples/<component> apps/playground/src/examples/ui/<component>`（批量，几十个组件）。
2. 更新 docs `<PlaygroundGallery>` 引用、playground 导航、`AGENTS.md` Demo source 路径、`typed-router.d.ts`（自动重生成）。
3. ui-x 当前扁平混入的 examples（`bubble`/`attachments`/`actions`…）迁入 `examples/ui-x/`。

### 11.4 registry 命名空间化（§6 执行步骤）

1. `packages/sbean/registry.json` 顶层加 `packages` 元数据。
2. 既有 items `name` 加 `ui/` 前缀（`accordion` → `ui/accordion`），加 `package: "ui"` 字段。
3. 新增 `ui-x/*`、`admin/*`、`chart/*` items。
4. `sbean` CLI 的 `getComponentSlug` / `fetchRegistryItem` 适配命名空间路径，保留无前缀别名兼容。

### 11.5 sui gen api 多包扩展（§7.3 执行步骤）

1. `scripts/cli.ts` 的 `api` 命令改为遍历 `packages` 元数据，对每包 `src/index.ts` 提取类型。
2. 输出从 `generated/api/<component>.json` 迁移到 `generated/api/<pkg>/<component>.json`；`api-locales` 同步。
3. `<ComponentApi>` 渲染按当前路由命名空间定位子目录。
4. `changelog` / `changelog-locales` 同步改造。

## 12. 相关 ADR

- [ADR-0001 · 外围包分层模型](adr/0001-peripheral-package-layering.md) —— 记录"拆解 headless-x、外围包单包自治、核心 headless 唯一逻辑层"的决策与权衡。

## 13. 术语对照

见 [`CONTEXT.md`](../CONTEXT.md)：外围包（peripheral package）、原子原语（atomic primitive）、包装型组件（wrapper component）、组件前缀（component prefix）、命名空间 registry item、跨包依赖方向白名单、lockstep 版本。
