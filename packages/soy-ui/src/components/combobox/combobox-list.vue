<script setup lang="ts">
import { computed } from 'vue';
import {
  ComboboxContent,
  ComboboxPortal,
  ComboboxViewport,
  useCombinedPropsEmits,
  useOmitForwardProps
} from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboBoxListEmits, ComboboxListProps } from './types';

defineOptions({
  name: 'SComboboxList'
});

const props = withDefaults(defineProps<ComboboxListProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4
});

const emit = defineEmits<ComboBoxListEmits>();

const forwardedProps = useOmitForwardProps(props, ['class', 'size']);

const forwarded = useCombinedPropsEmits(forwardedProps, emit);

const mergedCls = computed(() => {
  const { list } = comboboxVariants({ size: props.size });

  return cn(list(), props.class);
});
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent v-bind="forwarded" :class="mergedCls">
      <ComboboxViewport>
        <slot />
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>
