<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import type { TabsOptionData } from '@soybeanjs/ui';

const isMobile = useMediaQuery('(max-width: 768px)');

const tabs = [
  {
    label: 'Generate Theme',
    value: 'generate-theme'
  },
  {
    label: 'Edit Variables',
    value: 'edit-variables'
  }
] as const satisfies TabsOptionData[];
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <div>
      <h3>Theme Generator</h3>
      <STabs :items="tabs">
        <template #content="{ value }">
          <div v-if="value === 'generate-theme'">Generate Theme</div>
          <div v-else>Edit Variables</div>
        </template>
      </STabs>
    </div>
  </SPopover>
</template>
