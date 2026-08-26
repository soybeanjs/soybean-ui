<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useForwardListeners, useOmitProps, usePickProps } from '../../composables';
import NavMenuList from './nav-menu-list.vue';
import NavMenuOptionCompact from './nav-menu-option-compact.vue';
import NavMenuRoot from './nav-menu-root.vue';
import NavMenuViewport from './nav-menu-viewport.vue';
import type { NavMenuCompactEmits, NavMenuCompactProps, NavMenuCompactSlots } from './types';

defineOptions({
  name: 'NavMenuCompact'
});

const props = defineProps<NavMenuCompactProps>();

const emit = defineEmits<NavMenuCompactEmits>();

const slots = defineSlots<NavMenuCompactSlots>();

const optionPropKeys = [
  'itemProps',
  'linkProps',
  'triggerProps',
  'contentProps',
  'viewportProps',
  'listProps'
] as const;

const forwardedRootProps = useOmitProps(props, ['items', ...optionPropKeys]);

const forwardedOptionProps = usePickProps(props, [...optionPropKeys]);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));
</script>

<template>
  <NavMenuRoot v-bind="forwardedRootProps" @update:model-value="emit('update:modelValue', $event)">
    <NavMenuList v-bind="listProps">
      <NavMenuOptionCompact
        v-for="item in items"
        :key="item.value"
        v-bind="forwardedOptionProps"
        :item="item"
        v-on="listeners"
      >
        <template v-for="slotName in slotNames" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </NavMenuOptionCompact>
    </NavMenuList>
    <NavMenuViewport v-bind="viewportProps" />
  </NavMenuRoot>
</template>
