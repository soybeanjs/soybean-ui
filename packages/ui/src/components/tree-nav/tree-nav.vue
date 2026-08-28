<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TreeNavCompact, provideTreeNavUi } from '@soybeanjs/headless/tree-nav';
import type { DefinedValue } from '@soybeanjs/headless/types';
import { keysOf } from '@soybeanjs/utils';
import { treeNavVariants } from '@/styles/tree-nav';
import { provideMenuUi } from '../menu/context';
import type { TreeNavProps, TreeNavEmits, TreeNavSlots } from './types';

defineOptions({
  name: 'STreeNav'
});

const props = defineProps<TreeNavProps<T>>();

const emit = defineEmits<TreeNavEmits<T>>();

const slots = defineSlots<TreeNavSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'variant', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(key => key !== 'more-trigger'));

const ui = computed(() =>
  treeNavVariants(
    {
      size: props.size,
      variant: props.variant,
      collapsible: props.collapsible
    },
    props.ui,
    { root: props.class }
  )
);

provideTreeNavUi(ui);
provideMenuUi(() => props);
</script>

<template>
  <TreeNavCompact v-bind="forwardedProps" v-on="listeners">
    <template #more-trigger="entry">
      <slot name="more-trigger" :label="entry.label" :icon="entry.icon" />
    </template>
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TreeNavCompact>
</template>
