<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import MenuSeparator from '../separator/separator-root.vue';
import IconRender from '../icon/icon-render.vue';
import Kbd from '../kbd/kbd.vue';
import { useMenuUi } from './context';
import { useCommonSlotNames } from './hooks';
import MenuCheckboxGroup from './menu-checkbox-group.vue';
import MenuCheckboxItem from './menu-checkbox-item.vue';
import MenuGroupLabel from './menu-group-label.vue';
import MenuItemIndicator from './menu-item-indicator.vue';
import MenuItemSlotCompact from './menu-item-slot-compact.vue';
import type {
  MenuCheckboxOptionsCompactEmits,
  MenuCheckboxOptionsCompactProps,
  MenuCheckboxOptionsCompactSlots
} from './types';

defineOptions({
  name: 'MenuCheckboxOptionsCompact'
});

const props = defineProps<MenuCheckboxOptionsCompactProps<T>>();

const emit = defineEmits<MenuCheckboxOptionsCompactEmits<T>>();

const slots = defineSlots<MenuCheckboxOptionsCompactSlots<T>>();

const forwardedProps = useOmitProps(props, [
  'items',
  'groupLabelProps',
  'checkboxItemProps',
  'indicatorProps',
  'shortcutProps',
  'separatorProps'
]);

const commonSlotNames = useCommonSlotNames(slots);

const ui = useMenuUi();
</script>

<template>
  <MenuCheckboxGroup v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="item in items" :key="item.value">
      <MenuGroupLabel v-if="item.isGroupLabel" v-bind="groupLabelProps">
        <MenuItemSlotCompact :icon="item.icon" :label="item.label">
          <template v-for="slotName in commonSlotNames">
            <slot :name="slotName" v-bind="item" />
          </template>
        </MenuItemSlotCompact>
      </MenuGroupLabel>
      <MenuCheckboxItem
        v-else
        v-bind="checkboxItemProps"
        :value="item.value"
        :disabled="item.disabled"
        :text-value="item.textValue"
        @select="emit('select', item, $event)"
      >
        <MenuItemSlotCompact :icon="item.icon" :label="item.label">
          <template #indicator>
            <MenuItemIndicator v-bind="indicatorProps">
              <slot name="item-indicator-icon" v-bind="item">
                <IconRender icon="lucide:check" />
              </slot>
            </MenuItemIndicator>
          </template>
          <template v-for="slotName in commonSlotNames">
            <slot :name="slotName" v-bind="item" />
          </template>
          <template v-if="item.shortcut" #shortcut>
            <Kbd v-bind="shortcutProps" :value="item.shortcut" :class="ui.shortcut" />
          </template>
        </MenuItemSlotCompact>
      </MenuCheckboxItem>
      <MenuSeparator v-if="item.separator" v-bind="separatorProps" />
    </template>
  </MenuCheckboxGroup>
</template>
