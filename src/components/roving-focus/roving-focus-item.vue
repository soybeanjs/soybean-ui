<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { useRovingFocusItem } from './context';
import type { RovingFocusItemProps } from './types';

defineOptions({
  name: 'RovingFocusItem'
});

const props = withDefaults(defineProps<RovingFocusItemProps>(), {
  focusable: true
});

const { rovingFocusItemProps, rovingFocusItemEvents } = useRovingFocusItem(transformPropsToContext(props));
</script>

<template>
  <Primitive v-bind="rovingFocusItemProps" :class="props.class" :as="as" v-on="rovingFocusItemEvents">
    <slot />
  </Primitive>
</template>
