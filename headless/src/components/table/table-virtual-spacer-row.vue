<script setup lang="ts">
import { computed } from 'vue';
import { getTableSpacerCellStyle } from './shared';
import TableRow from './table-row.vue';

defineOptions({
  name: 'TableVirtualSpacerRow',
  inheritAttrs: false
});

interface Props {
  isVirtual: boolean;
  colspan: number;
  paddingStart: number;
  paddingEnd: number;
}

const props = defineProps<Props>();

const startStyle = computed(() => getTableSpacerCellStyle(props.paddingStart));
const endStyle = computed(() => getTableSpacerCellStyle(props.paddingEnd));
</script>

<template>
  <TableRow v-if="isVirtual && paddingStart > 0" aria-hidden="true">
    <td :colspan="colspan" :style="startStyle" />
  </TableRow>
  <slot />
  <TableRow v-if="isVirtual && paddingEnd > 0" aria-hidden="true">
    <td :colspan="colspan" :style="endStyle" />
  </TableRow>
</template>
