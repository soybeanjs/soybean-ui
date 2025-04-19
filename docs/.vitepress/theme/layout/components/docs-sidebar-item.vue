<script setup lang="ts">
import { computed } from 'vue';
import { SBadge } from 'soy-ui';
import type { BadgeProps } from 'soy-ui';
import { useSidebarControl } from '../../composables';
import type { SidebarItem } from '../../../types';

defineOptions({
  name: 'DocsSidebarItem'
});

interface Props {
  item: SidebarItem;
}

const props = defineProps<Props>();

const { isActiveLink } = useSidebarControl(computed(() => props.item));

const badgeProps = computed<BadgeProps | null>(() => {
  if (!props.item.badge) return null;

  if (typeof props.item.badge === 'string') {
    return { variant: 'soft', color: 'info', content: props.item.badge };
  }

  return props.item.badge;
});
</script>

<template>
  <div
    class="flex items-center rounded-lg text-sm text-foreground text-muted-foreground hover:bg-card"
    :class="{ 'is-active !bg-primary/10 !text-primary font-semibold': isActiveLink }"
  >
    <a :href="item.link" class="h-[2.15rem] w-full inline-flex items-center px-4">{{ item.text }}</a>
    <SBadge v-if="item.badge" v-bind="badgeProps" />
  </div>
</template>
