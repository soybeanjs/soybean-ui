<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButtonIcon, SSelect, SSplitNav } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../../constants/theme';
import { splitNavItems } from './data';

const active = shallowRef('soybean-ui');
const collapsed = shallowRef(false);
const size = shallowRef<ThemeSize>('md');

function handleToggleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div class="flex justify-end">
    <SSelect v-model="size" :items="themeSizeOptions" :ui="{ trigger: 'w-25' }" />
  </div>
  <div class="relative h-110 w-fit">
    <SButtonIcon
      icon="lucide:panel-left"
      :size="size"
      aria-label="Toggle tree pane"
      class="absolute end-2 top-2 z-2"
      @click="handleToggleCollapsed"
    />
    <SSplitNav
      v-model="active"
      v-model:collapsed="collapsed"
      :size="size"
      mode="dual-vertical"
      :items="splitNavItems"
      class="bg-sidebar border rounded-md"
    />
  </div>
</template>
