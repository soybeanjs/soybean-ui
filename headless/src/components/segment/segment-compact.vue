<script setup lang="ts" generic="T extends SegmentOptionData = SegmentOptionData">
import { useOmitProps } from '../../composables';
import type { AcceptableValue } from '../../types';
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger } from '../tabs';
import { useTabsUi } from '../tabs/context';
import type { SegmentCompactEmits, SegmentCompactProps, SegmentCompactSlots, SegmentOptionData } from './types';

defineOptions({
  name: 'SegmentCompact'
});

const props = withDefaults(defineProps<SegmentCompactProps<T>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  loop: true,
  enableIndicator: true
});

const emit = defineEmits<SegmentCompactEmits<T['value']>>();

defineSlots<SegmentCompactSlots<T>>();

const forwardedProps = useOmitProps(props, ['items', 'enableIndicator', 'listProps', 'triggerProps', 'indicatorProps']);

const ui = useTabsUi();

const handleModelValueChange = (value: AcceptableValue) => {
  emit('update:modelValue', value as T['value']);
};
</script>

<template>
  <TabsRoot v-bind="forwardedProps" @update:model-value="handleModelValueChange">
    <TabsList v-bind="listProps">
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        v-bind="triggerProps"
        v-slot="slotProps"
        :value="item.value"
        :disabled="item.disabled"
      >
        <slot name="item" v-bind="{ ...item, ...slotProps }">{{ item.label }}</slot>
      </TabsTrigger>
      <TabsIndicator v-if="enableIndicator" v-bind="indicatorProps">
        <slot name="indicator">
          <div :class="ui.indicatorContent" />
        </slot>
      </TabsIndicator>
    </TabsList>
  </TabsRoot>
</template>
