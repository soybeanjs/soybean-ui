<script setup lang="ts">
import { computed } from 'vue';
import { buttonVariants } from '@soybean-ui/variants';
import { RovingFocusItem } from '../../../../src/components/roving-focus';
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

const buttonClasses = computed(() => buttonVariants({ variant: isSelected.value ? 'solid' : 'pure' }));

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
    <button :class="buttonClasses" :value="value" :disabled="disabled" @click="onClick" @focus="onFocus">
      <slot />
    </button>
  </RovingFocusItem>
</template>
