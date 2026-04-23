<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Primitive } from '../primitive';
import { useAlertRootContext, useAlertUi } from './context';
import type { AlertCloseProps } from './types';

defineOptions({
  name: 'AlertClose'
});

const props = withDefaults(defineProps<AlertCloseProps>(), {
  as: 'button'
});

const attrs = useAttrs();

const { onOpenChange } = useAlertRootContext('AlertClose');

const cls = useAlertUi('close');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const ariaLabel = computed(() => attrs['aria-label'] ?? 'Close alert');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :aria-label="ariaLabel" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
