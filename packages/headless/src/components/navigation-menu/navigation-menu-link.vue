<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Link from '../link/link.vue';
import { EVENT_ROOT_CONTENT_DISMISS, LINK_DISMISSED, LINK_SELECT } from './shared';
import { useCollectionItem, useNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuLinkProps, NavigationMenuLinkEmits } from './types';

defineOptions({
  name: 'NavigationMenuLink'
});

const props = defineProps<NavigationMenuLinkProps>();

const emit = defineEmits<NavigationMenuLinkEmits>();

const { isRoot, modelValue } = useNavigationMenuRootContext('NavigationMenuLink');

const ui = useNavigationMenuUi();

const cls = computed(() => (isRoot ? ui.value?.link : ui.value?.subLink));

const { setItemElement } = useCollectionItem();

const forwardedProps = useOmitProps(props, ['selected']);

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

  // when the menu is closed the click targets an as-child trigger; let the trigger
  // handle opening instead of dismissing a menu that is already closed
  if (!modelValue.value) return;

  // mark the shared event so a sibling trigger listener skips re-opening after dismissal
  (event as unknown as Record<string, unknown>)[LINK_DISMISSED] = true;

  const dismissEvent = new CustomEvent(EVENT_ROOT_CONTENT_DISMISS, {
    bubbles: true,
    cancelable: true
  });
  event.target?.dispatchEvent(dismissEvent);
};
</script>

<template>
  <Link
    v-slot="slotProps"
    v-bind="forwardedProps"
    :ref="setItemElement"
    data-soybean-navigation-menu-link
    data-soybean-collection-item
    :class="cls"
    :data-selected="selected ? '' : undefined"
    :aria-current="selected ? 'page' : undefined"
    @click="onClick"
  >
    <slot v-bind="slotProps" />
  </Link>
</template>
