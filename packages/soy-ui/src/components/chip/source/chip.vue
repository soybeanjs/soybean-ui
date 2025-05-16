<script lang="ts" setup>
import type { ChipProps } from '../types';
import SChipRoot from './chip-root.vue';
import SChipContent from './chip-content.vue';

defineOptions({
  name: 'SChip'
});

const { class: cls, ui, content, open = true, size, color, position } = defineProps<ChipProps>();
</script>

<template>
  <SChipRoot :class="cls || ui?.root">
    <slot />
    <SChipContent v-if="open" :class="ui?.content" :size="size" :color="color" :position="position">
      <slot name="content">{{ content }}</slot>
    </SChipContent>
  </SChipRoot>
</template>
