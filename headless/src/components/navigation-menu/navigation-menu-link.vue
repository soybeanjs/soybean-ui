<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Link from '../link/link.vue';
import { useCollectionItem, useNavigationMenuRootContext, useNavigationMenuThemeContext } from './context';
import { EVENT_ROOT_CONTENT_DISMISS, LINK_SELECT } from './shared';
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from './types';

defineOptions({
  name: 'NavigationMenuLink'
});

const props = defineProps<NavigationMenuLinkProps>();

const emit = defineEmits<NavigationMenuLinkEmits>();

const { isRoot } = useNavigationMenuRootContext('NavigationMenuLink');

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => (isRoot ? themeContext?.ui?.value?.link : themeContext?.ui?.value?.subLink));

const { itemProps, setItemElement } = useCollectionItem();

const forwardedProps = useOmitProps(props, ['active'], itemProps);

const onClick = async (event: MouseEvent) => {
  const linkSelectEvent = new CustomEvent(LINK_SELECT, {
    bubbles: true,
    cancelable: true,
    detail: {
      originalEvent: event
    }
  });

  emit('select', linkSelectEvent);

  if (linkSelectEvent.defaultPrevented || event.metaKey) return;

  const dismissEvent = new CustomEvent(EVENT_ROOT_CONTENT_DISMISS, {
    bubbles: true,
    cancelable: true
  });
  event.target?.dispatchEvent(dismissEvent);
};
</script>

<template>
  <Link
    v-slot="{ isHref }"
    v-bind="forwardedProps"
    :ref="setItemElement"
    :class="cls"
    :data-active="active ? '' : undefined"
    :aria-current="active ? 'page' : undefined"
    @click="onClick"
  >
    <slot :is-href="isHref" />
  </Link>
</template>
