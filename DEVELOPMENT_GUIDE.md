# Soybean UI 开发指南

本文档旨在为 Soybean UI 项目提供一套从组件研发到文档生成的最佳实践，借鉴了业界优秀组件库 (如 Ant Design, Naive UI) 的经验，并力求简化开发流程、提高开发效率。

## 1. 核心理念

*   **组件、示例、文档一体化**: 每个组件相关的源代码、使用示例 (demos) 和 Markdown API 文档应集中管理在其各自的目录中，方便开发、维护和查阅。
*   **专用开发预览**: 提供一个独立的开发预览环境，使开发者能快速、便捷地查看和调试正在开发的组件及其所有示例。
*   **文档驱动**: 组件的 `demos` 和 `API 文档` 直接作为最终用户文档的来源，由文档站点 (如 Nuxt) 解析和渲染。

## 2. 推荐项目结构

```
soybean-ui/
├── packages/
│   ├── soy-ui/                      # 核心 UI 组件库 (可发布为 npm 包)
│   │   ├── src/
│   │   │   ├── components/          # 所有 UI 组件
│   │   │   │   ├── Alert/           # Alert 组件示例目录
│   │   │   │   │   ├── source/     # 源码文件夹
│   │   │   │   │   │   ├── Alert.vue    # Alert 组件源文件
│   │   │   │   │   ├── demos/       # Alert 组件的示例
│   │   │   │   │   │   ├── basic.vue
│   │   │   │   │   │   ├── with-icon.vue
│   │   │   │   │   │   └── index.ts     # 导出此目录下所有 demo 组件
│   │   │   │   │   ├── index.md     # Alert 组件的 Markdown 文档 (API, 用法说明)
│   │   │   │   │   └── types.ts     # Alert 组件的类型定义 (可选)
│   │   │   │   ├── Button/
│   │   │   │   │   ├── source/     # 源码文件夹
│   │   │   │   │   │   └── Button.vue
│   │   │   │   │   ├── demos/
│   │   │   │   │   │   └── basic.vue
│   │   │   │   │   └── index.md
│   │   │   │   └── ... (其他组件)
│   │   │   ├── index.ts             # 组件库入口，导出所有组件
│   │   │   └── theme/               # 全局主题、样式等
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── primitives/                  # 基础工具/原子组件 (如果需要)
│   └── unocss-preset/             # UnoCSS 预设
├── apps/                            # 应用/示例项目
│   ├── playground/                  # 组件开发预览环境 (Vite + Vue)
│   │   ├── src/
│   │   │   ├── App.vue
│   │   │   ├── main.ts
│   │   │   ├── pages/               # 动态加载 soy-ui 组件 demos 的页面
│   │   │   └── router.ts
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── official-site/ (原Nuxt 文档站)
│       ├── components/              # 文档站自身的组件
│       ├── layouts/
│       ├── pages/                   # Nuxt 页面，包括动态路由用于渲染组件文档
│       │   └── components/
│       │       └── [...slug].vue    # 捕获组件名并渲染对应文档和 demos
│       ├── nuxt.config.ts
│       └── package.json
├── scripts/                         # 构建、生成等脚本
├── package.json                     # Monorepo 根 package.json
├── tsconfig.json
└── DEVELOPMENT_GUIDE.md             # 本开发指南
└── NUXT_DOCS_SETUP_PLAN.md        # Nuxt 文档站搭建计划
```

**说明:**

*   **`packages/soy-ui`**: 这是核心组件库。
    *   每个组件 (如 `Alert`, `Button`) 都有自己的文件夹。
    *   `demos/` 文件夹存放该组件的 `.vue` 格式使用示例，并通过一个 `index.ts` 文件导出所有这些示例。
    *   `index.md` 是该组件的文档，用于描述 API、props、events、slots 以及如何使用。它可以直接引用或内嵌 `demos/` 中的示例。
*   **`apps/playground`**: 一个独立的 Vite/Vue3 应用。
    *   其主要目的是在开发 `soy-ui` 组件时，提供一个实时预览和调试的环境。
    *   它可以动态扫描 `packages/soy-ui/src/components/**/demos/index.ts` 文件，并提供一个界面来选择和展示这些 demos 模块中导出的所有组件。
    *   这将取代当前 `src/views/ui/index.vue` 和 `examples/` 目录的部分功能，使组件开发与主项目/其他示例项目解耦。
*   **`apps/official-site` (原 `docs_v2`)**: 基于 Nuxt 的官方文档站。
    *   它会读取 `packages/soy-ui/src/components/**/index.md` 作为 API 文档内容。
    *   它会解析并渲染 `packages/soy-ui/src/components/**/demos/*.vue` 作为交互式示例。

## 3. 开发新组件流程

1.  **创建组件目录**:
    在 `packages/soy-ui/src/components/` 下创建新的组件文件夹，例如 `MyNewComponent`。
2.  **编写组件源码**:
    在 `MyNewComponent/` 下创建 `MyNewComponent.vue` 文件，并实现组件逻辑。
