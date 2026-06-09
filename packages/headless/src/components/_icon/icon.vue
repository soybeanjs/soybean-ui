<script setup lang="ts">
import { computed } from 'vue';
import { useConfigProvider } from '../config-provider/context';
import type { IconProps } from './types';

defineOptions({
  name: 'Icon'
});

const props = defineProps<IconProps>();

const config = useConfigProvider();

const Icon = computed(() => config?.iconRender?.(props.icon));
</script>

<template>
  <component :is="Icon" v-if="Icon" />
</template>
