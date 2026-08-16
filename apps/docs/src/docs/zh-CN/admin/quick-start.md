# 快速开始

## 自动注册（可选）

使用 `unplugin-vue-components` 可从 `@soybeanjs/admin` 自动注册组件：

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

Nuxt 场景改用模块注册：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/admin/nuxt']
});
```

## 组合应用壳

`SAppLayout` 只预留区域，导航与页面骨架由你组合进去：

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

> 默认挂载点 id 为 `app-sider-menu` / `app-header-menu` —— 在 `sidebar` / `header` 插槽中放置对应的 `<div :id="...">` 容器，`SAppMenu` 即可 teleport 进去。
