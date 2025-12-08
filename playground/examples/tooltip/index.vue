<script setup lang="ts">
import { SButton, SCard, STooltip } from '@soybeanjs/ui';
import type { Placement } from '@soybeanjs/ui';

defineOptions({
  name: 'DemoTooltip'
});

const placements: Placement[] = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end'
];
</script>

<template>
  <SCard title="Tooltip" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Tooltip Position" split :ui="{ content: 'flex flex-wrap gap-3' }">
      <STooltip v-for="placement in placements" :key="placement" :content-props="{ placement }">
        <template #trigger>
          <SButton variant="pure">{{ placement }}</SButton>
        </template>
        <p>Tooltip content</p>
      </STooltip>
    </SCard>
  </SCard>
</template>
