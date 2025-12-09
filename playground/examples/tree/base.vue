<script setup lang="ts">
import { SIcon, STree, STreeItem } from '@soybeanjs/ui';
import type { TreeItemData } from '@soybeanjs/ui';

type DemoTree = TreeItemData<{
  value: string;
  title: string;
  icon: string;
}>;

const items: DemoTree[] = [
  {
    value: 'composables',
    title: 'composables',
    icon: 'lucide:folder',
    children: [
      { value: 'auth', title: 'use-auth.ts', icon: 'vscode-icons:file-type-typescript' },
      { value: 'user', title: 'use-user.ts', icon: 'vscode-icons:file-type-typescript' }
    ]
  },
  {
    value: 'components',
    title: 'components',
    icon: 'lucide:folder',
    children: [
      {
        value: 'home',
        title: 'home',
        icon: 'lucide:folder',
        children: [
          { value: 'card', title: 'card.vue', icon: 'vscode-icons:file-type-vue' },
          { value: 'button', title: 'button.vue', icon: 'vscode-icons:file-type-vue' }
        ]
      }
    ]
  },
  { value: 'app', title: 'app.vue', icon: 'vscode-icons:file-type-vue' },
  { value: 'nuxt', title: 'nuxt.config.ts', icon: 'vscode-icons:file-type-nuxt' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <STree
      class="list-none select-none w-56 bg-white text-stone-700 rounded-lg border shadow-sm p-2 text-sm font-medium"
      :items="items"
      :default-expanded="['components']"
    >
      <template #top>
        <h2 class="font-semibold text-sm text-stone-400 px-2 pt-1 pb-3">Directory Structure</h2>
      </template>
      <template #item="{ item }">
        <STreeItem
          v-slot="{ isExpanded }"
          :style="{ 'padding-left': `${item.level - 0.5}rem` }"
          :value="item.value"
          :level="item.level"
          class="flex items-center py-1 px-2 my-0.5 rounded outline-none focus:ring-primary/50 focus:ring-2 data-[selected]:bg-primary/15"
        >
          <template v-if="item.hasChildren">
            <SIcon v-if="!isExpanded" icon="lucide:folder" />
            <SIcon v-else icon="lucide:folder-open" />
          </template>
          <SIcon v-else :icon="item.data.icon || 'lucide:file'" />
          <div class="pl-2">
            {{ item.data.title }}
          </div>
        </STreeItem>
      </template>
    </STree>
  </div>
</template>
