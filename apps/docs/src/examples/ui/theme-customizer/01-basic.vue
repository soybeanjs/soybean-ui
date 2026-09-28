<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { mobileViewportQuery } from '@soybeanjs/headless/shared';
import { SButtonIcon, SPopover, SThemeCustomizer } from '@soybeanjs/ui';

const isMobile = useMediaQuery(mobileViewportQuery);
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-start'">
    <template #trigger>
      <SButtonIcon icon="lucide:settings-2" size="lg" />
    </template>
    <SThemeCustomizer />
  </SPopover>
</template>
