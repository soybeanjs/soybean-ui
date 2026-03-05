<script setup lang="ts">
import { CardCollapsibleTrigger } from '@soybeanjs/headless';
import type { CardCollapsibleTriggerProps } from '@soybeanjs/headless';
import ButtonIcon from '../button/button-icon.vue';

defineOptions({
  name: 'SCardCollapsibleTrigger'
});

const props = withDefaults(defineProps<CardCollapsibleTriggerProps>(), {
  asChild: true
});
</script>

<template>
  <CardCollapsibleTrigger v-slot="{ open }" v-bind="props">
    <slot :open="open">
      <ButtonIcon v-if="open" icon="lucide:chevron-down" />
      <ButtonIcon v-else icon="lucide:chevron-right" />
    </slot>
  </CardCollapsibleTrigger>
</template>
