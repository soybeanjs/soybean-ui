<script setup lang="ts">
import { computed } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import { useThemeSize } from '../../context/theme';
import SProgressRoot from './progress-root.vue';
import SProgressIndicator from './progress-indicator.vue';
import type { ProgressEmits, ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const { class: cls, size: _size, ui, ...delegatedProps } = defineProps<ProgressProps>();

const emit = defineEmits<ProgressEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);
</script>

<template>
  <SProgressRoot v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <SProgressIndicator :class="ui?.indicator" :model-value="modelValue" :color="color" />
  </SProgressRoot>
</template>
