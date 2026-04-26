<script setup lang="ts">
import { computed } from 'vue';
import { Kbd } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { kbdVariants } from './variants';
import type { KbdProps } from './types';

defineOptions({
  name: 'SKbd'
});

const props = withDefaults(defineProps<KbdProps>(), {
  symbolize: true,
  raised: true
});

const delegatedProps = useOmitProps(props, ['class', 'size', 'variant', 'raised']);

const cls = computed(() =>
  cn(
    kbdVariants({
      size: props.size,
      variant: props.variant,
      raised: props.raised
    }),
    props.class
  )
);
</script>

<template>
  <Kbd v-bind="delegatedProps" :class="cls" />
</template>
