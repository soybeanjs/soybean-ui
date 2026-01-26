<script setup lang="ts">
import { computed } from 'vue';
import { useTreeMenuUi } from '@soybeanjs/headless';
import { cn } from '@/theme/merge';
import type { TreeMenuStyledItemProps } from './types';

defineOptions({
  name: 'STreeMenuStyledItem'
});

const props = defineProps<TreeMenuStyledItemProps>();

const ui = useTreeMenuUi();

const itemCls = computed(() => cn(ui.value.item, props.ui?.item));
const buttonCls = computed(() => cn(ui.value.button, props.ui?.button));
</script>

<template>
  <div :class="itemCls">
    <button :class="buttonCls">
      <slot />
    </button>
  </div>
</template>
