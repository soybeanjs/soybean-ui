<script setup lang="ts" generic="T extends SegmentOptionData = SegmentOptionData">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import SSegmentRoot from './segment-root.vue';
import SSegmentTriggerRoot from './segment-list.vue';
import SSegmentTrigger from './segment-trigger.vue';
import SSegmentIndicatorRoot from './segment-indicator-root.vue';
import SSegmentIndicator from './segment-indicator.vue';
import type { SegmentEmits, SegmentOptionData, SegmentProps } from './types';

defineOptions({
  name: 'SSegment'
});

const { class: cls, ui, loop, items, enableIndicator = true, ...delegatedRootProps } = defineProps<SegmentProps<T>>();

const emit = defineEmits<SegmentEmits<T['value']>>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <SSegmentRoot v-bind="forwarded" :class="cls || ui?.root">
    <SSegmentTriggerRoot :class="ui?.list" :size="size" :orientation="orientation" :loop="loop">
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
      <SSegmentIndicatorRoot :class="ui?.indicatorRoot" :size="size" :orientation="orientation">
        <slot name="indicator">
          <SSegmentIndicator :class="ui?.indicator" :orientation="orientation" />
        </slot>
      </SSegmentIndicatorRoot>
    </SSegmentTriggerRoot>
  </SSegmentRoot>
</template>
