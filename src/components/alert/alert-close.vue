<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useAlertRootContext, useAlertThemeContext } from './context';
import type { AlertCloseProps } from './types';

defineOptions({
  name: 'AlertClose'
});

const props = defineProps<AlertCloseProps>();

const { onOpenChange } = useAlertRootContext('AlertClose');

const themeContext = useAlertThemeContext();

const cls = computed(() => themeContext?.ui?.value?.closable);

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive v-bind="props" :class="cls" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
