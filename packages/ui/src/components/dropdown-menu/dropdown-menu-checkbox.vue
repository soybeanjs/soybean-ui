<script setup lang="ts" generic="T extends DropdownMenuCheckboxOption = DropdownMenuCheckboxOption">
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useEmitAsProps, useForwardProps } from '@soybean-ui/primitive';
import { computedOmit, computedOmitEmits } from '../../shared';
import SDropdownMenuWrapper from './dropdown-menu-wrapper.vue';
import SDropdownMenuLabel from './dropdown-menu-label.vue';
import SDropdownMenuCheckboxItem from './dropdown-menu-checkbox-item.vue';
import SDropdownMenuShortcut from './dropdown-menu-shortcut.vue';
import SDropdownMenuSeparator from './dropdown-menu-separator.vue';
import type {
  CheckAction,
  DropdownMenuCheckboxEmits,
  DropdownMenuCheckboxOption,
  DropdownMenuCheckboxProps
} from './types';

defineOptions({
  name: 'SDropdownMenuCheckbox'
});

const props = defineProps<DropdownMenuCheckboxProps<T>>();

const emit = defineEmits<DropdownMenuCheckboxEmits>();

const forwardedEmits = useEmitAsProps(emit) as Record<keyof DropdownMenuCheckboxEmits, any>;

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
  'groupSeparator'
]);

const forwardedWrapperProps = useForwardProps(delegatedWrapperProps);

const forwardedWrapperEmits = computedOmitEmits(forwardedEmits, ['update:modelValue']);

const forwardedWrapper = computed(() => ({
  ...forwardedWrapperProps.value,
  ...forwardedWrapperEmits.value
}));

const checkValue = ref(props.modelValue || props.defaultValue || []) as Ref<string[]>;

function handleUpdateChecked(item: T, checked: boolean) {
  if (checked) {
    checkValue.value = [...checkValue.value, item.value];
  } else {
    checkValue.value = checkValue.value.filter(v => v !== item.value);
  }

  const action: CheckAction = checked ? 'check' : 'uncheck';

  emit('update:modelValue', checkValue.value, item, action);
}

watch(
  () => props.modelValue,
  value => {
    checkValue.value = value || [];
  }
);
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
    <template v-for="item in items" :key="item.value">
      <SDropdownMenuCheckboxItem
        :class="itemClass"
        :size="size"
        :disabled="item.disabled"
        :text-value="item.textValue || item.label"
        :model-value="checkValue.includes(item.value)"
        @update:model-value="handleUpdateChecked(item, $event)"
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
      </SDropdownMenuCheckboxItem>
      <SDropdownMenuSeparator v-if="separator || item.separator" :class="separatorClass" />
    </template>
  </SDropdownMenuWrapper>
</template>

<style scoped></style>
