<script
  setup
  lang="ts"
  generic="T extends ToggleGroupItemData = ToggleGroupItemData, V extends string | string[] = string | string[]"
>
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { ToggleGroupEmits, ToggleGroupItemData, ToggleGroupProps } from '../types';
import SToggleGroupRoot from './toggle-group-root.vue';
import SToggleGroupItem from './toggle-group-item.vue';

defineOptions({
  name: 'SToggleGroup'
});

const { class: cls, size, ui, ...delegatedProps } = defineProps<ToggleGroupProps<T, V>>();

const emit = defineEmits<ToggleGroupEmits<V>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SToggleGroupRoot v-bind="forwarded" :class="cls || ui?.groupRoot" :size="size">
    <SToggleGroupItem
      v-for="(item, index) in items"
      :key="index"
      :class="ui?.toggle"
      :size="size"
      :value="item.value"
      :disabled="item.disabled"
    >
      <slot name="item" v-bind="item" />
    </SToggleGroupItem>
  </SToggleGroupRoot>
</template>
