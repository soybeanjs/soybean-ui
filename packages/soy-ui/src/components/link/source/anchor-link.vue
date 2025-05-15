<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import type { AnchorLinkProps } from '../types';

defineOptions({
  name: 'SAnchorLink'
});

const props = withDefaults(defineProps<AnchorLinkProps>(), {
  target: '_blank',
  rel: 'noopener noreferrer'
});

const computedProps = computed(() => {
  const { rel, target, referrerPolicy, disabled, href } = props;

  return {
    href: disabled ? undefined : href,
    rel,
    target,
    referrerPolicy,
    'aria-disabled': disabled ? 'true' : undefined,
    role: disabled ? 'link' : undefined,
    tabindex: disabled ? -1 : undefined
  };
});

function onClick(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }

  if (props.onClick) {
    for (const clickHandler of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
      clickHandler(e);
    }
  }

  if (props.href && props.navigate && !props.isExternal) {
    props.navigate(e);
  }
}
</script>

<template>
  <Primitive as="a" v-bind="computedProps" @click="onClick">
    <slot />
  </Primitive>
</template>
