<script setup lang="ts">
import { computed } from 'vue';
import { SBadge } from 'soy-ui';
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
</script>

<template>
  <div
    class="flex items-center rounded-lg text-sm text-foreground text-muted-foreground hover:bg-card"
    :class="{ 'is-active !bg-primary/10 !text-primary font-semibold': isActiveLink }"
  >
    <a :href="item.link" class="h-[2.15rem] w-full inline-flex items-center px-4">{{ item.text }}</a>
    <SBadge v-if="item.badge" variant="outline" color="warning">{{ item.badge }}</SBadge>
  </div>
</template>
