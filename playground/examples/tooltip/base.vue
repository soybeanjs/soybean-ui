<script setup lang="ts">
import { SButton, STooltip } from '@soybeanjs/ui';
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
  <div>
    <div class="flex flex-wrap gap-3">
      <STooltip v-for="placement in placements" :key="placement" :placement="placement">
        <template #trigger>
          <SButton variant="pure">{{ placement }}</SButton>
        </template>
        <p>Tooltip content</p>
      </STooltip>
    </div>
  </div>
</template>
