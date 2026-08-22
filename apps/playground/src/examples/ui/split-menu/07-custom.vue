<script setup lang="ts">
import { ref } from 'vue';
import { SIcon, SSplitMenu } from '@soybeanjs/ui';
import { splitMenuItems } from './data';

const active = ref('soybean-ui');
</script>

<template>
  <div class="h-110">
    <SSplitMenu v-model="active" mode="dual-vertical" :items="splitMenuItems" class="bg-sidebar border rounded-md">
      <template #item-leading="{ item }">
        <SIcon :icon="item.icon ?? 'lucide:circle'" />
      </template>
      <template #item="{ item }">
        <span class="font-medium">{{ item.label }}</span>
      </template>
      <template #item-trailing>
        <SIcon icon="lucide:chevron-right" class="text-muted-foreground" />
      </template>
    </SSplitMenu>
  </div>
</template>
