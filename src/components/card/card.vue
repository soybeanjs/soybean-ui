<script setup lang="ts">
import { computed } from 'vue';
import { CardCompact, provideCardUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { cardVariants } from './variants';
import type { CardProps } from './types';

defineOptions({
  name: 'SCard'
});

const props = withDefaults(defineProps<CardProps>(), {
  defaultOpen: true,
  open: undefined,
  scrollable: true
});

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'scrollable',
  'split'
]);

type Slots = {
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  footer: () => any;
  description: () => any;
};

const slots = defineSlots<Slots>();

const ui = computed(() => {
  const variants = cardVariants({
    size: props.size,
    scrollable: props.scrollable,
    split: props.split
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideCardUi(ui);
</script>

<template>
  <CardCompact v-bind="forwardedProps">
    <template v-if="slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="slots['title-leading']" #title-leading>
      <slot name="title-leading" />
    </template>
    <template v-if="slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="slots['title-trailing']" #title-trailing>
      <slot name="title-trailing" />
    </template>
    <template v-if="slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template v-if="slots.description" #description>
      <slot name="description" />
    </template>
    <template #default>
      <slot />
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </CardCompact>
</template>
