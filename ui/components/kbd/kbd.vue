<script setup lang="ts">
import { computed } from 'vue';
import { Kbd } from '@headless';
import { useOmitProps } from '@headless/composables';
import { kbdVariants } from '@variants/kbd';
import type { KbdProps } from './types';

defineOptions({
  name: 'SKbd'
});

const props = withDefaults(defineProps<KbdProps>(), {
  symbolize: true
});

const delegatedProps = useOmitProps(props, ['class', 'size', 'variant']);

const cls = computed(() =>
  kbdVariants({
    size: props.size,
    variant: props.variant
  })
);
</script>

<template>
  <Kbd v-bind="delegatedProps" :class="cls" />
</template>
