<script setup lang="ts">
import { computed } from 'vue';
import { buttonVariants } from '@soybean-ui/variants';
import { useButtonRovingFocusContext, useRovingFocusItem } from './context';

interface Props {
  value: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const { modelValue, onModelValueChange } = useButtonRovingFocusContext('Button');

const isSelected = computed(
  () => modelValue.value !== undefined && props.value !== undefined && modelValue.value === props.value
);
const { rovingFocusItemProps, rovingFocusItemEvents } = useRovingFocusItem({
  active: isSelected,
  focusable: computed(() => !props.disabled)
});

const buttonClasses = computed(() => buttonVariants({ variant: isSelected.value ? 'solid' : 'pure' }));

const onClick = () => {
  if (props.disabled) {
    return;
  }

  onModelValueChange(props.value);
};

const onFocus = (event: FocusEvent) => {
  rovingFocusItemEvents.focus();

  if (event.defaultPrevented) return;

  if (modelValue.value !== undefined) {
    onClick();
  }
};
</script>

<template>
  <button
    v-bind="rovingFocusItemProps"
    :class="buttonClasses"
    :value="value"
    :disabled="disabled"
    v-on="{ ...rovingFocusItemEvents, focus: onFocus, click: onClick }"
  >
    <slot />
  </button>
</template>
