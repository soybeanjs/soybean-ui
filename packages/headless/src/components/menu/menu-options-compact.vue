<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { keysOf, getTreePaths, transformPropsToContext } from '../../shared';
import { useForwardListeners, useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import { provideMenuOptionsCompactContext } from './context';
import MenuGroup from './menu-group.vue';
import MenuOptionCompact from './menu-option-compact.vue';
import type { MenuOptionsCompactProps, MenuOptionsCompactEmits, MenuOptionsCompactSlots } from './types';

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

const selectedPaths = computed(() => {
  if (props.selectedValue === undefined) {
    return [] as T[];
  }

  return getTreePaths(props.selectedValue, props.items);
});

provideMenuOptionsCompactContext({
  ...transformPropsToContext(props, ['selectedValue']),
  selectedPaths
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
