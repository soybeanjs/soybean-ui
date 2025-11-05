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

const cls = computed(() => themeContext?.value);

const isTemplate = computed(() => props.as === 'template');
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :width="isTemplate ? undefined : width"
    :height="isTemplate ? undefined : height"
    :class="cls"
    :viewBox="isTemplate ? undefined : '0 0 12 6'"
    :preserveAspectRatio="isTemplate ? undefined : 'none'"
  >
    <slot>
      <path d="M0 0L6 6L12 0" />
    </slot>
  </Primitive>
</template>
