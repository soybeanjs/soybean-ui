<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from '../types';

defineOptions({
  name: 'SNavigationMenuRoot'
});

const { class: cls, ...delegatedProps } = defineProps<NavigationMenuRootProps>();

const emit = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { root } = navigationMenuVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <NavigationMenuRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </NavigationMenuRoot>
</template>
