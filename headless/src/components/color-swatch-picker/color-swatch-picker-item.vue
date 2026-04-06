<script setup lang="ts">
import { computed } from 'vue';
import { getColorLabel } from '../../shared';
import { ListboxItem } from '../listbox';
import { provideColorSwatchPickerItemContext } from './context';
import type { ColorSwatchPickerItemEmits, ColorSwatchPickerItemProps } from './types';

defineOptions({
  name: 'ColorSwatchPickerItem'
});

const props = defineProps<ColorSwatchPickerItemProps>();

const emit = defineEmits<ColorSwatchPickerItemEmits>();

const color = computed(() => props.value);
const colorLabel = computed(() => getColorLabel(color.value));

provideColorSwatchPickerItemContext({
  color
});
</script>

<template>
  <ListboxItem
    :value="value"
    :aria-label="colorLabel"
    :data-color="value"
    :style="{ '--soybean-color-swatch-picker-item-color': value }"
    @select="emit('select', $event)"
  >
    <slot />
  </ListboxItem>
</template>
