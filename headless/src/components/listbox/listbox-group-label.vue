<script setup lang="ts">
import { useListboxGroupContext, useListboxUi } from './context';
import type { ListboxGroupLabelProps } from './types';

defineOptions({
  name: 'ListboxGroupLabel'
});

defineProps<ListboxGroupLabelProps>();

const { id } = useListboxGroupContext('ListboxGroupLabel');

const cls = useListboxUi('groupLabel');
</script>

<template>
  <div :id="id" :class="cls">
    <slot />
  </div>
</template>
