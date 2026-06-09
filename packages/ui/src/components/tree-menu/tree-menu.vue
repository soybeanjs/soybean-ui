<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TreeMenuCompact, provideTreeMenuUi } from '@soybeanjs/headless/tree-menu';
import type { TreeMenuBaseOptionData } from '@soybeanjs/headless/tree-menu';
import { keysOf } from '@soybeanjs/utils';
import { treeMenuVariants } from '@/styles/tree-menu';
import { provideMenuUi } from '../menu/context';
import type { TreeMenuProps, TreeMenuEmits, TreeMenuSlots } from './types';

defineOptions({
  name: 'STreeMenu'
});

const props = withDefaults(defineProps<TreeMenuProps<T>>(), {
  collapsed: undefined
});

const emit = defineEmits<TreeMenuEmits>();

const slots = defineSlots<TreeMenuSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => treeMenuVariants({ size: props.size }, props.ui, { root: props.class }));

provideMenuUi(() => ({
  size: props.size
}));
provideTreeMenuUi(ui);
</script>

<template>
  <TreeMenuCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore slot type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TreeMenuCompact>
</template>
