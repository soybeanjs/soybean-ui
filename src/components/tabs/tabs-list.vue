<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { RovingFocusGroup } from '../roving-focus';
import { useTabsRootContext, useTabsThemeContext } from './context';
import type { TabsListProps } from './types';

defineOptions({
  name: 'TabsList'
});

const props = defineProps<TabsListProps>();

const { orientation, dir, loop, onListElementChange } = useTabsRootContext('TabsList');

const [_, setListElement] = useForwardElement(onListElementChange);

const theme = useTabsThemeContext();

const cls = computed(() => [theme?.ui?.value?.list, props.class]);
</script>

<template>
  <RovingFocusGroup as-child :dir="dir" :orientation="orientation" :loop="loop">
    <div :ref="setListElement" v-bind="props" :class="cls" role="tablist" :aria-orientation="orientation">
      <slot />
    </div>
  </RovingFocusGroup>
</template>
