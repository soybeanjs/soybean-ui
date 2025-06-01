<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import { OPPOSITE_SIDE } from '../../constants';
import type { Side } from '../../types';
import { Arrow } from '../arrow';
import { usePopperContentContext } from './context';
import type { PopperArrowProps } from './types';

defineOptions({
  name: 'PopperArrow',
  inheritAttrs: false
});

const props = defineProps<PopperArrowProps>();

const attrs = useAttrs();

const { setArrowElement, placedSide, arrowX, arrowY, shouldHideArrow } = usePopperContentContext('PopperArrow');

const baseSide = computed(() => OPPOSITE_SIDE[placedSide.value]);

const TRANSFORM_ORIGIN: Record<Side, string> = {
  top: '',
  right: '0 0',
  bottom: 'center 0',
  left: '100% 0'
};

const TRANSFORM: Record<Side, string> = {
  top: 'translateY(100%)',
  right: 'translateY(50%) rotate(90deg) translateX(-50%)',
  bottom: 'rotate(180deg)',
  left: 'translateY(50%) rotate(-90deg) translateX(50%)'
};

const style = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: arrowX.value ? `${arrowX.value}px` : undefined,
  top: arrowY.value ? `${arrowY.value}px` : undefined,
  [baseSide.value]: 0,
  transformOrigin: TRANSFORM_ORIGIN[placedSide.value],
  transform: TRANSFORM[placedSide.value],
  visibility: shouldHideArrow.value ? 'hidden' : undefined
}));
</script>

<template>
  <span :ref="setArrowElement" :style="style">
    <Arrow
      v-bind="{ ...props, ...attrs }"
      :style="{
        display: 'block'
      }"
    >
      <slot />
    </Arrow>
  </span>
</template>
