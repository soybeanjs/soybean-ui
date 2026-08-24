<script setup lang="ts">
import { usePopperV2Ui } from './context';
import PopperV2Trigger from './popper-v2-trigger.vue';
import type { PopperV2SubTriggerProps } from './types';

defineOptions({
  name: 'PopperV2SubTrigger'
});

const props = withDefaults(defineProps<PopperV2SubTriggerProps>(), {
  as: 'button',
  trigger: 'click',
  openOnFocus: undefined
});

const cls = usePopperV2Ui('subTrigger');
</script>

<template>
  <PopperV2Trigger v-bind="props" data-soybean-popper-v2-sub-trigger :class="cls">
    <slot />
  </PopperV2Trigger>
</template>
