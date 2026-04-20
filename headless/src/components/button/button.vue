<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import type { ButtonEmits, ButtonProps } from './types';

defineOptions({
  name: 'Button'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button'
});

const emit = defineEmits<ButtonEmits>();

const dataDisabled = computed(() => (props.disabled ? '' : undefined));

const ariaDisabled = computed(() => (props.disabled ? true : undefined));

const forwardedProps = useOmitProps(props, ['disabled', 'type']);

const buttonType = computed(() => {
  if (props.as !== 'button') return undefined;

  return props.type ?? 'button';
});

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();

    return;
  }

  emit('click', event);
};
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :data-disabled="dataDisabled"
    :aria-disabled="ariaDisabled"
    :tabindex="disabled ? '-1' : undefined"
    :type="buttonType"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
