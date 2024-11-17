<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import BaseSeparator from '../../_shared/component/base-separator.vue';
import { injectToolbarRootContext } from './toolbar-root.vue';

export interface ToolbarSeparatorProps extends PrimitiveProps {}

const props = defineProps<ToolbarSeparatorProps>();

const rootContext = injectToolbarRootContext();
useForwardExpose();
</script>

<template>
  <BaseSeparator :orientation="rootContext.orientation.value" :as-child="props.asChild" :as>
    <slot />
  </BaseSeparator>
</template>
