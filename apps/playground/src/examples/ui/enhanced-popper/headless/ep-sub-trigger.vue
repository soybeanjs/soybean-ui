<script setup lang="ts">
import { useEpUi } from './context';
import EpTrigger from './ep-trigger.vue';
import type { EpSubTriggerProps } from './types';

defineOptions({
  name: 'EpSubTrigger'
});

const props = withDefaults(defineProps<EpSubTriggerProps>(), {
  as: 'button',
  trigger: 'click',
  openOnFocus: undefined
});

const cls = useEpUi('subTrigger');
</script>

<template>
  <EpTrigger v-bind="props" data-soybean-ep-sub-trigger :class="cls">
    <slot />
  </EpTrigger>
</template>
