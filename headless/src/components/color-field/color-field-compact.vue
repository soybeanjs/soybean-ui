<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import ColorFieldInput from './color-field-input.vue';
import ColorFieldRoot from './color-field-root.vue';
import type { ColorFieldCompactEmits, ColorFieldCompactProps } from './types';

defineOptions({
  name: 'ColorFieldCompact',
  inheritAttrs: false
});

const props = defineProps<ColorFieldCompactProps>();

const emit = defineEmits<ColorFieldCompactEmits>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['inputProps']);

const listeners = useForwardListeners(emit);

const resolvedInputProps = computed(() => ({
  ...props.inputProps,
  ...attrs
}));
</script>

<template>
  <ColorFieldRoot v-bind="forwardedProps" v-on="listeners">
    <ColorFieldInput v-bind="resolvedInputProps" />
  </ColorFieldRoot>
</template>
