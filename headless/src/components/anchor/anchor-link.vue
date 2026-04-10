<script setup lang="ts">
import { computed, watch } from 'vue';
import { useOmitProps } from '../../composables';
import { useAnchorRootContext, useAnchorUi } from './context';
import type { AnchorLinkProps } from './types';

defineOptions({
  name: 'AnchorLink'
});

const props = withDefaults(defineProps<AnchorLinkProps>(), {
  disabled: false,
  target: undefined
});

const forwardedProps = useOmitProps(props, ['disabled', 'href', 'target']);

const cls = useAnchorUi('link');

const { activeHref, onLinkClick, registerLink, scrollTo, unregisterLink } = useAnchorRootContext('AnchorLink');

const active = computed(() => activeHref.value === props.href);
const dataDisabled = computed(() => (props.disabled ? '' : undefined));
const dataState = computed(() => (active.value ? 'active' : 'inactive'));

function handleClick(event: MouseEvent) {
  onLinkClick(event, { href: props.href });

  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (!props.href.startsWith('#') || event.defaultPrevented) {
    return;
  }

  event.preventDefault();
  scrollTo(props.href);
}

watch(
  () => props.href,
  (href, _, onCleanup) => {
    registerLink(href);

    onCleanup(() => {
      unregisterLink(href);
    });
  },
  {
    immediate: true
  }
);
</script>

<template>
  <a
    v-bind="forwardedProps"
    :href="href"
    :target="target"
    :class="cls"
    :aria-current="active ? 'location' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :tabindex="disabled ? -1 : undefined"
    @click="handleClick"
  >
    <slot />
  </a>
</template>
