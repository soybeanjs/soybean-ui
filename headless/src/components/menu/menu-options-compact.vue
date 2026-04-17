<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useForwardListeners, useOmitProps } from '../../composables';
import { getTreePaths, transformPropsToContext } from '../../shared';
import type { DefinedValue } from '../../types';
import { provideMenuOptionsCompactContext } from './context';
import MenuGroup from './menu-group.vue';
import MenuOptionCompact from './menu-option-compact.vue';
import type { MenuOptionsCompactEmits, MenuOptionsCompactProps, MenuOptionsCompactSlots } from './types';

defineOptions({
  name: 'MenuOptionsCompact',
  inheritAttrs: false
});

const props = defineProps<MenuOptionsCompactProps<T>>();

const emit = defineEmits<MenuOptionsCompactEmits<T>>();

const slots = defineSlots<MenuOptionsCompactSlots<T>>();

const forwardedItemProps = useOmitProps(props, ['items']);

const forwardedListeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const activePaths = computed(() => {
  if (props.activeValue === undefined) {
    return [] as T[];
  }

  return getTreePaths(props.activeValue, props.items);
});

provideMenuOptionsCompactContext({
  ...transformPropsToContext(props, ['activeValue']),
  activePaths
});
</script>

<template>
  <MenuGroup v-bind="groupProps">
    <MenuOptionCompact
      v-for="item in items"
      :key="item.value"
      v-bind="forwardedItemProps"
      :item="item"
      v-on="forwardedListeners"
    >
      <template v-for="slotName in slotNames" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </MenuOptionCompact>
  </MenuGroup>
</template>
