<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useMounted } from '@vueuse/core';
import { useCollection, useForwardExpose, useSize } from '../../composables';
import { Primitive } from '../primitive';
import { injectSliderOrientationContext, injectSliderRootContext } from './context';
import { convertValueToPercentage, getLabel, getThumbInBoundsOffset } from './shared';
import type { SliderThumbImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'SliderThumbImpl',
  inheritAttrs: false
});

const props = defineProps<SliderThumbImplPropsWithPrimitive>();

const rootContext = injectSliderRootContext();
const orientation = injectSliderOrientationContext();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();
const { CollectionItem } = useCollection();

const value = computed(() => rootContext.modelValue?.value?.[props.index]);
const percent = computed(() =>
  value.value === undefined
    ? 0
    : convertValueToPercentage(value.value, rootContext.min.value ?? 0, rootContext.max.value ?? 100)
);
const label = computed(() => getLabel(props.index, rootContext.modelValue?.value?.length ?? 0));
const size = useSize(thumbElement);
const orientationSize = computed(() => size[orientation!.size].value);
const thumbInBoundsOffset = computed(() => {
  if (rootContext.thumbAlignment.value === 'overflow' || !orientationSize.value) {
    return 0;
  }

  return getThumbInBoundsOffset(orientationSize.value, percent.value, orientation!.direction.value);
});

const isMounted = useMounted();
onMounted(() => {
  rootContext.thumbElements.value.push(thumbElement.value);
});
onUnmounted(() => {
  const i = rootContext.thumbElements.value.findIndex(item => item === thumbElement.value) ?? -1;
  rootContext.thumbElements.value.splice(i, 1);
});
</script>

<template>
  <CollectionItem>
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      role="slider"
      data-soybean-collection-item
      :tabindex="rootContext.disabled.value ? undefined : 0"
      :aria-label="$attrs['aria-label'] || label"
      :data-disabled="rootContext.disabled.value ? '' : undefined"
      :data-orientation="rootContext.orientation.value"
      :aria-valuenow="value"
      :aria-valuemin="rootContext.min.value"
      :aria-valuemax="rootContext.max.value"
      :aria-orientation="rootContext.orientation.value"
      :style="{
        transform: 'var(--soybean-slider-thumb-transform)',
        position: 'absolute',
        [orientation!.startEdge.value]: `calc(${percent}% + ${thumbInBoundsOffset}px)`,
        /**
         * There will be no value on initial render while we work out the index so we hide thumbs
         * without a value, otherwise SSR will render them in the wrong position before they
         * snap into the correct position during hydration which would be visually jarring for
         * slower connections.
         */
        display: !isMounted && value === undefined ? 'none' : undefined
      }"
      @focus="
        () => {
          rootContext.valueIndexToChangeRef.value = index;
        }
      "
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
