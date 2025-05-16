<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuContentEmits, NavigationMenuContentProps } from '../types';

defineOptions({
  name: 'SNavigationMenuContent'
});

const { class: cls, ...delegatedProps } = defineProps<NavigationMenuContentProps>();

const emit = defineEmits<NavigationMenuContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = navigationMenuVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <NavigationMenuContent v-bind="forwarded" :class="mergedCls" :force-mount="forceMount">
    <slot />
  </NavigationMenuContent>
</template>
