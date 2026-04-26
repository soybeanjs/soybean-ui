<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';

const items = [
  { label: 'Default', props: {} },
  { label: 'Flat', props: { raised: false } }
] as const;
</script>

<template>
  <div>
    <h3 class="playground-title">Raised</h3>
    <div class="flex flex-wrap gap-4">
      <div v-for="item in items" :key="item.label" class="flex items-center gap-3">
        <span class="text-sm text-muted-foreground">{{ item.label }}</span>
        <SKbd v-bind="item.props" value="command" />
        <SKbd v-bind="item.props" :value="['shift', 'K']" />
      </div>
    </div>
  </div>
</template>
