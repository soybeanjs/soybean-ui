<script
  setup
  lang="ts"
  generic="T extends ToggleGroupItemData = ToggleGroupItemData, V extends string | string[] = string | string[]"
>
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import SToggleGroupRoot from './toggle-group-root.vue';
import SToggleGroupItem from './toggle-group-item.vue';
import type { ToggleGroupEmits, ToggleGroupItemData, ToggleGroupProps } from './types';

defineOptions({
  name: 'SToggleGroup'
});

const { class: cls, ui, ...delegatedProps } = defineProps<ToggleGroupProps<T, V>>();

const emit = defineEmits<ToggleGroupEmits<V>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SToggleGroupRoot v-bind="forwarded" :class="cls || ui?.groupRoot">
    <SToggleGroupItem
      v-for="(item, index) in items"
      :key="index"
      :class="ui?.toggle"
      :value="item.value"
      :disabled="item.disabled"
    >
      <slot name="item" v-bind="item" />
    </SToggleGroupItem>
  </SToggleGroupRoot>
</template>
