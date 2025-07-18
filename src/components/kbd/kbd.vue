<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useKbd, useOmitProps } from '../../composables';
import type { KbdProps } from './types';

defineOptions({
  name: 'Kbd'
});

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'span'
});

const forwardProps = useOmitProps(props, ['value', 'iconization']);

const { getKeyboardKey } = useKbd();

const formattedValue = computed(() => {
  const values = Array.isArray(props.value) ? props.value : [props.value];

  return values
    .map(value => {
      if (props.iconization) {
        return getKeyboardKey(value);
      }

      return value;
    })
    .join('');
});

const dataTag = computed(() => (props.as === 'kbd' ? 'kbd' : undefined));
</script>

<template>
  <Primitive v-bind="forwardProps" :data-tag="dataTag" :data-group="Array.isArray(value) ? '' : undefined">
    <slot>{{ formattedValue }}</slot>
  </Primitive>
</template>
