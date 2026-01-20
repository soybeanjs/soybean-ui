# Quick Start

This guide helps you integrate SoybeanUI into your project quickly so you can start using the components in just a few minutes.

## Requirements

Before you start, make sure your project meets the following requirements:

- **Node.js** >= 16.0.0
- **Vue** >= 3.3.0
- **Package manager**: pnpm (recommended), npm, or yarn

## Installation

### Use the styled UI library (recommended)

If you want to use beautifully styled components out of the box, install `@soybeanjs/ui`:

```bash
# pnpm (recommended)
pnpm add @soybeanjs/ui

# or npm
npm install @soybeanjs/ui

# or yarn
yarn add @soybeanjs/ui
```

### Use the Headless library

If you want to build your own design system, install `@soybeanjs/headless`:

```bash
pnpm add @soybeanjs/headless
```

## Basic setup

### 1. Import styles

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

If you choose `@soybeanjs/headless`, you’ll need to write your own styles. Here is a simple example:

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
