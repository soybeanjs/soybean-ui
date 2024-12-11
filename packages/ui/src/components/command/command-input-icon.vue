<script setup lang="ts">
import { computed } from 'vue';
import { Search } from 'lucide-vue-next';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandInputIconProps } from './types';

defineOptions({
  name: 'SCommandInputIcon'
});

const { class: cls } = defineProps<CommandInputIconProps>();

const { inputIcon } = commandVariants();

const mergedCls = computed(() => cn(inputIcon(), cls));
</script>

<template>
  <Search :class="mergedCls" />
</template>
