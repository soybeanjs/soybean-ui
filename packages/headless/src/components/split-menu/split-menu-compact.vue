<script setup lang="ts" generic="T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useForwardListeners, usePickProps } from '../../composables';
import { getSplitMenuRows } from './shared';
import { useSplitMenuUi } from './context';
import SplitMenuPanel from './split-menu-panel.vue';
import SplitMenuRoot from './split-menu-root.vue';
import type {
  SplitMenuCompactProps,
  SplitMenuBaseOptionData,
  SplitMenuCompactEmits,
  SplitMenuCompactSlots
} from './types';

defineOptions({
  name: 'SplitMenuCompact'
});

const props = withDefaults(defineProps<SplitMenuCompactProps<T>>(), {
  mode: 'dual-vertical'
});

const emit = defineEmits<SplitMenuCompactEmits>();

const slots = defineSlots<SplitMenuCompactSlots<T>>();

const ui = useSplitMenuUi();

const forwardedRootProps = usePickProps(props, [
  'as',
  'asChild',
  'mode',
  'modelValue',
  'defaultValue',
  'collapsed',
  'defaultCollapsed',
  'dir'
]);

const forwardedPanelProps = usePickProps(props, ['items', 'horizontalMenuEl', 'verticalMenuEl']);

const listeners = useForwardListeners(emit);

const rows = computed(() => getSplitMenuRows(props.mode));

const panelSlotNames = computed(() => keysOf(slots).filter(name => name !== 'top' && name !== 'bottom'));

function handlePanelSelect(value: string) {
  emit('update:modelValue', value);
  emit('select', value);
}
</script>

<template>
  <SplitMenuRoot v-bind="forwardedRootProps" v-on="listeners">
    <slot name="top" />
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" :class="ui.panelRow" data-soybean-split-menu-row>
      <SplitMenuPanel
        v-for="panel in row"
        :key="panel.depth"
        :depth="panel.depth"
        :orientation="panel.orientation"
        v-bind="forwardedPanelProps"
        @panel-select="handlePanelSelect"
      >
        <template v-for="slotName in panelSlotNames" #[slotName]="slotProps">
          <!-- @vue-expect-error ignore slot type -->
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </SplitMenuPanel>
    </div>
    <slot name="bottom" />
  </SplitMenuRoot>
</template>
