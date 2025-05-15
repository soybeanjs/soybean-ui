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
import type { ComboboxContentEmits, ComboboxContentProps } from '../types';

defineOptions({
  name: 'SComboboxContent'
});

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4
});

const emit = defineEmits<ComboboxContentEmits>();

const forwardedProps = useOmitForwardProps(props, ['class', 'size']);

const forwarded = useCombinedPropsEmits(forwardedProps, emit);

const mergedCls = computed(() => {
  const { content } = comboboxVariants({ size: props.size });

  return cn(content(), props.class);
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
