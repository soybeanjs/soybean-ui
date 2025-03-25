<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '@soybean-ui/primitives';
import { cn, labelVariants } from '@soybean-ui/variants';
import { useThemeSize } from '../../context/theme';
import type { LabelProps } from './types';

defineOptions({
  name: 'SLabel'
});

const { class: cls, size: _size, for: forId } = defineProps<LabelProps>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const mergedCls = computed(() => cn(labelVariants({ size: size.value }), cls));
</script>

<template>
  <Label :for="forId" :class="mergedCls">
    <slot />
  </Label>
</template>
