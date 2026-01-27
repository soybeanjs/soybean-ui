<script setup lang="ts">
import { LayoutTrigger } from '@soybeanjs/headless';
import type { LayoutTriggerProps } from '@soybeanjs/headless';
import { useSizeContext } from '@/theme';
import ButtonIcon from '../button/button-icon.vue';

defineOptions({
  name: 'SLayoutTrigger'
});

defineProps<LayoutTriggerProps>();

const { size } = useSizeContext('LayoutTrigger');
</script>

<template>
  <LayoutTrigger v-slot="{ open }" as-child :size="size">
    <slot :open="open">
      <ButtonIcon :icon="open ? 'lucide:panel-right' : 'lucide:panel-left'" />
    </slot>
  </LayoutTrigger>
</template>
