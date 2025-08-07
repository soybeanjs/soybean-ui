<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDropdownMenuRadio } from '@ui';
import type { MenuRadioOptionData } from '@ui';

const placement = ref('top-start');

const placements: MenuRadioOptionData<string>[] = [
  { isGroupLabel: true, value: 'tooltipPlacement', label: 'Tooltip Placement', separator: true },
  { value: 'top-start', label: 'Top Start' },
  { value: 'top', label: 'Top' },
  { value: 'top-end', label: 'Top End' },
  { value: 'right-start', label: 'Right Start' },
  { value: 'right', label: 'Right' },
  { value: 'right-end', label: 'Right End' },
  { value: 'bottom-start', label: 'Bottom Start' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-end', label: 'Bottom End' },
  { value: 'left-start', label: 'Left Start' },
  { value: 'left', label: 'Left' },
  { value: 'left-end', label: 'Left End' }
];
</script>

<template>
  <SCard title="Radio">
    <SDropdownMenuRadio v-model="placement" :items="placements">
      <template #trigger>
        <SButton variant="pure">Radio</SButton>
      </template>
    </SDropdownMenuRadio>
  </SCard>
</template>
