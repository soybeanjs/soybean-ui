<script setup lang="ts">
import { computed } from 'vue';
import { useConfigProvider } from '../config-provider/context';
import type { IconRenderProps } from './types';

defineOptions({
  name: 'IconRender'
});

const props = defineProps<IconRenderProps>();

const config = useConfigProvider();

const Icon = computed(() => config?.iconRender?.(props.icon));
</script>

<template>
  <component :is="Icon" v-if="Icon" />
</template>
