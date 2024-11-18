<script setup lang="ts">
import type { PopperArrowProps } from '../popper';

import { PopperArrow } from '../popper';

export interface MenuArrowProps extends PopperArrowProps {}

const props = defineProps<MenuArrowProps>();
</script>

<template>
  <PopperArrow v-bind="props">
    <slot />
  </PopperArrow>
</template>
