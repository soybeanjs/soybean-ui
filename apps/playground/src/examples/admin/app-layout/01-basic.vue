<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { SAppLayout, SAppLogo, SAppMenu } from '@soybeanjs/admin';
import type { AppLayoutMode, AppMenuData } from '@soybeanjs/admin';

const mode = shallowRef<AppLayoutMode>('vertical');
const open = ref(true);
const selectedKey = ref<string | undefined>('dashboard');

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
  <div class="h-96 w-full overflow-hidden rounded-md border border-solid border-border">
    <SAppLayout v-model:open="open" :mode="mode">
      <template #sidebar>
        <div class="flex h-full flex-col">
          <SAppLogo title="Admin" logo="lucide:command" inverted />
          <div id="app-sider-menu" class="min-h-0 flex-1" />
        </div>
      </template>

      <SAppMenu
        :data="menus"
        :selected-key="selectedKey"
        @select="selectedKey = $event"
        @update:selected-key="selectedKey = $event"
      />

      <div class="p-4">
        <p class="font-medium">Content</p>
        <p class="mt-2 text-sm text-muted-foreground">
          Toggle the sidebar via the header icon. Switch `mode` for different navigation layouts.
        </p>
      </div>
    </SAppLayout>
  </div>
</template>
