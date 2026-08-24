<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { Arrow } from '@soybeanjs/headless/arrow';
import { OPPOSITE_SIDE } from '@soybeanjs/headless/constants';
import type { Side } from '@soybeanjs/headless/types';
import { useEpPositionerContext, useEpUi } from './context';
import type { EpArrowProps } from './types';

defineOptions({
  name: 'EpArrow'
});

defineProps<EpArrowProps>();

const cls = useEpUi('arrow');

const { setArrowElement, arrowX, arrowY, hideArrow, placedSide } = useEpPositionerContext('EpArrow');

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

const baseSide = computed(() => OPPOSITE_SIDE[placedSide.value]);

const style = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: arrowX.value ? `${arrowX.value}px` : undefined,
  top: arrowY.value ? `${arrowY.value}px` : undefined,
  [baseSide.value]: 0,
  transformOrigin: TRANSFORM_ORIGIN[placedSide.value],
  transform: TRANSFORM[placedSide.value],
  visibility: hideArrow.value ? 'hidden' : undefined
}));
</script>

<template>
  <span :ref="setArrowElement" data-soybean-ep-arrow :class="cls" :style="style">
    <Arrow />
  </span>
</template>
