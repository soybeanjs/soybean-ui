<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import { PopperArrow } from '../popper';
import { Portal } from '../portal';
import TreeItem from '../tree/tree-item.vue';
import TreeRoot from '../tree/tree-root.vue';
import { useTreeSelectUi } from './context';
import TreeSelectContent from './tree-select-content.vue';
import TreeSelectRoot from './tree-select-root.vue';
import TreeSelectTrigger from './tree-select-trigger.vue';
import type { TreeSelectCompactEmits, TreeSelectCompactProps, TreeSelectCompactSlots } from './types';

defineOptions({
  name: 'TreeSelectCompact'
});

const props = withDefaults(defineProps<TreeSelectCompactProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  multiple: false,
  items: () => [],
  placeholder: '',
  open: undefined,
  defaultOpen: false,
  disabled: false,
  clearable: false,
  allowParentSelect: false,
  propagateSelect: false,
  bubbleSelect: false,
  expanded: undefined,
  defaultExpanded: undefined,
  showArrow: false,
  dir: undefined
});

const emit = defineEmits<TreeSelectCompactEmits>();

defineSlots<TreeSelectCompactSlots>();

const forwardedProps = useOmitProps(props, ['showArrow', 'triggerProps', 'portalProps', 'contentProps', 'placement']);

const valueCls = useTreeSelectUi('value');
const placeholderCls = useTreeSelectUi('placeholder');
const triggerIconCls = useTreeSelectUi('triggerIcon');
const nodeCls = useTreeSelectUi('node');
const nodeLabelCls = useTreeSelectUi('nodeLabel');
const nodeCheckCls = useTreeSelectUi('nodeCheck');

const contentProps = computed(() => ({
  ...props.contentProps,
  placement: props.placement ?? props.contentProps?.placement
}));
</script>

<template>
  <TreeSelectRoot
    v-slot="{ modelValue: slotValue, selectedLabels, onModelValueChange }"
    v-bind="forwardedProps"
    @update:model-value="emit('update:modelValue', $event)"
    @update:open="emit('update:open', $event)"
  >
    <TreeSelectTrigger v-bind="triggerProps">
      <slot name="value" :labels="selectedLabels" :model-value="slotValue">
        <span v-if="selectedLabels.length" :class="valueCls">{{ selectedLabels.join(', ') }}</span>
        <span v-else :class="placeholderCls">{{ placeholder }}</span>
      </slot>
      <span data-soybean-tree-select-trigger-icon :class="triggerIconCls">
        <Icon icon="lucide:chevrons-up-down" />
      </span>
    </TreeSelectTrigger>
    <Portal v-bind="portalProps">
      <TreeSelectContent v-bind="contentProps">
        <TreeRoot
          v-slot="{ flattenItems }"
          :model-value="slotValue"
          :items="items"
          :multiple="multiple"
          :disabled="disabled"
          :allow-parent-select="allowParentSelect"
          :propagate-select="propagateSelect"
          :bubble-select="bubbleSelect"
          :expanded="expanded"
          :default-expanded="defaultExpanded"
          @update:model-value="onModelValueChange"
        >
          <TreeItem
            v-for="item in flattenItems"
            :key="item.value"
            v-slot="slotProps"
            :value="item.value"
            :level="item.level"
            :disabled="item.data.disabled"
            :class="nodeCls"
          >
            <slot name="node" :item="item" v-bind="slotProps">
              <span v-if="multiple" data-soybean-tree-select-node-check :class="nodeCheckCls">
                <Icon v-if="slotProps.isSelected" icon="lucide:check" />
                <Icon v-else-if="slotProps.isIndeterminate" icon="lucide:minus" />
              </span>
              <span v-else-if="slotProps.isSelected" data-soybean-tree-select-node-check :class="nodeCheckCls">
                <Icon icon="lucide:check" />
              </span>
              <span data-soybean-tree-select-node-label :class="nodeLabelCls">
                {{ item.data.label ?? item.value }}
              </span>
            </slot>
          </TreeItem>
        </TreeRoot>
        <PopperArrow v-if="showArrow" />
      </TreeSelectContent>
    </Portal>
  </TreeSelectRoot>
</template>
