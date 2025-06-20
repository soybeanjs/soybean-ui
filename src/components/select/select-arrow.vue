<script setup lang="ts">
import { computed } from 'vue';
import { PopperArrow } from '../popper';
import { useSelectContentContext, useSelectRootContext, useSelectThemeContext } from './context';
import type { SelectArrowProps } from './types';

defineOptions({
  name: 'SelectArrow'
});

const props = defineProps<SelectArrowProps>();

const { open } = useSelectRootContext('SelectArrow');
const { position } = useSelectContentContext('SelectArrow');

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.arrow, props.class]);

const showArrow = computed(() => open.value && position.value === 'popper');
</script>

<template>
  <PopperArrow v-if="showArrow" v-bind="props" :class="cls">
    <slot />
  </PopperArrow>
</template>
