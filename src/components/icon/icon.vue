<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import type { IconifyIcon } from '@iconify/vue';
import { useConfigProvider } from '../config-provider';
import type { IconProps, IconValue } from './types';

defineOptions({
  name: 'SIcon'
});

const props = defineProps<IconProps>();

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

function isIconifyIcon(icon: IconValue): icon is IconifyIcon | string {
  if (!icon) {
    return false;
  }

  return typeof icon === 'string' || (typeof icon === 'object' && 'body' in icon);
}
</script>

<template>
  <Icon v-if="isIconifyIcon(icon)" v-bind="forwardedProps" :icon="icon" style="flex-shrink: 0" />
  <component
    v-else-if="icon"
    :is="icon"
    style="flex-shrink: 0"
    :style="{
      width: iconifySize.width,
      height: iconifySize.height
    }"
  />
</template>
