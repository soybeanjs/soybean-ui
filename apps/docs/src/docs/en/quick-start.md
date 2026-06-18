# Quick Start

SoybeanUI offers two ways to integrate components into your project. This guide covers both paths — choose the one that fits your workflow.

> **Which should I choose?** Use the **npm package** for quick integration with automatic updates. Use the **CLI (sbean)** when you want full control over source code — edit any file, customize anything. See the [Installation](/overview/installation) guide for a detailed comparison.

## Requirements

Before you start, make sure your project meets the following requirements:

- **Node.js** >= 16.0.0
- **Vue** >= 3.3.0
- **Package manager**: pnpm (recommended), npm, or yarn

## Path A: CLI · Copy-Paste (shadcn-style)

Prefer owning your component source code? Use `sbean` to copy components directly into your project.

### 1. Initialize your project

```bash
npx sbean init
```

This creates an `sbean.json` config and sets up UnoCSS. Follow the interactive prompts to choose your colors, font, icon library, and more.

### 2. Add components

```bash
npx sbean add button
npx sbean add dialog select
```

Components are copied to `src/ui/components/` — they're now part of your project. Import them using the `#ui` alias:

```vue
<script setup lang="ts">
import SButton from '#ui/components/button';
</script>

<template>
  <SButton>Click me</SButton>
</template>
```

### 3. Update components

```bash
# See what changed upstream
npx sbean diff button

# Update to the latest version
npx sbean add button --overwrite
```

See the [CLI documentation](/sbean) for all available commands, configuration options, and project structure details.

## Path B: npm Package

If you prefer a traditional dependency workflow, install `@soybeanjs/ui`:

```bash
# pnpm (recommended)
pnpm add @soybeanjs/ui

# or npm
npm install @soybeanjs/ui

# or yarn
yarn add @soybeanjs/ui
```

If you want to build your own design system, install `@soybeanjs/headless`:

```bash
pnpm add @soybeanjs/headless
```

## Path B (continued): Basic setup

### Import styles

If you use `@soybeanjs/ui`, import the stylesheet in your project entry file:

```ts
// main.ts or main.js
import '@soybeanjs/ui/styles.css';
```

## Usage

### Option 1: Auto import (recommended)

Use `unplugin-vue-components` to auto-import components—no manual imports needed.

#### Install dependencies

```bash
pnpm add -D unplugin-vue-components
```

#### Configure Vite

In `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { UiResolver } from '@soybeanjs/ui/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [UiResolver()]
    })
  ]
});
```

#### Use components

After configuration, you can use SoybeanUI components in any Vue component without importing them manually:

```vue
<template>
  <SButton>Click me</SButton>
  <SInput placeholder="Enter text" />
  <SCard>
    <p>This is a card.</p>
  </SCard>
</template>
```

### Option 2: Manual import

You can also import the components you need manually:

```vue
<script setup>
import { SButton, SInput, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SButton>Click me</SButton>
  <SInput placeholder="Enter text" />
  <SCard>
    <p>This is a card.</p>
  </SCard>
</template>
```

## Nuxt integration

If you use Nuxt 3, you can use the official Nuxt module for simpler configuration.

### Install

```bash
pnpm add @soybeanjs/ui
```

### Configure

Add the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/ui/nuxt']
});
```

After that, you can use all SoybeanUI components in your Nuxt project without additional configuration.

## Using Headless components

If you choose `@soybeanjs/headless`, you'll need to write your own styles. Headless components offer two usage patterns:

### Option 1: Using Base Components (Fine-grained Control)

For scenarios that need complete control over structure and styling:

```vue
<script setup>
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '@soybeanjs/headless';
</script>

<template>
  <AccordionRoot>
    <AccordionItem value="item-1">
      <AccordionTrigger>Title</AccordionTrigger>
      <AccordionContent>This is the content area. You can put anything here.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Another title</AccordionTrigger>
      <AccordionContent>Another content area.</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style scoped>
/* Add your custom styles here */
</style>
```

### Option 2: Using Compact Components (Data-driven)

For stable structures with data-driven scenarios, offering more concise code:

```vue
<script setup>
import { AccordionCompact } from '@soybeanjs/headless';

const items = [
  {
    value: 'item-1',
    title: 'Title',
    description: 'This is the content area. You can put anything here.'
  },
  {
    value: 'item-2',
    title: 'Another title',
    description: 'Another content area.'
  }
];
</script>

<template>
  <AccordionCompact :items="items" />
</template>

<style scoped>
/* Add your custom styles here */
</style>
```

> Compact components are managed by the headless layer for data iteration and default content rendering, letting you accomplish common tasks with less code.

## Theme configuration

SoybeanUI supports flexible theming. You can configure the global theme using the `ConfigProvider` component:

```vue
<script setup>
import { SConfigProvider } from '@soybeanjs/ui';

const themeConfig = {
  theme: {
    base: 'gray',
    primary: 'indigo',
    feedback: 'classic',
    radius: '0.625rem'
  },
  size: 'md'
};
</script>

<template>
  <SConfigProvider :theme="themeConfig">
    <YourApp />
  </SConfigProvider>
</template>
```

## RTL configuration

SoybeanUI components support direction switching through `SConfigProvider`. Set `dir="rtl"` at the app root when your product needs right-to-left layouts:

```vue
<template>
  <SConfigProvider dir="rtl">
    <YourApp />
  </SConfigProvider>
</template>
```

For component-level details and configuration boundaries, see the [ConfigProvider documentation](/components/config-provider).

## First example

Let’s create a simple example to verify your installation:

```vue
<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold">SoybeanUI Example</h1>

    <SButton color="primary" @click="handleClick">Click</SButton>

    <SInput v-model="inputValue" placeholder="Enter text" class="w-64" />

    <SCard>
      <template #header>
        <h3>Card title</h3>
      </template>
      <p>This is the card content area.</p>
      <template #footer>
        <SButton size="small">Action</SButton>
      </template>
    </SCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');

function handleClick() {
  alert('Button clicked!');
}
</script>
```

## FAQ

### Styles are not applied?

1. Make sure you imported the stylesheet: `import '@soybeanjs/ui/styles.css'`
2. Check the browser console for errors

### TypeScript type errors?

1. Make sure you installed the latest version of `@soybeanjs/ui`
2. Check the type-related configuration in `tsconfig.json`
3. Restart the TypeScript server

### Components are not auto-imported?

1. Make sure `unplugin-vue-components` is configured correctly
2. Verify your `vite.config.ts` configuration
3. Restart the dev server

### Issues when using with Nuxt?

1. Make sure you are using Nuxt 3
2. Verify the module configuration in `nuxt.config.ts`
3. Clear the `.nuxt` cache directory and restart

## Next steps

Now that you’ve installed SoybeanUI, you can:

1. Browse the [Component docs](/components) to see all available components
2. Read the [Theme configuration](../theme) docs to customize theming
3. Check the [Best practices](../best-practices) guide for recommendations
4. Visit [GitHub](https://github.com/soybeanjs/soybean-ui) for source code and examples

Enjoy! If you run into any issues, feel free to open an issue on GitHub.
