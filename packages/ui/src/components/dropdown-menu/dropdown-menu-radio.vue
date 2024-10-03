<script setup lang="ts" generic="T extends DropdownMenuRadioOption = DropdownMenuRadioOption">
import { computed } from 'vue';
import { DropdownMenuRadioGroup, useEmitAsProps, useForwardProps } from 'radix-vue';
import { computedOmit, computedOmitEmits } from '../../shared';
import SDropdownMenuWrapper from './dropdown-menu-wrapper.vue';
import SDropdownMenuLabel from './dropdown-menu-label.vue';
import SDropdownMenuRadioItem from './dropdown-menu-radio-item.vue';
import SDropdownMenuShortcut from './dropdown-menu-shortcut.vue';
import SDropdownMenuSeparator from './dropdown-menu-separator.vue';
import type { DropdownMenuRadioEmits, DropdownMenuRadioOption, DropdownMenuRadioProps } from './types';

defineOptions({
  name: 'SDropdownMenuRadio'
});

const props = defineProps<DropdownMenuRadioProps<T>>();

const emit = defineEmits<DropdownMenuRadioEmits>();

const forwardedEmits = useEmitAsProps(emit) as Record<keyof DropdownMenuRadioEmits, any>;

const delegatedWrapperProps = computedOmit(props, [
  'separator',
  'groupLabelClass',
  'itemClass',
  'itemIconClass',
  'separatorClass',
  'shortcutClass',
  'items',
  'modelValue',
  'defaultValue',
  'groupLabel',
  'groupSeparator',
  'indicatorClass',
  'indicatorIconRootClass',
  'indicatorIconClass'
]);

const forwardedWrapperProps = useForwardProps(delegatedWrapperProps);

const forwardedWrapperEmits = computedOmitEmits(forwardedEmits, ['update:modelValue']);

const forwardedWrapper = computed(() => ({
  ...forwardedWrapperProps.value,
  ...forwardedWrapperEmits.value
}));

const radioValue = computed({
  get() {
    return props.modelValue || props.defaultValue || '';
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <SDropdownMenuWrapper v-bind="forwardedWrapper">
    <template #trigger>
      <slot name="trigger" :size="size" />
    </template>
    <SDropdownMenuLabel v-if="groupLabel" :class="groupLabelClass" :size="size">
      {{ groupLabel }}
    </SDropdownMenuLabel>
    <SDropdownMenuSeparator v-if="groupLabel && (separator || groupSeparator)" :class="separatorClass" />
    <DropdownMenuRadioGroup v-model="radioValue">
      <template v-for="item in items" :key="item.value">
        <SDropdownMenuRadioItem
          :class="itemClass"
          :size="size"
          :disabled="item.disabled"
          :text-value="item.textValue || item.label"
          :value="item.value"
          :indicator-class
          :indicator-icon-root-class
          :indicator-icon-class
        >
          <template #indicatorIcon>
            <slot name="indicatorIcon" />
          </template>
          <slot name="item" :item="item">
            <component :is="item.icon" v-if="item.icon" :class="itemIconClass" />
            <span>{{ item.label }}</span>
            <SDropdownMenuShortcut v-if="item.shortcut" :class="shortcutClass" :size="size">
              {{ item.shortcut }}
            </SDropdownMenuShortcut>
          </slot>
        </SDropdownMenuRadioItem>
        <SDropdownMenuSeparator v-if="separator || item.separator" :class="separatorClass" />
      </template>
    </DropdownMenuRadioGroup>
  </SDropdownMenuWrapper>
</template>

<style scoped></style>
