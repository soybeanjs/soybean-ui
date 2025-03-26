<script lang="ts" setup>
import { computed } from 'vue';
import { useThemeSize } from '../../context/theme';
import SChipRoot from './chip-root.vue';
import SChipContent from './chip-content.vue';
import type { ChipProps } from './types';

defineOptions({
  name: 'SChip'
});

const { class: cls, ui, text, show = true, size: _size, color, position } = defineProps<ChipProps>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);
</script>

<template>
  <SChipRoot :class="cls || ui?.root">
    <slot />
    <SChipContent v-if="show" :class="ui?.content" :size="size" :color="color" :position="position">
      <slot name="content" :value="text">
        {{ text }}
      </slot>
    </SChipContent>
  </SChipRoot>
</template>
