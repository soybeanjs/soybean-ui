<script setup lang="ts">
import { PinInputRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { PinInputRootEmits, PinInputRootProps } from '../types';

defineOptions({
  name: 'SPinInputRoot'
});

const props = defineProps<PinInputRootProps>();

const emit = defineEmits<PinInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <PinInputRoot v-bind="forwarded">
    <slot />
  </PinInputRoot>
</template>
