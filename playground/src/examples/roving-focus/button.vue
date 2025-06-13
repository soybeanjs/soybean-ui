<script setup lang="ts">
import { computed } from 'vue';
import { SButton } from '@ui';
import { RovingFocusItem } from '@headless';
import { useButtonRovingFocusContext } from './context';

interface Props {
  value: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const { modelValue, onModelValueChange } = useButtonRovingFocusContext('Button');

const isSelected = computed(
  () => modelValue.value !== undefined && props.value !== undefined && modelValue.value === props.value
);

const onClick = () => {
  if (props.disabled) {
    return;
  }

  onModelValueChange(props.value);
};

const onFocus = () => {
  if (modelValue.value !== undefined) {
    onClick();
  }
};
</script>

<template>
  <RovingFocusItem as="template" :active="isSelected" :focusable="!disabled">
    <SButton
      :variant="isSelected ? 'solid' : 'pure'"
      :value="value"
      :disabled="disabled"
      @click="onClick"
      @focus="onFocus"
    >
      <slot />
    </SButton>
  </RovingFocusItem>
</template>
