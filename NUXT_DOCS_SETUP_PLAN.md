# Nuxt.js Documentation Site Setup Plan for Soybean UI

This document outlines the steps and considerations for building the new documentation website for Soybean UI using Nuxt.js. The goal is to create a modern, performant, and maintainable documentation site, inspired by sites like Shadcn UI, while also incorporating multi-language support.

## Phase 1: Project Setup and Basic Structure

1.  **Initialize Nuxt Project:**
    *   Create a new Nuxt project within the `apps/official-site` directory (as defined in `DEVELOPMENT_GUIDE.md`).
    *   Command: `pnpm dlx nuxi@latest init apps/official-site`
    *   Choose appropriate settings (TypeScript, package manager pnpm).

2.  **Basic Layout and Pages:**
    *   Design a default layout (`layouts/default.vue`) including a header, sidebar (for navigation), and a main content area.
    *   Create an initial `pages/index.vue` for the homepage.
    *   Set up basic routing.

3.  **Integrate UnoCSS:**
    *   Add UnoCSS to the Nuxt project for styling, leveraging `@soybean-ui/unocss-preset` if possible or creating a compatible configuration.
    *   Ensure UnoCSS works correctly within Nuxt components and Markdown-generated content.

4.  **Directory Structure for Content:**
    *   Confirm the strategy for sourcing component documentation:
        *   Markdown files: `packages/soy-ui/src/components/<ComponentName>/index.md`
        *   Demo files: `packages/soy-ui/src/components/<ComponentName>/demos/*.vue`

## Phase 2: Content Rendering and Component Integration

1.  **Markdown Rendering:**
    *   Choose and configure a Nuxt module for Markdown rendering (e.g., `@nuxt/content`).
    *   Ensure it can parse frontmatter from `index.md` files for metadata (title, description, etc.).
    *   Style the rendered HTML output to match the design.

2.  **Dynamic Component Pages:**
    *   Create a dynamic route, e.g., `pages/components/[...slug].vue`.
    *   This page will fetch and render the `index.md` content for the corresponding component based on the slug.
    *   The slug should map to component names (e.g., `alert`, `button`).

3.  **Demo Rendering (`<Demo>` Component):**
    *   Develop a global Nuxt component (e.g., `<DemoViewer />` or similar name as `<Demo>` in `DEVELOPMENT_GUIDE.md`).
    *   This component will be used within Markdown files to embed live demos.
    *   It should dynamically load and render `.vue` demo files from `packages/soy-ui/src/components/<ComponentName>/demos/<demoName>.vue`.
    *   Features for `<DemoViewer />`:
        *   Display the rendered demo.
        *   Option to view the source code of the demo.
        *   Option to copy the source code.
        *   Potentially link to a playground environment (e.g., StackBlitz, CodeSandbox, or the local `apps/playground`).

4.  **Automatic Navigation/Sidebar Generation:**
    *   The sidebar should list all available components, grouped категоріями (if applicable).
    *   This list should be generated dynamically by scanning the `packages/soy-ui/src/components/` directory or from a configuration file.
    *   Clicking a component name should navigate to its documentation page.

## Phase 3: Enhancements and Features

1.  **Search Functionality:**
    *   Implement search across component documentation (API, descriptions).
    *   Consider using `@nuxt/content`'s built-in search or integrating a service like Algolia.

2.  **Multi-language Support (i18n):**
    *   Integrate `@nuxtjs/i18n` or a similar Nuxt i18n module.
    *   Plan the structure for translated Markdown content and demo descriptions.
        *   Option 1: `index.en.md`, `index.zh.md`
        *   Option 2: Subdirectories per locale, e.g., `en/index.md`, `zh/index.md`.
    *   Implement a language switcher UI element.
    *   Ensure demos and their textual descriptions can also be localized if necessary.

3.  **Theme Customization (Dark Mode, Primary Color):**
    *   Implement a theme switcher for dark/light mode, similar to the current setup.
    *   Allow users to preview components with different primary colors (if this is a feature of `soy-ui`). This might involve dynamic CSS variable changes.

4.  **SEO and Meta Tags:**
    *   Ensure proper meta tags (title, description) are generated for each page.
    *   Utilize Nuxt's head management features.

5.  **Shadcn UI Inspired Design:**
    *   Adopt a clean, modern aesthetic similar to `ui.shadcn.com`.
    *   Focus on typography, spacing, and overall user experience.
    *   The `<DemoViewer />` component should be a key focus for a polished look and feel.

## Phase 4: Build, Deployment, and Maintenance

1.  **Static Site Generation (SSG):**
    *   Configure Nuxt for full static site generation for optimal performance.
    *   Command: `pnpm --filter ./apps/official-site generate` (or similar, based on Nuxt version).

2.  **Deployment:**
    *   Choose a hosting platform (e.g., Vercel, Netlify, GitHub Pages).
    *   Set up CI/CD pipeline to automatically build and deploy the site on changes to the `main` branch or specific documentation-related branches/tags.

3.  **Maintenance Plan:**
    *   Document how to add new component documentation.
    *   Keep Nuxt and its dependencies updated.

## Key Technologies and Modules (Tentative)

*   **Framework:** Nuxt.js 3
*   **Styling:** UnoCSS (with `@soybean-ui/unocss-preset`)
*   **Content:** `@nuxt/content` (or alternative Markdown/Vue component rendering solution)
*   **i18n:** `@nuxtjs/i18n`
*   **State Management (if needed):** Pinia (comes with Nuxt 3)
*   **UI Components (for the docs site itself):** Potentially use `soy-ui` components if stable, or build simple ones.

## Open Questions / Decisions to be Made

*   Exact mechanism for the `<Demo>` component to resolve and load `.vue` demo files from a different package (`packages/soy-ui`) within the Nuxt app (`apps/official-site`). This might involve Vite/Nuxt configuration for aliasing or custom loaders/plugins.
*   Strategy for managing API tables in Markdown (manual, or generated from JSDoc/TSDoc comments).
*   Specific UI design details and component choices for the documentation site itself.

This plan will be updated as the project progresses.
