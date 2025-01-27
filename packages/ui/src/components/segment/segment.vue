<script setup lang="ts" generic="T extends SegmentOption = SegmentOption">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import SSegmentRoot from './segment-root.vue';
import SSegmentTriggerRoot from './segment-trigger-root.vue';
import SSegmentTrigger from './segment-trigger.vue';
import SSegmentIndicatorRoot from './segment-indicator-root.vue';
import SSegmentIndicator from './segment-indicator.vue';
import type { SegmentEmits, SegmentOption, SegmentProps } from './types';

defineOptions({
  name: 'SSegment'
});

const {
  loop,
  items,
  triggerRootClass,
  triggerClass,
  indicatorRootClass,
  indicatorClass,
  ...delegatedRootProps
  //
} = defineProps<SegmentProps<T>>();

const emit = defineEmits<SegmentEmits<T['value']>>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <SSegmentRoot v-bind="forwarded">
    <SSegmentTriggerRoot :class="triggerRootClass" :loop="loop">
      <SSegmentTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="triggerClass"
      >
        <slot name="trigger" v-bind="{ ...item, active: item.value === modelValue }">{{ item.label }}</slot>
      </SSegmentTrigger>
      <SSegmentIndicatorRoot :class="indicatorRootClass" :orientation="orientation">
        <slot name="indicator">
          <SSegmentIndicator :class="indicatorClass" :orientation="orientation" />
        </slot>
      </SSegmentIndicatorRoot>
    </SSegmentTriggerRoot>
  </SSegmentRoot>
</template>
