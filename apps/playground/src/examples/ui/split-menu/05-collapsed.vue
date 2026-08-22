<script setup lang="ts">
import { ref } from 'vue';
import { useToggle } from '@vueuse/core';
import { SButton, SSplitMenu } from '@soybeanjs/ui';
import { splitMenuItems } from './data';

const active = ref('');
const [siderCollapsed, toggleSider] = useToggle(false);
</script>

<template>
  <div class="flex flex-col gap-4">
    <SButton @click="toggleSider()">{{ siderCollapsed ? 'Expand' : 'Collapse' }} Level-1 Panel</SButton>
    <div class="h-110">
      <SSplitMenu
        v-model="active"
        v-model:collapsed="siderCollapsed"
        mode="dual-vertical"
        :items="splitMenuItems"
        class="bg-sidebar border rounded-md"
      />
    </div>
  </div>
</template>
