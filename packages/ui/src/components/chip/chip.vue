<script lang="ts" setup>
import { computed } from 'vue';
import { chipVariants, cn } from '@soybean-ui/variants';
import { Primitive } from 'radix-vue';
import type { ChipProps } from './types';
import SChipRoot from './chip-root.vue';

defineOptions({
  name: 'SChip'
});

const props = withDefaults(defineProps<ChipProps>(), {
  show: true
});

const cls = computed(() => {
  const { content } = chipVariants({ size: props.size, color: props.color, position: props.position });

  return cn(content(), props.class);
});
</script>

<template>
  <SChipRoot>
    <slot />
    <Primitive v-if="show" as="span" :class="cls">
      <slot name="content" :value="text">
        {{ text }}
      </slot>
    </Primitive>
  </SChipRoot>
</template>
