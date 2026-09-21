<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { SButtonIcon, SPopover, SThemeCustomizer } from '@vean/ui';

const isMobile = useMediaQuery('(max-width: 768px)');
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-start'">
    <template #trigger>
      <SButtonIcon icon="lucide:settings-2" size="lg" />
    </template>
    <SThemeCustomizer />
  </SPopover>
</template>
