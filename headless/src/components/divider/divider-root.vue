<script setup lang="ts">
import { computed } from 'vue';
import type { DataOrientation } from '../../types';
import { useDividerThemeContext } from './context';
import type { DividerRootProps } from './types';

defineOptions({
  name: 'Divider'
});

const props = withDefaults(defineProps<DividerRootProps>(), {
  orientation: 'horizontal',
  decorative: false
});

const themeContext = useDividerThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const ORIENTATIONS: DataOrientation[] = ['horizontal', 'vertical'];

const computedOrientation = computed(() =>
  ORIENTATIONS.includes(props.orientation) ? props.orientation : 'horizontal'
);

// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() => (computedOrientation.value === 'vertical' ? props.orientation : undefined));
</script>

<template>
  <div
    :class="cls"
    :data-orientation="computedOrientation"
    :aria-orientation="ariaOrientation"
    :role="decorative ? 'none' : 'separator'"
  >
    <slot />
  </div>
</template>
