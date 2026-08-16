<script setup lang="ts">
import { ref } from 'vue';
import { SAppMenu } from '@soybeanjs/admin';
import type { AppMenuData } from '@soybeanjs/admin';

const menus: AppMenuData[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  {
    key: 'system',
    label: 'System',
    icon: 'lucide:settings',
    badge: '3',
    children: [
      { key: 'users', label: 'Users', icon: 'lucide:users' },
      { key: 'roles', label: 'Roles', icon: 'lucide:shield' },
      {
        key: 'menus',
        label: 'Menus',
        icon: 'lucide:list-tree',
        children: [
          { key: 'menus-overview', label: 'Overview', icon: 'lucide:eye' },
          { key: 'menus-config', label: 'Config', icon: 'lucide:sliders-horizontal' }
        ]
      }
    ]
  },
  { key: 'docs', label: 'Docs', icon: 'lucide:files' }
];

const selectedKey = ref<string | undefined>('users');
const collapsed = ref(false);
</script>

<template>
  <div class="flex h-80 w-64 flex-col overflow-hidden rounded-md border border-solid border-border">
    <SAppMenu
      :data="menus"
      :selected-key="selectedKey"
      :sider-collapse="collapsed"
      @select="selectedKey = $event"
      @update:selected-key="selectedKey = $event"
      @update:sider-collapse="collapsed = $event"
    />
  </div>
</template>
