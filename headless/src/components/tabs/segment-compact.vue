<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
  "
>
import { useOmitProps } from '../../composables';
import type { AcceptableValue } from '../../types';
import TabsIndicator from './tabs-indicator.vue';
import TabsList from './tabs-list.vue';
import TabsRoot from './tabs-root.vue';
import TabsTrigger from './tabs-trigger.vue';
import { useTabsUi } from './context';
import type {
  SegmentCompactEmits,
  SegmentCompactItemSlotProps,
  SegmentCompactProps,
  SegmentCompactSlots,
  SegmentOptionData
} from './segment-types';

defineOptions({
  name: 'SegmentCompact'
});

const props = withDefaults(defineProps<SegmentCompactProps<T, S>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  loop: true,
  enableIndicator: true
});

const emit = defineEmits<SegmentCompactEmits<T>>();

defineSlots<SegmentCompactSlots<S>>();

const forwardedProps = useOmitProps(props, ['items', 'enableIndicator', 'listProps', 'triggerProps', 'indicatorProps']);

const ui = useTabsUi();

const getItemKey = (item: S) => String(item.value);

const getItemSlotProps = (item: S, slotProps: { active: boolean }) => {
  return { ...item, ...slotProps } as SegmentCompactItemSlotProps<S>;
};

const handleModelValueChange = (value: AcceptableValue) => {
  emit('update:modelValue', value as NonNullable<T>);
};
</script>

<template>
  <TabsRoot v-bind="forwardedProps" @update:model-value="handleModelValueChange">
    <TabsList v-bind="listProps">
      <TabsTrigger
        v-for="item in items"
        :key="getItemKey(item)"
        v-bind="triggerProps"
        v-slot="slotProps"
        :value="item.value"
        :disabled="item.disabled"
      >
        <slot name="item" v-bind="getItemSlotProps(item, slotProps)">{{ item.label }}</slot>
      </TabsTrigger>
      <TabsIndicator v-if="enableIndicator" v-bind="indicatorProps">
        <slot name="indicator">
          <div :class="ui.indicatorContent" />
        </slot>
      </TabsIndicator>
    </TabsList>
  </TabsRoot>
</template>
