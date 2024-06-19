<script setup lang="ts">
import {
  NavigationMenuLink,
  type NavigationMenuLinkEmits,
  type NavigationMenuLinkProps,
  useForwardPropsEmits
} from 'radix-vue';

const props = defineProps<NavigationMenuLinkProps>();
const emit = defineEmits<NavigationMenuLinkEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <NavigationMenuLink v-bind="forwarded">
    <slot />
  </NavigationMenuLink>
</template>
