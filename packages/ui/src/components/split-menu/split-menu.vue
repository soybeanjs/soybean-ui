<script setup lang="ts" generic="T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { SplitMenuCompact, provideSplitMenuUi } from '@soybeanjs/headless/split-menu';
import type { SplitMenuBaseOptionData } from '@soybeanjs/headless/split-menu';
import { keysOf } from '@soybeanjs/utils';
import { splitMenuVariants } from '@/styles/split-menu';
import type { SplitMenuProps, SplitMenuEmits, SplitMenuSlots } from './types';

defineOptions({
  name: 'SSplitMenu'
});

const props = withDefaults(defineProps<SplitMenuProps<T>>(), {
  mode: 'dual-vertical'
});

const emit = defineEmits<SplitMenuEmits>();

const slots = defineSlots<SplitMenuSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => splitMenuVariants({ size: props.size }, props.ui, { root: props.class }));

provideSplitMenuUi(ui);
</script>

<template>
  <SplitMenuCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore slot type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </SplitMenuCompact>
</template>
