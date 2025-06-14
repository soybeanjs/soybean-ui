<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useConfigProvider } from '../config-provider';
import type { IconProps } from './types';

defineOptions({
  name: 'SIcon'
});

const props = withDefaults(defineProps<IconProps>(), {
  width: '1.25em',
  height: '1.25em'
});

const configProvider = useConfigProvider();

const iconifySize = computed(() => {
  const { width, height } = props;

  const config = configProvider?.iconify?.value || {};

  return {
    width: width || config.width,
    height: height || config.height
  };
});

const forwardedProps = computed(() => ({
  ...props,
  ...iconifySize.value
}));
</script>

<template>
  <Icon v-bind="forwardedProps" />
</template>
