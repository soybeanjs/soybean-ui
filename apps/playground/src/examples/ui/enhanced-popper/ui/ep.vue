<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { EpCompact, provideEpUi } from '../headless';
import { epVariants } from './styles';
import type { EpEmits, EpProps, EpSlots } from './types';

defineOptions({
  name: 'SEp'
});

const props = withDefaults(defineProps<EpProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  openOnFocus: undefined,
  showArrow: true
});

const emit = defineEmits<EpEmits>();

defineSlots<EpSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);
const listeners = useForwardListeners(emit);

const ui = computed(() => epVariants({ size: props.size }, props.ui, { popup: props.class }));

provideEpUi(ui);
</script>

<template>
  <EpCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </EpCompact>
</template>
