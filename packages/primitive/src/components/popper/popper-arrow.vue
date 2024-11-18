<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { useForwardExpose } from '../../composables';
import type { Side } from '../../types';
import Arrow from '../arrow/arrow.vue';
import { injectPopperContentContext } from './context';
import type { PopperArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopperArrow',
  inheritAttrs: false
});

const props = defineProps<PopperArrowPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();
const contentContext = injectPopperContentContext();

function refTrigger(vnode: ComponentPublicInstance) {
  contentContext.onArrowChange(vnode?.$el);
  return undefined;
}

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
</script>

<template>
  <span
    :ref="refTrigger"
    :style="{
      position: 'absolute',
      left: contentContext.arrowX?.value ? `${contentContext.arrowX?.value}px` : undefined,
      top: contentContext.arrowY?.value ? `${contentContext.arrowY?.value}px` : undefined,
      [baseSide]: 0,
      transformOrigin: {
        top: '',
        right: '0 0',
        bottom: 'center 0',
        left: '100% 0'
      }[contentContext.placedSide.value],
      transform: {
        top: 'translateY(100%)',
        right: 'translateY(50%) rotate(90deg) translateX(-50%)',
        bottom: `rotate(180deg)`,
        left: 'translateY(50%) rotate(-90deg) translateX(50%)'
      }[contentContext.placedSide.value],
      visibility: contentContext.shouldHideArrow.value ? 'hidden' : undefined
    }"
  >
    <Arrow
      v-bind="$attrs"
      :ref="forwardRef"
      :class="props.class"
      :as
      :as-child
      :rounded="rounded"
      :width="width"
      :height="height"
      :style="{
        display: 'block'
      }"
    >
      <slot />
    </Arrow>
  </span>
</template>
