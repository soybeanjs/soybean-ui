<script setup lang="ts">
import { computed } from 'vue';
import { cn, layoutVariants } from '@soybean-ui/variants';
import { PanelLeft } from 'lucide-vue-next';
import SButtonIcon from '../../button/source/button-icon.vue';
import { useLayout } from '../context';
import type { LayoutTriggerProps } from '../types';

defineOptions({
  name: 'SLayoutTrigger'
});

const { class: cls, size } = defineProps<LayoutTriggerProps>();

const { toggleSidebar } = useLayout();

const { trigger } = layoutVariants();

const mergedCls = computed(() => cn(trigger(), cls));
</script>

<template>
  <SButtonIcon :class="mergedCls" :size="size" @click="toggleSidebar">
    <PanelLeft />
  </SButtonIcon>
</template>
