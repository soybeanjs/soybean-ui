<script setup lang="ts">
import { computed } from 'vue';
import { CardCompact, provideCardUi } from '@soybeanjs/headless/card';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { cardVariants } from '@/styles/card';
import type { CardProps, CardEmits, CardSlots } from './types';

defineOptions({
  name: 'SCard'
});

const props = withDefaults(defineProps<CardProps>(), {
  defaultOpen: true,
  open: undefined,
  scrollable: true
});

const emit = defineEmits<CardEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'scrollable', 'split']);

const slots = defineSlots<CardSlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() =>
  cardVariants(
    {
      size: props.size,
      scrollable: props.scrollable,
      split: props.split
    },
    props.ui,
    { root: props.class }
  )
);

provideCardUi(ui);
</script>

<template>
  <CardCompact v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </CardCompact>
</template>
