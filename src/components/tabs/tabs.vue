<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends TabsOptionData<NonNullable<T>> = TabsOptionData<NonNullable<T>>
  "
>
import { computed } from 'vue';
import { TabsCompact, provideTabsUi } from '@soybeanjs/headless';
import type { AcceptableValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { tabsVariants } from './variants';
import type { TabsEmits, TabsOptionData, TabsProps, TabsSlots } from './types';

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

const slots = defineSlots<TabsSlots<S>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'fill'
]);

const listeners = useForwardListeners(emit);
const slotNames = computed(() => keysOf(slots));
const compactItems = computed(() => props.items as TabsOptionData<NonNullable<T>>[]);

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
  <!-- @vue-ignore generic props are validated by TabsProps/TabsCompactProps -->
  <TabsCompact v-bind="forwardedProps" :items="compactItems" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TabsCompact>
</template>
