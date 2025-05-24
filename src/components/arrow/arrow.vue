<script setup lang="ts">
import { Primitive } from '../primitive';
import type { ArrowProps } from './types';

defineOptions({
  name: 'Arrow'
});

const props = withDefaults(defineProps<ArrowProps>(), {
  as: 'svg',
  width: 12,
  height: 6
});
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :width="width"
    :height="height"
    :viewBox="as === 'template' ? undefined : '0 0 30 10'"
    :preserveAspectRatio="as === 'template' ? undefined : 'none'"
  >
    <slot>
      <polygon points="0,0 30,0 15,10" />
    </slot>
  </Primitive>
</template>
