<script setup lang="ts" generic="T extends TabsOptionData = TabsOptionData">
import { computed } from 'vue';
import { TabsCompact, provideTabsUi } from '@soybeanjs/headless/tabs';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { tabsVariants } from '@/styles/tabs';
import type { TabsProps, TabsEmits, TabsSlots, TabsOptionData } from './types';

defineOptions({
  name: 'STabs'
});

const props = withDefaults(defineProps<TabsProps<T>>(), {
  modelValue: undefined,
  unmountOnHide: true,
  fill: 'full',
  loop: true,
  enableIndicator: true
});

const emit = defineEmits<TabsEmits<T['value']>>();

const slots = defineSlots<TabsSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'fill']);

const listeners = useForwardListeners(emit);
const slotNames = computed(() => keysOf(slots));

const ui = computed(() =>
  tabsVariants(
    {
      size: props.size,
      orientation: props.orientation,
      fill: props.fill,
      enableIndicator: props.enableIndicator
    },
    props.ui,
    { root: props.class }
  )
);

provideTabsUi(ui);
</script>

<template>
  <TabsCompact v-bind="forwardedProps" :items="items" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TabsCompact>
</template>
