<script setup lang="ts">
import { SButton, SPopover } from '@soybeanjs/ui';
import type { Placement } from '@soybeanjs/ui';

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
      <SPopover v-for="placement in placements" :key="placement" :placement="placement">
        <template #trigger>
          <SButton variant="pure">{{ placement }}</SButton>
        </template>
        <p>Popover content</p>
      </SPopover>
    </div>
  </div>
</template>
