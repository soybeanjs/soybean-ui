<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { PopperContent } from '../popper';
import { popperCssVars } from '../popper/shared';
import { CONTENT_MARGIN, selectCssVars } from './shared';
import type { SelectPopperPositionProps } from './types';

defineOptions({
  name: 'SelectPopperPosition'
});

const props = withDefaults(defineProps<SelectPopperPositionProps>(), {
  align: 'start',
  collisionPadding: CONTENT_MARGIN,
  avoidCollisions: true
});

const style: CSSProperties = {
  boxSizing: 'border-box',
  [selectCssVars.contentTransformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [selectCssVars.contentAvailableWidth]: `var(${popperCssVars.availableWidth})`,
  [selectCssVars.contentAvailableHeight]: `var(${popperCssVars.availableHeight})`,
  [selectCssVars.triggerWidth]: `var(${popperCssVars.anchorWidth})`,
  [selectCssVars.triggerHeight]: `var(${popperCssVars.anchorHeight})`
};
</script>

<template>
  <PopperContent v-bind="props" :style="style">
    <slot />
  </PopperContent>
</template>
