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
  primary: {
    base: 'bg-primary',
    error: 'data-[status=error]:bg-primary'
  },
  destructive: {
    base: 'bg-destructive',
    error: 'data-[status=error]:bg-destructive'
  },
  success: {
    base: 'bg-success',
    error: 'data-[status=error]:bg-success'
  },
  warning: {
    base: 'bg-warning',
    error: 'data-[status=error]:bg-warning'
  },
  info: {
    base: 'bg-info',
    error: 'data-[status=error]:bg-info'
  },
  carbon: {
    base: 'bg-carbon',
    error: 'data-[status=error]:bg-carbon'
  },
  secondary: {
    base: 'bg-secondary-foreground/20',
    error: 'data-[status=error]:bg-secondary-foreground/20'
  },
  accent: {
    base: 'bg-accent-foreground/20',
    error: 'data-[status=error]:bg-accent-foreground/20'
  }
};

const ui = computed(() => {
  const variants = progressVariants({
    size: props.size
  });

  return mergeUi(
    {
      root: `${variants.root()} pointer-events-none fixed inset-x-0 top-0 z-100 rounded-none bg-transparent shadow-none`,
      indicator: `${variants.indicator()} rounded-none shadow-sm transition-[transform,width] duration-200 ease-out ${
        indicatorColorClasses[props.color].base
      } ${indicatorColorClasses[props.errorColor].error}`
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
