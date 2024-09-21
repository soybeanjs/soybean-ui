<script
  setup
  lang="ts"
  generic="V extends string | string[] = string | string[], E extends SingleOrMultipleType = SingleOrMultipleType"
>
import { computed } from 'vue';
import { ToggleGroupRoot, useForwardPropsEmits } from 'radix-vue';
import type { ToggleGroupRootEmits } from 'radix-vue';
import { cn, toggleVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SingleOrMultipleType } from '../../types';
import type { ToggleGroupRootProps } from './types';

defineOptions({
  name: 'SToggleGroupRoot'
});

const props = defineProps<ToggleGroupRootProps<V, E>>();

const emit = defineEmits<ToggleGroupRootEmits>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { groupRoot } = toggleVariants({ size: props.size });

  return cn(groupRoot(), props.class);
});
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" :class="cls">
    <slot />
  </ToggleGroupRoot>
</template>

<style scoped></style>
