<script setup lang="ts">
import { computed } from 'vue';
import { useKbd, useOmitProps } from '../../composables';
import type { KbdProps } from './types';

defineOptions({
  name: 'Kbd'
});

const props = defineProps<KbdProps>();

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
</script>

<template>
  <kbd v-bind="forwardProps" :data-group="Array.isArray(value) ? '' : undefined">
    <slot>{{ formattedValue }}</slot>
  </kbd>
</template>
