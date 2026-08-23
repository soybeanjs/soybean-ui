<script setup lang="ts">
import { computed } from 'vue';
import { useDescriptionsRootContext, useDescriptionsUi } from './context';
import type { DescriptionsItemProps } from './types';

defineOptions({
  name: 'DescriptionsItem'
});

const props = withDefaults(defineProps<DescriptionsItemProps>(), {
  label: undefined,
  span: 1
});

const context = useDescriptionsRootContext('DescriptionsItem');

const cls = useDescriptionsUi('item');
const labelCls = useDescriptionsUi('label');
const contentCls = useDescriptionsUi('content');

const layout = computed(() => context.layout.value);
const labelAlign = computed(() => context.labelAlign.value);

const dataSpan = computed(() => (props.span > 1 ? String(props.span) : undefined));
</script>

<template>
  <div
    data-soybean-descriptions-item
    :data-span="dataSpan"
    :data-layout="layout"
    :data-label-align="labelAlign"
    :class="cls"
  >
    <div data-soybean-descriptions-label :class="labelCls">
      <slot name="label">{{ label }}</slot>
    </div>
    <div data-soybean-descriptions-content :class="contentCls">
      <slot />
    </div>
  </div>
</template>
