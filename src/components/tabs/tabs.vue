<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends TabsOptionData<NonNullable<T>> = TabsOptionData<NonNullable<T>>
  "
>
import { computed } from 'vue';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, provideTabsUi } from '@soybeanjs/headless';
import type { AcceptableValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tabsVariants } from './variants';
import type { TabsEmits, TabsOptionData, TabsProps } from './types';

defineOptions({
  name: 'STabs'
});

const props = withDefaults(defineProps<TabsProps<T, S>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  fill: 'full',
  loop: true,
  enableIndicator: true
});

const emit = defineEmits<TabsEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'fill',
  'loop',
  'enableIndicator',
  'listProps',
  'triggerProps',
  'contentProps',
  'indicatorProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = tabsVariants({
    size: props.size,
    orientation: props.orientation,
    fill: props.fill,
    enableIndicator: props.enableIndicator
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTabsUi(ui);
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
        <slot name="trigger" v-bind="{ ...item, ...slotProps }">{{ item.label }}</slot>
      </TabsTrigger>
      <TabsIndicator v-if="enableIndicator" v-bind="indicatorProps">
        <div :class="ui.indicatorContent" />
      </TabsIndicator>
    </TabsList>
    <TabsContent
      v-for="item in items"
      v-slot="slotProps"
      v-bind="contentProps"
      :key="String(item.value)"
      :value="item.value"
    >
      <slot name="content" v-bind="{ ...item, ...slotProps }" />
    </TabsContent>
  </TabsRoot>
</template>
