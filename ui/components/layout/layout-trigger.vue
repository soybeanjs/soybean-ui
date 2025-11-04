<script setup lang="ts">
import { LayoutTrigger } from '@headless';
import type { LayoutTriggerProps } from '@headless';
import { useSizeContext } from '@theme';
import ButtonIcon from '../button/button-icon.vue';

defineOptions({
  name: 'SLayoutTrigger'
});

defineProps<LayoutTriggerProps>();

const { size } = useSizeContext('LayoutTrigger');
</script>

<template>
  <LayoutTrigger v-slot="{ open }" as-child>
    <slot>
      <ButtonIcon :icon="open ? 'lucide:panel-right' : 'lucide:panel-left'" :size="size" />
    </slot>
  </LayoutTrigger>
</template>
