<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { SeparatorRoot } from '../separator';
import { useToolbarRootContext, useToolbarUi } from './context';
import type { ToolbarSeparatorProps } from './types';

defineOptions({
  name: 'ToolbarSeparator'
});

const props = defineProps<ToolbarSeparatorProps>();

const { orientation } = useToolbarRootContext('ToolbarSeparator');

const cls = useToolbarUi('separator');

const forwardedProps = useOmitProps(props, ['class']);

const mergedClass = computed(() => [cls.value, props.class]);

const separatorOrientation = computed(() => (orientation.value === 'horizontal' ? 'vertical' : 'horizontal'));
</script>

<template>
  <SeparatorRoot v-bind="forwardedProps" :class="mergedClass" :orientation="separatorOrientation">
    <slot />
  </SeparatorRoot>
</template>
