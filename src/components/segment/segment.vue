<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
  "
>
import { computed } from 'vue';
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger, provideTabsThemeContext } from '@soybeanjs/headless';
import type { AcceptableValue, TabsRootEmits } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tabsVariants } from '@/variants/tabs';
import type { SegmentOptionData, SegmentProps } from './types';

defineOptions({
  name: 'SSegment'
});

const props = withDefaults(defineProps<SegmentProps<T, S>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  loop: true,
  fill: 'auto',
  enableIndicator: true
});

const emit = defineEmits<TabsRootEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'items',
  'fill',
  'enableIndicator',
  'listProps',
  'triggerProps',
  'indicatorProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = tabsVariants({
    size: props.size,
    orientation: props.orientation,
    shape: props.shape,
    fill: props.fill,
    enableIndicator: props.enableIndicator
  });

  return mergeSlotVariants(variants, props.ui);
});

provideTabsThemeContext({
  ui
});
</script>

<template>
  <TabsRoot v-bind="forwardedProps" v-on="listeners">
    <TabsList v-bind="listProps">
      <TabsTrigger
        v-for="item in items"
        v-bind="triggerProps"
        :key="String(item.value)"
        v-slot="slotProps"
        :value="item.value"
        :disabled="item.disabled"
      >
        <slot name="item" v-bind="{ ...item, ...slotProps }">{{ item.label }}</slot>
      </TabsTrigger>
      <TabsIndicator v-if="enableIndicator" v-bind="indicatorProps">
        <div :class="ui.indicatorContent" />
      </TabsIndicator>
    </TabsList>
  </TabsRoot>
</template>
