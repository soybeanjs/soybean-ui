<script setup lang="ts">
import { ref } from 'vue';
import { SIcon, SSplitNav } from '@soybeanjs/ui';
import { splitNavItems } from './data';

const active = ref('soybean-ui');
</script>

<template>
  <div class="h-110">
    <SSplitNav v-model="active" mode="dual-vertical" :items="splitNavItems" class="bg-sidebar border rounded-md">
      <template #first-level-item="{ item }">
        <SIcon :icon="item.icon ?? 'lucide:circle'" />
        <span class="font-medium">{{ item.label }}</span>
      </template>
      <template #item-leading="{ item }">
        <SIcon :icon="item.icon ?? 'lucide:circle'" />
      </template>
      <template #item="{ item }">
        <span class="font-medium">{{ item.label }}</span>
      </template>
    </SSplitNav>
  </div>
</template>
