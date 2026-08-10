<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { SButtonIcon, SPopover, SThemeCustomizer } from '@soybeanjs/ui';

const isMobile = useMediaQuery('(max-width: 768px)');
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:settings-2" size="lg" />
    </template>
    <div class="max-h-[70vh] w-150 overflow-auto p-1">
      <SThemeCustomizer />
    </div>
  </SPopover>
</template>