3.  **编写示例 (Demos)**:
    在 `MyNewComponent/demos/` 目录下创建 `.vue` 示例文件，如：
    *   `basic.vue` (基础用法)
    *   `advanced-features.vue` (高级特性展示)
    每个 demo 都应该是一个可以独立运行和展示特定用法的 Vue 组件。
    同时，在该目录下创建一个 `index.ts` 文件，导出所有 `.vue` 示例。例如:
    ```typescript
    // MyNewComponent/demos/index.ts
    export { default as BasicDemo } from './basic.vue';
    export { default as AdvancedFeaturesDemo } from './advanced-features.vue';
    ```
4.  **编写组件文档**:
    在 `MyNewComponent/` 下创建 `index.md` 文件。内容应包括：
    *   组件简介和用途。
    *   Props, Events, Slots, Methods 的 API 表格和说明。
    *   通过特定语法嵌入或引用 `demos/` 中的示例，并配以说明。
    *   设计规范、最佳实践等。
5.  **导出组件**:
    在 `packages/soy-ui/src/index.ts` (或相应的入口文件) 中导出新组件。
6.  **在 Playground 中预览和调试**:
    *   启动 `apps/playground` 开发服务器。
    *   Playground 应能自动发现新的 `MyNewComponent` 及其 `demos/index.ts`。
    *   Playground 会加载 `index.ts` 模块，并展示其中导出的所有 demo 组件。
    *   通过 Playground 交互式地测试组件的各种状态和 props。
7.  **更新文档站 (可选，通常自动)**:
    *   启动 `apps/official-site` (Nuxt 文档站) 开发服务器。
    *   文档站应能自动发现并展示新组件的 `index.md` 和 demos。

## 4. 运行开发环境

*   **启动 Playground (用于组件开发)**:
    ```bash
    pnpm --filter ./apps/playground dev
    ```
    (假设 `apps/playground/package.json` 中定义了 `dev` 脚本)

*   **启动文档站 (用于预览最终文档)**:
    ```bash
    pnpm --filter ./apps/official-site dev
    ```
    (假设 `apps/official-site/package.json` 中定义了 `dev` 脚本)

## 5. 编写与组织 Demos

*   **原子性**: 每个 demo `.vue` 文件应专注于展示组件的一个特定功能或用例。
*   **简洁性**: Demo 代码应尽可能简洁明了，移除不相关的逻辑。
*   **可直接运行**: Demo 本身就是一个完整的 Vue 组件片段，可以直接在 Playground 或文档中渲染。
*   **命名清晰**: Demo 文件名应能清晰反映其展示的内容，如 `disabled-state.vue`, `custom-icon.vue`。导出到 `index.ts` 时也建议使用清晰的导出名 (如 `BasicDemo`, `CustomIconDemo`)。
*   **`index.ts` 聚合**: 每个组件的 `demos` 目录下应包含一个 `index.ts` 文件，该文件负责导出目录内所有的 `.vue` demo 组件。这使得 Playground 或其他工具可以方便地一次性导入所有相关的 demos。

## 6. 文档编写 (Markdown)

*   组件的 `index.md` 是其官方文档的核心。
*   **API 文档**: 清晰列出 Props, Events, Slots, Methods 等，并提供类型、默认值和描述。
*   **代码示例**: 使用 Markdown 的代码块语法展示简短的用法片段。
*   **嵌入 Demos**:
    文档站 (Nuxt) 需要实现一种机制，允许在 Markdown 中通过特定语法引用并渲染 `demos/` 目录下的 `.vue` 文件。例如：
    ```markdown
    ## 基础用法

    <Demo src="basic.vue" title="基础的 Alert 组件" />

    ## 带图标的 Alert

    <Demo src="with-icon.vue" description="可以配置不同的图标类型。" />
    ```
    这里的 `<Demo>` 是一个需要在 Nuxt 文档站中实现的自定义组件，它会加载并显示对应的 demo 文件，并可能提供查看源码、复制代码等功能。

## 7. 废弃 `examples/` 目录

当前的 `examples/` 目录的功能将被以下两者取代：

1.  **组件级 Demos**: 分散到 `packages/soy-ui/src/components/<ComponentName>/demos/` 中。
2.  **Playground 应用**: `apps/playground/` 提供集中的组件开发和预览环境。

如果 `examples/` 还承载了其他更复杂的集成示例或项目模板，可以考虑将其保留并重命名，或者将其内容迁移到 `apps/` 目录下作为单独的示例项目。

## 8. 总结

通过上述结构和流程调整，期望可以：

*   **降低维护成本**: 组件代码、示例和文档物理上更接近，修改和同步更容易。
*   **提升开发体验**: Playground 为组件开发提供即时反馈。
*   **改善文档质量**: Demos 直接来源于开发过程，保证了示例的准确性和实用性。
*   **清晰的职责分离**: `soy-ui` 聚焦于组件实现，`playground` 聚焦于开发预览，`official-site` 聚焦于最终用户文档。
