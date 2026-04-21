<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends TabsOptionData<NonNullable<T>> = TabsOptionData<NonNullable<T>>
  "
>
import { useOmitProps } from '../../composables';
import type { AcceptableValue } from '../../types';
import TabsContent from './tabs-content.vue';
import TabsIndicator from './tabs-indicator.vue';
import TabsList from './tabs-list.vue';
import TabsRoot from './tabs-root.vue';
import TabsTrigger from './tabs-trigger.vue';
import { useTabsUi } from './context';
import type {
  TabsCompactContentSlotProps,
  TabsCompactEmits,
  TabsCompactProps,
  TabsCompactSlots,
  TabsCompactTriggerSlotProps,
  TabsOptionData
} from './types';

defineOptions({
  name: 'TabsCompact'
});

const props = withDefaults(defineProps<TabsCompactProps<T, S>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  loop: true,
  enableIndicator: true
});

const emit = defineEmits<TabsCompactEmits<T>>();

defineSlots<TabsCompactSlots<S>>();

const forwardedProps = useOmitProps(props, [
  'items',
  'enableIndicator',
  'listProps',
  'triggerProps',
  'contentProps',
  'indicatorProps'
]);

const ui = useTabsUi();

const getItemKey = (item: S) => String(item.value);

const getTriggerSlotProps = (item: S, slotProps: { active: boolean }) => {
  return { ...item, ...slotProps } as TabsCompactTriggerSlotProps<S>;
};

const getContentSlotProps = (item: S, slotProps: { active: boolean }) => {
  return { ...item, ...slotProps } as TabsCompactContentSlotProps<S>;
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
        <slot name="trigger" v-bind="getTriggerSlotProps(item, slotProps)">{{ item.label }}</slot>
      </TabsTrigger>
      <TabsIndicator v-if="enableIndicator" v-bind="indicatorProps">
        <slot name="indicator">
          <div :class="ui.indicatorContent" />
        </slot>
      </TabsIndicator>
    </TabsList>
    <TabsContent
      v-for="item in items"
      :key="getItemKey(item)"
      v-bind="contentProps"
      v-slot="slotProps"
      :value="item.value"
    >
      <slot name="content" v-bind="getContentSlotProps(item, slotProps)" />
    </TabsContent>
  </TabsRoot>
</template>
