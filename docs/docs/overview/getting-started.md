# Getting Start

A quick tutorial to get you up and running with soy-ui.

## Installation

### Install dependencies

```bash
pnpm add soy-ui
```

### Install unocss

```bash
pnpm add -D unocss @soybean-ui/unocss-preset
```

## Config

### Config Vite


```ts
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    unocss()
  ]
});
```

### Config UnoCSS

- Create `uno.config.ts` file

```ts
import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from '@unocss/preset-uno';
import { presetSoybeanUI } from '@soybean-ui/unocss-preset';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [/\.vue($|\?)/, /.*\/soy-ui.*\.js/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetSoybeanUI()]
});

```

- import `uno.css` in `main.ts`

```ts
import 'uno.css';
```

## Usage

```vue
<script setup lang="ts">
import { SButton } from 'soy-ui';
</script>

<template>
  <SButton>Click me</SButton>
</template>
```

## Used by `unplugin-vue-components`

### Install `unplugin-vue-components`

```bash
pnpm add -D unplugin-vue-components
```

### Add `SoybeanUIResolver`

- Add `SoybeanUIResolver` in `vite.config.ts`

```ts
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import SoybeanUIResolver from 'soy-ui/resolver';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    unocss(),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [SoybeanUIResolver()]
    })
  ]
});
```