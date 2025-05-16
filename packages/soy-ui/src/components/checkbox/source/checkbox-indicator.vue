<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxIndicator } from '@soybean-ui/primitives';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxIndicatorProps } from '../types';

defineOptions({
  name: 'SCheckboxIndicator'
});

const { class: cls, forceMount } = defineProps<CheckboxIndicatorProps>();

const { indicator } = checkboxVariants();

const mergedCls = computed(() => cn(indicator(), cls));
</script>

<template>
  <CheckboxIndicator :class="mergedCls" :force-mount="forceMount">
    <slot />
  </CheckboxIndicator>
</template>
