<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';
import { Primitive } from '../primitive';
import type { AspectRatioProps } from './types';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1
});

const aspect = computed(() => (1 / props.ratio) * 100);

const style = computed<CSSProperties>(() => ({
  position: 'relative',
  width: '100%',
  paddingBottom: `${aspect.value}%`
}));
</script>

<template>
  <div data-soybean-aspect-ratio-wrapper :style="style">
    <Primitive v-bind="$attrs" :class="props.class" :as="as" style="position: absolute; inset: 0px">
      <slot :aspect="aspect" />
    </Primitive>
  </div>
</template>
