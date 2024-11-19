<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { useForwardExpose } from '../../composables';
import BaseSeparator from '../../composables/component/base-separator.vue';
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
