<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { EmptyCompact, provideEmptyUi } from '@soybeanjs/headless/empty';
import { keysOf } from '@soybeanjs/utils';
import { emptyVariants } from '@/styles/empty';
import type { EmptyProps, EmptySlots } from './types';

defineOptions({
  name: 'SEmpty'
});

const props = defineProps<EmptyProps>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const slots = defineSlots<EmptySlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => emptyVariants({ size: props.size }, props.ui, { root: props.class }));

provideEmptyUi(ui);
</script>

<template>
  <EmptyCompact v-bind="forwardedProps">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </EmptyCompact>
</template>
