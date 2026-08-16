# Quick Start

## Auto-registration (optional)

With `unplugin-vue-components`, components are auto-registered from `@soybeanjs/admin`:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AdminResolver } from '@soybeanjs/admin/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [AdminResolver()] })
  ]
});
```

For Nuxt, register the module instead:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/admin/nuxt']
});
```

## Compose a shell

`SAppLayout` reserves the regions; you compose the navigation and page chrome into them:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SAppLayout, SAppLogo, SAppMenu, SAppBreadcrumb, SAppFooter } from '@soybeanjs/admin';
import type { AppMenuData } from '@soybeanjs/admin';

const open = ref(true);
const selectedKey = ref('dashboard');

const menus: AppMenuData[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  {
    key: 'system',
    label: 'System',
    icon: 'lucide:settings',
    children: [
      { key: 'users', label: 'Users', icon: 'lucide:users' },
      { key: 'roles', label: 'Roles', icon: 'lucide:shield' }
    ]
  }
];
</script>

<template>
  <SAppLayout v-model:open="open">
    <template #sidebar>
      <div class="flex h-full flex-col">
        <SAppLogo title="Admin" logo="lucide:command" inverted />
        <div id="app-sider-menu" class="min-h-0 flex-1" />
      </div>
    </template>

    <SAppMenu :data="menus" :selected-key="selectedKey" @select="selectedKey = $event" />

    <div class="p-4">
      <SAppBreadcrumb :items="[{ label: 'Home', value: 'home' }]" />
      <h1 class="mt-4 text-lg font-semibold">Content</h1>
    </div>

    <template #footer>
      <SAppFooter text="Powered by @soybeanjs/admin" show-copyright />
    </template>
  </SAppLayout>
</template>
```

> The default mount-point ids are `app-sider-menu` / `app-header-menu` — place matching `<div :id="...">` containers in the `sidebar` / `header` slots so `SAppMenu` can teleport into them.
