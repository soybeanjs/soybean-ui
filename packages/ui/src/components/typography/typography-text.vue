<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { TypographyText } from '@soybeanjs/headless/typography';
import { typographyTextVariants } from '@/styles/typography';
import type { TypographyTextProps } from './types';

defineOptions({
  name: 'STypographyText'
});

const props = withDefaults(defineProps<TypographyTextProps>(), {
  type: 'default',
  code: false,
  mark: false,
  underline: false,
  delete: false,
  strong: false,
  italic: false,
  as: undefined,
  asChild: false
});

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() =>
  typographyTextVariants(
    {
      type: props.type,
      code: props.code,
      mark: props.mark,
      underline: props.underline,
      delete: props.delete,
      strong: props.strong,
      italic: props.italic
    },
    props.class
  )
);
</script>

<template>
  <TypographyText v-bind="forwardedProps" :class="cls">
    <slot />
  </TypographyText>
</template>
