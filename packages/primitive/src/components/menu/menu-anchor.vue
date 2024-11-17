<script setup lang="ts">
import { PopperAnchor, type PopperAnchorProps } from '../popper';

interface MenuAnchorProps extends PopperAnchorProps {}

const props = defineProps<MenuAnchorProps>();
</script>

<template>
  <PopperAnchor v-bind="props">
    <slot />
  </PopperAnchor>
</template>
