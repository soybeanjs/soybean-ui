<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { DescriptionsRoot, provideDescriptionsUi } from '@soybeanjs/headless/descriptions';
import { descriptionsVariants } from '@/styles/descriptions';
import type { DescriptionsProps } from './types';

defineOptions({
  name: 'SDescriptions'
});

const props = withDefaults(defineProps<DescriptionsProps>(), {
  column: 3,
  bordered: false,
  layout: 'horizontal',
  labelAlign: 'start',
  title: undefined,
  dir: undefined
});

const forwardedProps = useOmitProps(props, ['class', 'ui', 'title']);

const rootStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.column}, minmax(0, 1fr))`
}));

const ui = computed(() =>
  descriptionsVariants(
    {
      layout: props.layout,
      labelAlign: props.labelAlign,
      bordered: props.bordered
    },
    props.ui,
    { root: props.class }
  )
);

provideDescriptionsUi(ui);
</script>

<template>
  <DescriptionsRoot v-bind="forwardedProps" :style="rootStyle">
    <div v-if="title" data-soybean-descriptions-title :class="ui.title">{{ title }}</div>
    <slot />
  </DescriptionsRoot>
</template>
