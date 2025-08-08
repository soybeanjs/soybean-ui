<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useArrowThemeContext } from './context';
import type { ArrowProps } from './types';

defineOptions({
  name: 'Arrow'
});

const props = withDefaults(defineProps<ArrowProps>(), {
  as: 'svg',
  width: '1em',
  height: '0.5em'
});

const themeContext = useArrowThemeContext();

const cls = computed(() => [themeContext?.value, props.class]);
</script>

<template>
  <Primitive
    v-bind="props"
    :class="cls"
    :viewBox="as === 'template' ? undefined : '0 0 30 10'"
    :preserveAspectRatio="as === 'template' ? undefined : 'none'"
  >
    <slot>
      <polygon points="0,0 30,0 15,10" />
    </slot>
  </Primitive>
</template>
