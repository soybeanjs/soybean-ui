<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';
import { LoadingBar, provideProgressUi } from '@soybeanjs/headless/progress';
import { mergeUi } from '@/theme';
import { useLoadingBar } from './context';
import { progressVariants } from './variants';
import type { LoadingBarProviderProps } from './types';

defineOptions({
  name: 'SLoadingBar'
});

const props = withDefaults(defineProps<LoadingBarProviderProps>(), {
  color: 'primary',
  errorColor: 'destructive',
  size: 'xs',
  ui: () => ({})
});

const indicatorColorClasses = {
  primary: 'bg-primary',
  destructive: 'bg-destructive',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
  carbon: 'bg-carbon',
  secondary: 'bg-secondary-foreground/20',
  accent: 'bg-accent-foreground/20'
};

const indicatorErrorColorClasses = {
  primary: 'data-[status=error]:bg-primary',
  destructive: 'data-[status=error]:bg-destructive',
  success: 'data-[status=error]:bg-success',
  warning: 'data-[status=error]:bg-warning',
  info: 'data-[status=error]:bg-info',
  carbon: 'data-[status=error]:bg-carbon',
  secondary: 'data-[status=error]:bg-secondary-foreground/20',
  accent: 'data-[status=error]:bg-accent-foreground/20'
};

const ui = computed(() => {
  const variants = progressVariants({
    size: props.size
  });

  return mergeUi(
    {
      root: `${variants.root()} pointer-events-none fixed inset-x-0 top-0 z-100 rounded-none bg-transparent shadow-none`,
      indicator: `${variants.indicator()} rounded-none shadow-sm transition-[transform,width] duration-200 ease-out ${
        indicatorColorClasses[props.color]
      } ${indicatorErrorColorClasses[props.errorColor]}`
    },
    props.ui
  );
});

provideProgressUi(ui);

onBeforeUnmount(() => {
  useLoadingBar().clear();
});
</script>

<template>
  <LoadingBar>
    <slot />
  </LoadingBar>
</template>
