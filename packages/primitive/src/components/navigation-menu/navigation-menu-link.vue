<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCollection, useForwardExpose } from '../../composables';
import type { NavigationMenuLinkEmits, NavigationMenuLinkPropsWithPrimitive } from './types';
import { EVENT_ROOT_CONTENT_DISMISS, LINK_SELECT } from './shared';

defineOptions({
  name: 'NavigationMenuLink'
});

const props = withDefaults(defineProps<NavigationMenuLinkPropsWithPrimitive>(), {
  as: 'a'
});

const emit = defineEmits<NavigationMenuLinkEmits>();

const { CollectionItem } = useCollection({ key: 'NavigationMenu' });
useForwardExpose();

async function handleClick(ev: MouseEvent) {
  const linkSelectEvent = new CustomEvent(LINK_SELECT, {
    bubbles: true,
    cancelable: true,
    detail: {
      originalEvent: ev
    }
  });
  emit('select', linkSelectEvent);

  if (!linkSelectEvent.defaultPrevented && !ev.metaKey) {
    const rootContentDismissEvent = new CustomEvent(EVENT_ROOT_CONTENT_DISMISS, {
      bubbles: true,
      cancelable: true
    });
    ev.target?.dispatchEvent(rootContentDismissEvent);
  }
}
</script>

<template>
  <CollectionItem>
    <Primitive
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-active="active ? '' : undefined"
      :aria-current="active ? 'page' : undefined"
      @click="handleClick"
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
