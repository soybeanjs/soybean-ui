<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useToggle } from '@vueuse/core';
import { SButtonIcon, SCard, SSelect, STreeMenu } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';
import { themeSizeMap } from '@/theme';
import { themeSizeOptions } from '../../constants/theme';
import { treeMenuItems } from './data';

const [collapsed, toggleCollapsible] = useToggle(false);

const size = shallowRef<ThemeSize>('md');

const BASE_WIDTH = 240;

const menuWidth = computed(() => `${(BASE_WIDTH * themeSizeMap[size.value]) / themeSizeMap.md / 16}rem`);
</script>

<template>
  <SCard title="Tree Menu">
    <template #extra>
      <SSelect v-model="size" :items="themeSizeOptions" :ui="{ trigger: 'w-25' }" />
    </template>
    <div class="relative h-120" :style="{ width: menuWidth }">
      <SButtonIcon
        icon="lucide:panel-left"
        :size="size"
        class="absolute right-2 top-2 z-2"
        @click="() => toggleCollapsible()"
      />
      <STreeMenu
        v-model:collapsed="collapsed"
        :size="size"
        toggle-behavior="single"
        :items="treeMenuItems"
        class="bg-sidebar-background"
      />
    </div>
  </SCard>
</template>
