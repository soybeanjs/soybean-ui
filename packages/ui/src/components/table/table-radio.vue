<script setup lang="ts">
import { computed } from 'vue';
import { tableVariants } from '@/styles/table';
import type { TableRadioProps } from './types';

defineOptions({
  name: 'STableRadio'
});

const props = defineProps<TableRadioProps>();

const ui = computed(() => tableVariants({ size: props.size }));
</script>

<template>
  <button type="button" :aria-pressed="checked" :class="ui.radioRoot">
    <span v-if="checked" :class="ui.radioIndicator"></span>
  </button>
</template>
