<script setup lang="ts">
import { computed } from 'vue';
import { SIcon } from '@soybeanjs/ui';
import { appLogoVariants } from '@/styles/app-logo';
import type { AppLogoProps } from './types';

defineOptions({
  name: 'SAppLogo'
});

const props = withDefaults(defineProps<AppLogoProps>(), {
  logo: undefined,
  title: undefined,
  showTitle: true,
  inverted: false
});

const ui = computed(() => appLogoVariants({ inverted: props.inverted }, { root: props.class }));
</script>

<template>
  <div :class="ui.root">
    <span :class="ui.logo">
      <SIcon v-if="logo" :icon="logo" class="size-6 shrink-0" />
    </span>
    <span v-if="showTitle && title" :class="ui.title">{{ title }}</span>
  </div>
</template>
