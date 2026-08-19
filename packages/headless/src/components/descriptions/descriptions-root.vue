<script setup lang="ts">
import { provideDescriptionsRootContext, useDescriptionsUi } from './context';
import type { DescriptionsRootProps } from './types';

defineOptions({
  name: 'DescriptionsRoot'
});

const props = withDefaults(defineProps<DescriptionsRootProps>(), {
  column: 3,
  bordered: false,
  layout: 'horizontal',
  labelAlign: 'start',
  dir: undefined
});

const cls = useDescriptionsUi('root');

provideDescriptionsRootContext(props);
</script>

<template>
  <div
    data-soybean-descriptions-root
    :dir="dir"
    :data-layout="layout"
    :data-bordered="bordered ? '' : undefined"
    :data-column="column"
    :class="cls"
  >
    <slot />
  </div>
</template>
