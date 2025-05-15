<script setup lang="ts" generic="T extends SegmentOptionData = SegmentOptionData">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { SegmentEmits, SegmentOptionData, SegmentProps } from '../types';
import SSegmentRoot from './segment-root.vue';
import SSegmentList from './segment-list.vue';
import SSegmentTrigger from './segment-trigger.vue';
import SSegmentIndicator from './segment-indicator.vue';

defineOptions({
  name: 'SSegment'
});

const { class: cls, ui, loop, items, enableIndicator = true, ...delegatedRootProps } = defineProps<SegmentProps<T>>();

const emit = defineEmits<SegmentEmits<T['value']>>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <SSegmentRoot v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <SSegmentList :class="ui?.list" :size="size" :orientation="orientation" :loop="loop">
      <SSegmentTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="ui?.trigger"
        :size="size"
        :enable-indicator="enableIndicator"
      >
        <slot name="trigger" v-bind="{ ...item, active: item.value === modelValue }">{{ item.label }}</slot>
      </SSegmentTrigger>
      <SSegmentIndicator :size="size" :ui="ui" :orientation="orientation" />
    </SSegmentList>
  </SSegmentRoot>
</template>
