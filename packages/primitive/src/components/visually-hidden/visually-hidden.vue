<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { Primitive } from '../primitive';
import type { VisuallyHiddenPropsWithPrimitive } from './types';

defineOptions({
  name: 'VisuallyHidden'
});

const { class: className, as = 'span', feature = 'focusable' } = defineProps<VisuallyHiddenPropsWithPrimitive>();

const ariaHidden = computed(() => (feature === 'focusable' ? 'true' : undefined));
const dataHidden = computed(() => (feature === 'fully-hidden' ? '' : undefined));
const tabindex = computed(() => (feature === 'fully-hidden' ? '-1' : undefined));

// See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
const style: CSSProperties = {
  position: 'absolute',
  border: 0,
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  wordWrap: 'normal'
};
</script>

<template>
  <Primitive :class="className" :as :as-child :aria-hidden :data-hidden :tabindex :style>
    <slot />
  </Primitive>
</template>
