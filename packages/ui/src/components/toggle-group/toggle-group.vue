<script
  setup
  lang="ts"
  generic="
    T extends ToggleGroupItemData = ToggleGroupItemData,
    V extends string | string[] = string | string[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { useForwardPropsEmits } from 'radix-vue';
import type { SingleOrMultipleType } from '../../types';
import SToggleGroupRoot from './toggle-group-root.vue';
import SToggleGroupItem from './toggle-group-item.vue';
import type { ToggleGroupEmits, ToggleGroupItemData, ToggleGroupProps } from './types';

defineOptions({
  name: 'SToggleGroup'
});

const props = defineProps<ToggleGroupProps<T, V, E>>();

const emit = defineEmits<ToggleGroupEmits<V>>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <SToggleGroupRoot v-bind="forwarded">
    <SToggleGroupItem v-for="item in items" :key="item.value" :value="item.value" :disabled="item.disabled">
      <slot name="item" v-bind="item" />
    </SToggleGroupItem>
  </SToggleGroupRoot>
</template>

<style scoped></style>
