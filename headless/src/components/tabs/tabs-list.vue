<script setup lang="ts">
import { useForwardElement } from '../../composables';
import { RovingFocusGroup } from '../roving-focus';
import { useTabsRootContext, useTabsUi } from './context';
import type { TabsListProps } from './types';

defineOptions({
  name: 'TabsList'
});

defineProps<TabsListProps>();

const { orientation, dir, loop, onListElementChange } = useTabsRootContext('TabsList');

const [_, setListElement] = useForwardElement(onListElementChange);

const cls = useTabsUi('list');
</script>

<template>
  <RovingFocusGroup as-child :dir="dir" :orientation="orientation" :loop="loop">
    <div :ref="setListElement" :class="cls" role="tablist" :aria-orientation="orientation">
      <slot />
    </div>
  </RovingFocusGroup>
</template>
