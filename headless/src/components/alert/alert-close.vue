<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useAlertRootContext, useAlertUi } from './context';
import type { AlertCloseProps } from './types';

defineOptions({
  name: 'AlertClose'
});

const props = defineProps<AlertCloseProps>();

const { onOpenChange } = useAlertRootContext('AlertClose');

const cls = useAlertUi('close');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
