<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { TypographyTitle } from '@soybeanjs/headless/typography';
import { typographyTitleVariants } from '@/styles/typography';
import type { TypographyTitleProps } from './types';

defineOptions({
  name: 'STypographyTitle'
});

const props = withDefaults(defineProps<TypographyTitleProps>(), {
  level: 1,
  as: undefined,
  asChild: false
});

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() => typographyTitleVariants({ level: props.level }, props.class));
</script>

<template>
  <TypographyTitle v-bind="forwardedProps" :class="cls">
    <slot />
  </TypographyTitle>
</template>
