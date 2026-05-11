<script setup lang="ts">
import { computed } from 'vue';
import { AlertCompact, provideAlertUi } from '@soybeanjs/headless/alert';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, miniSizeMap } from '@/theme';
import { alertVariants } from './variants';
import { buttonIconVariants } from '../button/variants';
import type { AlertProps, AlertEmits, AlertSlots } from './types';

defineOptions({
  name: 'SAlert'
});

const props = withDefaults(defineProps<AlertProps>(), {
  open: undefined
});

const emit = defineEmits<AlertEmits>();

const slots = defineSlots<AlertSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'color', 'variant', 'ui']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = alertVariants({
    size: props.size,
    color: props.color,
    variant: props.variant
  });

  const base = {
    ...variants,
    $base: {
      close: buttonIconVariants({
        size: miniSizeMap[props.size ?? 'md']
      })
    }
  };

  return mergeVariants(base, props.ui, { root: props.class });
});

provideAlertUi(ui);
</script>

<template>
  <AlertCompact v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </AlertCompact>
</template>
