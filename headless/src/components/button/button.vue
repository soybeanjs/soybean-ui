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

const forwardedProps = useOmitProps(props, ['disabled', 'type']);

const disabled = computed(() => (props.as === 'button' ? props.disabled : undefined));

const dataDisabled = computed(() => (props.disabled ? '' : undefined));

const ariaDisabled = computed(() => (props.disabled ? true : undefined));

const buttonType = computed(() => {
  if (props.as !== 'button') return undefined;

  return props.type ?? 'button';
});

const onClick = (event: PointerEvent) => {
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
    data-soybean-button
    :disabled="disabled"
    :aria-disabled="ariaDisabled"
    :data-disabled="dataDisabled"
    :tabindex="disabled ? '-1' : undefined"
    :type="buttonType"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
