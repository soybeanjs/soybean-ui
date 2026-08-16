<script setup lang="ts">
import { shallowRef } from 'vue';
import { useToggle } from '@vueuse/core';
import { SSelect, STreeMenu } from '@soybeanjs/ui';
import type { TreeMenuExpandStrategy } from '@soybeanjs/ui';
import { treeMenuItems } from './data';

const [collapsed, toggleCollapsible] = useToggle(false);
const expandStrategy = shallowRef<TreeMenuExpandStrategy>('active');
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="w-40">
      <SSelect
        v-model="expandStrategy"
        :items="[
          { label: 'keep', value: 'keep' },
          { label: 'active', value: 'active' }
        ]"
        :ui="{ trigger: 'w-32' }"
      />
    </div>
    <div class="relative w-56 h-120">
      <SButtonIcon icon="lucide:panel-left" class="absolute end-2 top-2 z-2" @click="() => toggleCollapsible()" />
      <STreeMenu
        v-model:collapsed="collapsed"
        :expand-strategy="expandStrategy"
        default-value="deepseek-coder"
        :items="treeMenuItems"
        class="bg-sidebar border rounded-md"
      />
    </div>
  </div>
</template>
