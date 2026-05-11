# Introduction

SoybeanUI is an elegant, modern, accessible, and high-quality UI component library designed for Vue 3. With a shadcn-like design style and a powerful Headless foundation, it provides a comprehensive set of accessible, customizable, and high-performance components to help developers build modern web applications quickly.

## Why SoybeanUI?

### 🎨 Elegant design

SoybeanUI adopts a modern design language with polished visuals and smooth interactions. Every component is carefully crafted to deliver an excellent user experience across different scenarios.

### ♿ Accessibility first

All components strictly follow WAI-ARIA design patterns, ensuring they are easy to use for everyone, including users with disabilities. Accessibility features such as keyboard navigation, screen reader support, and focus management are built in—no extra configuration required.

### 🏗️ Flexible architecture

SoybeanUI uses a Headless architecture that fully separates logic from presentation. This means you can:

- **Use pre-styled components**: use `@soybeanjs/ui` out of the box
- **Bring your own styles**: use `@soybeanjs/headless` to build your own design system
- **Mix and match**: use both approaches in the same project

### 🎯 Type safety

Built entirely with TypeScript, SoybeanUI provides complete type definitions and smart IntelliSense to make development more efficient and reliable.

### 🎨 Highly customizable

Built on UnoCSS and `tailwind-variants`, SoybeanUI supports flexible theming. You can easily adjust colors, sizes, border radius, and more to match your brand.

### 📦 Lightweight

All components support tree-shaking, so you only bundle what you actually use—keeping your final build as small as possible.

## Architecture

SoybeanUI is built on a strict **two-layer separation** model:

```
┌─────────────────────────────────────────┐
│           @soybeanjs/ui (src/)          │
│  S-prefixed components   (SButton…)     │
│  UnoCSS classes · tailwind-variants     │
│  provideXUi(ui)  ──────────────────┐    │
└────────────────────────────────────┼────┘
                                     │ style injection
┌────────────────────────────────────▼────┐
│        @soybeanjs/headless (headless/)  │
│  Logic · State · A11y · Keyboard nav    │
│  useUiContext() reads injected classes  │
│  Zero styles — works with any CSS       │
└─────────────────────────────────────────┘
```

**Data flow is strictly one-way**: `headless` → `src`. The styled layer never imports from headless's internals — it injects style tokens via `provideXUi(computedUi)` which headless components read through `useUiContext()`.

### @soybeanjs/headless - Logic layer

This is the core foundation of SoybeanUI, responsible for handling all component logic:

- **State management**: complete internal state management
- **Accessibility (A11y)**: full WAI-ARIA support
- **Keyboard interactions**: comprehensive keyboard navigation
- **Focus management**: intelligent focus trapping and restoration
- **Event handling**: a unified event handling mechanism
- **Compact aggregators**: ready-to-use aggregated components for data-driven scenarios

Headless components contain no styles at all, giving you maximum freedom to build your own design system. If you want full control over the look and feel—or need a unique design system—`@soybeanjs/headless` is the best choice.

### @soybeanjs/ui - Presentation layer

This is the styled component library built on top of Headless:

- **Beautiful styling**: modern styles built with UnoCSS and `tailwind-variants`
- **Ready to use**: works out of the box with minimal setup
- **Theme support**: built-in theme presets, including light/dark mode
- **Responsive design**: optimized for different screen sizes
- **Flexible customization**: override any slot's style classes via the `ui` prop

If you want to get started quickly or prefer SoybeanUI's default look, `@soybeanjs/ui` is the recommended choice.

### Component Patterns

SoybeanUI supports three component patterns:

#### 1. Multi-slot Base Components

For complex components that need fine-grained control over each part (like Accordion, Dialog, Card):

- Headless exposes multiple primitive components (Root, Trigger, Content, etc.)
- Uses `UiSlot` + `UiClass` to define style slots
- UI layer injects styles via `provide{Name}Ui(ui)`

#### 2. Compact Aggregators

For data-driven scenarios with stable structures (like lists, tables, form groups):

- Headless handles data iteration, default content, and structure composition
- Exposes `{Name}Compact` component with corresponding Props/Emits/Slots types
- UI wrapper focuses on style variants and prop/slot forwarding
- Examples: `AccordionCompact`, `TableCompact`, `CheckboxGroupCompact`

When you have a stable data list to render, Compact components let you accomplish the task with more concise code.

#### 3. Single-class Components

For simple atomic components (like Button, Link, Badge):

- No UiContext
- UI layer directly uses `cn(variants(...), props.class)` to merge styles

## Key features

### ✨ Rich component ecosystem

SoybeanUI provides more than 80 high-quality components covering most common web application scenarios:

- **Basic**: Button, Input, Card, Badge, etc.
- **Forms**: Form, Select, Checkbox, RadioGroup, Switch, etc.
- **Feedback**: Alert, Dialog, Toast, Tooltip, etc.
- **Navigation**: Menu, Tabs, Breadcrumb, Pagination, etc.
- **Data display**: Table, Tree, List, Avatar, etc.
- **Layout**: Layout, Separator, AspectRatio, etc.

### 🎨 Theme system

SoybeanUI includes a powerful theme system that supports:

- **8 semantic colors**: `primary` · `destructive` · `success` · `warning` · `info` · `carbon` · `secondary` · `accent`
- **6 sizes**: `xs` · `sm` · `md` · `lg` · `xl` · `2xl` (base `md` = 16px)
- **Multiple variants**: `solid`, `outline`, `ghost`, `link`, `plain`, `dashed`, `soft`, `raw`
- **Dark mode**: full dark theme support
- **ConfigProvider**: unified configuration for `dir`, `locale`, `nonce`, and global tooltip options
- **cn() utility**: Tailwind-aware class merge (`clsx` + `tailwind-merge`) for conflict-free composition

### 🚀 Performance

- **Tree-shaking**: bundle only what you use
- **On-demand imports**: supports importing components as needed
- **Virtual scrolling**: optimized for large data sets
- **Lazy loading**: lazy-load images and content when appropriate

### 🔧 Developer experience

- **TypeScript**: complete type definitions
- **Auto import**: supports auto-import with `unplugin-vue-components`
- **Nuxt module**: official Nuxt module support
- **Detailed docs**: each component includes comprehensive docs and examples

## Use cases

SoybeanUI works well for many types of Vue 3 projects:

- **Enterprise apps**: complete ecosystem with strong accessibility
- **Admin dashboards**: rich form and data display components
- **Content sites**: elegant display components and layout system
- **Mobile-friendly apps**: responsive design for various screen sizes
- **Design systems**: Headless architecture for building custom systems

## Tech stack

SoybeanUI is built with:

- **Vue 3**: Composition API and `<script setup>`
- **TypeScript**: full type support
- **UnoCSS**: atomic CSS engine
- **tailwind-variants**: variants management

## Getting started

If you’re ready to start using SoybeanUI, check out the [Quick Start](./quick-start) guide to learn how to install and configure it.

If you want to learn more about specific components, browse the [Component docs](/components/button) for detailed APIs and examples.

## Community & support

- **GitHub**: [soybeanjs/soybean-ui](https://github.com/soybeanjs/soybean-ui)
- **Issues**: feel free to report problems via GitHub Issues
- **Feature requests**: pull requests are welcome

Let’s build a better Vue 3 UI component library together!
