<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { CarouselCompact, provideCarouselUi } from '@soybeanjs/headless/carousel';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import type { DefinedValue } from '@soybeanjs/headless/types';
import { keysOf } from '@soybeanjs/utils';
import { mergeBaseVariants, mergeSlotVariants } from '@/theme';
import { buttonVariants } from '../button/variants';
import { carouselVariants } from './variants';
import type { CarouselProps, CarouselEmits, CarouselSlots } from './types';

defineOptions({
  name: 'SCarousel'
});

const props = defineProps<CarouselProps<T>>();

const emit = defineEmits<CarouselEmits>();

const slots = defineSlots<CarouselSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size', 'floatNav']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(name => name !== 'item'));

const ui = computed(() => {
  const baseVariants = carouselVariants({
    size: props.size,
    orientation: props.orientation,
    floatNav: props.floatNav
  });

  const variants = mergeBaseVariants(baseVariants, {
    previous: buttonVariants({
      size: props.size,
      color: 'accent',
      variant: 'pure',
      shape: 'circle',
      fitContent: true
    }),
    next: buttonVariants({
      size: props.size,
      color: 'accent',
      variant: 'pure',
      shape: 'circle',
      fitContent: true
    })
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideCarouselUi(ui);
</script>

<template>
  <CarouselCompact v-bind="forwardedProps" v-on="listeners">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </CarouselCompact>
</template>
