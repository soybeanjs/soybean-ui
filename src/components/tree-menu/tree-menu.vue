<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TreeMenuCompact, provideTreeMenuUi } from '@soybeanjs/headless/tree-menu';
import type { TreeMenuBaseOptionData } from '@soybeanjs/headless/tree-menu';
import { provideBadgeUi } from '@soybeanjs/headless/badge';
import { provideTooltipUi } from '@soybeanjs/headless/tooltip';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { provideMenuUi } from '../menu/context';
import { badgeVariants } from '../badge/variants';
import { tooltipVariants } from '../tooltip/variants';
import { treeMenuVariants } from './variants';
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

const ui = computed(() => {
  const variants = treeMenuVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

const badgeUi = computed(() =>
  badgeVariants({
    color: 'accent',
    size: props.size,
    position: 'top-right'
  })
);

const tooltipUi = computed(() =>
  tooltipVariants({
    size: props.size
  })
);

provideMenuUi(() => ({
  size: props.size
}));
provideBadgeUi(badgeUi);
provideTooltipUi(tooltipUi);
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
