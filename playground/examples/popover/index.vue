<script setup lang="ts">
import { SButton, SCard, SPopover } from '@ui';
import type { Placement } from '@ui';

defineOptions({
  name: 'DemoPopover'
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
  <SCard title="Popover" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Popover Position" split :ui="{ content: 'flex flex-wrap gap-3' }">
      <SPopover v-for="placement in placements" :key="placement" :placement="placement">
        <template #trigger>
          <SButton variant="pure">{{ placement }}</SButton>
        </template>
        <p>Popover content</p>
      </SPopover>
    </SCard>
  </SCard>
</template>
