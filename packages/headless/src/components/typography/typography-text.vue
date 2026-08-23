<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import type { TypographyTextProps } from './types';

defineOptions({
  name: 'TypographyText'
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

const as = computed(() => {
  if (props.as) return props.as;

  if (props.code) return 'code';
  if (props.mark) return 'mark';
  if (props.underline) return 'u';
  if (props.delete) return 'del';
  if (props.strong) return 'strong';
  if (props.italic) return 'em';

  return 'span';
});

const dataType = computed(() => (props.type === 'default' ? undefined : props.type));

// `delete` is a reserved word and cannot be referenced directly in the template.
const dataDelete = computed(() => (props.delete ? '' : undefined));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-soybean-typography-text
    :data-type="dataType"
    :data-code="code ? '' : undefined"
    :data-mark="mark ? '' : undefined"
    :data-underline="underline ? '' : undefined"
    :data-delete="dataDelete"
    :data-strong="strong ? '' : undefined"
    :data-italic="italic ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
