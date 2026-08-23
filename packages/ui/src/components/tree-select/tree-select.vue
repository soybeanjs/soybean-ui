<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { TreeSelectCompact, provideTreeSelectUi } from '@soybeanjs/headless/tree-select';
import { treeSelectVariants } from '@/styles/tree-select';
import type { TreeSelectEmits, TreeSelectProps, TreeSelectSlots } from './types';

defineOptions({
  name: 'STreeSelect'
});

const props = withDefaults(defineProps<TreeSelectProps>(), {
  open: undefined,
  defaultOpen: false,
  size: 'md',
  color: 'primary'
});

const emit = defineEmits<TreeSelectEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'color', 'ui']);

const slots = defineSlots<TreeSelectSlots>();

const ui = computed(() =>
  treeSelectVariants({ size: props.size, color: props.color }, props.ui, { trigger: props.class })
);

provideTreeSelectUi(ui);
</script>

<template>
  <TreeSelectCompact
    v-bind="forwardedProps"
    @update:model-value="emit('update:modelValue', $event)"
    @update:open="emit('update:open', $event)"
  >
    <template v-for="(_, slotName) in slots" :key="slotName" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TreeSelectCompact>
</template>
