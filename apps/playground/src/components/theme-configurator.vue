<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { SButtonIcon, SPopover, SThemeCustomizer } from '@soybeanjs/ui';

const isMobile = useMediaQuery('(max-width: 768px)');
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <SThemeCustomizer />
  </SPopover>
</template>
