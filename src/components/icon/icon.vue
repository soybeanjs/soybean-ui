<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import { isNuxt } from '@soybeanjs/headless/shared';
import { Icon as Iconify } from '@iconify/vue';
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

const NuxtIcon = resolveComponent('Icon');

const renderNuxtIcon = computed(() => isNuxt && typeof props.icon === 'string' && NuxtIcon);

const nuxtIconMode = computed(() => ((props.mode ?? 'svg') === 'svg' ? 'svg' : 'css'));

function isIconifyIcon(icon: IconValue): icon is IconifyIcon | string {
  if (!icon) {
    return false;
  }

  if (isNuxt && NuxtIcon) {
    return false;
  }

  return typeof icon === 'string' || (typeof icon === 'object' && 'body' in icon);
}
</script>

<template>
  <Iconify v-if="isIconifyIcon(icon)" v-bind="forwardedProps" :icon="icon" :ssr="isNuxt" style="flex-shrink: 0" />
  <NuxtIcon
    v-else-if="renderNuxtIcon"
    :name="icon"
    :mode="nuxtIconMode"
    :width="iconifySize.width"
    :height="iconifySize.height"
    :customize="customise"
    style="flex-shrink: 0"
  />
  <component
    :is="icon"
    v-else-if="icon"
    style="flex-shrink: 0"
    :style="{
      width: iconifySize.width,
      height: iconifySize.height
    }"
  />
</template>
