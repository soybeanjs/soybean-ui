<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useForwardListeners, useOmitProps, usePickProps } from '../../composables';
import { useNavigationMenuUi } from './context';
import Arrow from '../arrow/arrow.vue';
import NavigationMenuIndicator from './navigation-menu-indicator.vue';
import NavigationMenuList from './navigation-menu-list.vue';
import NavigationMenuOptionCompact from './navigation-menu-option-compact.vue';
import NavigationMenuRoot from './navigation-menu-root.vue';
import NavigationMenuViewport from './navigation-menu-viewport.vue';
import type { NavigationMenuCompactProps, NavigationMenuCompactEmits, NavigationMenuCompactSlots } from './types';

defineOptions({
  name: 'NavigationMenuCompact'
});

const props = defineProps<NavigationMenuCompactProps>();

const emit = defineEmits<NavigationMenuCompactEmits>();

const slots = defineSlots<NavigationMenuCompactSlots>();

const optionPropKeys = [
  'itemProps',
  'linkProps',
  'triggerProps',
  'contentProps',
  'viewportProps',
  'indicatorProps',
  'listProps',
  'subListProps',
  'subItemProps'
] as const;

const forwardedRootProps = useOmitProps(props, ['items', ...optionPropKeys]);

const forwardedOptionProps = usePickProps(props, [...optionPropKeys]);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = useNavigationMenuUi();
</script>

<template>
  <NavigationMenuRoot v-bind="forwardedRootProps" @update:model-value="emit('update:modelValue', $event)">
    <NavigationMenuList v-bind="listProps">
      <NavigationMenuOptionCompact
        v-for="item in items"
        :key="item.value"
        v-bind="forwardedOptionProps"
        :item="item"
        v-on="listeners"
      >
        <template v-for="slotName in slotNames" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </NavigationMenuOptionCompact>
    </NavigationMenuList>
    <NavigationMenuIndicator v-bind="indicatorProps">
      <Arrow :class="ui.arrow" />
    </NavigationMenuIndicator>
    <NavigationMenuViewport v-bind="viewportProps" />
  </NavigationMenuRoot>
</template>
