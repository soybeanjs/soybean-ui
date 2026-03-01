<script setup lang="ts">
import { computed } from 'vue';
import { tableVariants } from './variants';
import type { TableRadioProps } from './types';

defineOptions({
  name: 'STableRadio'
});

const props = defineProps<TableRadioProps>();

const ui = computed(() => {
  const variants = tableVariants({ size: props.size });

  return {
    radioRoot: variants.radioRoot(),
    radioIndicator: variants.radioIndicator()
  };
});
</script>

<template>
  <button :class="ui.radioRoot">
    <span v-if="checked" :class="ui.radioIndicator"></span>
  </button>
</template>
