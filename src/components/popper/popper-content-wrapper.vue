<script setup lang="ts">
import { useExposedElement } from '../../composables';
import { usePopperRootContext } from './context';
import type { PopperContentWrapperProps } from './types';

defineOptions({
  name: 'PopperContentWrapper'
});

const props = defineProps<PopperContentWrapperProps>();

const { onContentWrapperElementChange, contentWrapperStyle } = usePopperRootContext('PopperContentWrapper');

const [_, setWrapperElement] = useExposedElement(onContentWrapperElementChange);
</script>

<template>
  <div v-bind="props" :ref="setWrapperElement" data-soybean-popper-content-wrapper :style="contentWrapperStyle">
    <slot />
  </div>
</template>
