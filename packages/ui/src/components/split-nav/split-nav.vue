<script setup lang="ts" generic="T extends SplitNavBaseOptionData = SplitNavBaseOptionData">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { SplitNavRoot, provideSplitNavUi } from '@soybeanjs/headless/split-nav';
import type { SplitNavBaseOptionData } from '@soybeanjs/headless/split-nav';
import { keysOf } from '@soybeanjs/utils';
import { splitNavVariants } from '@/styles/split-nav';
import type { SplitNavEmits, SplitNavProps, SplitNavSlots } from './types';

defineOptions({
  name: 'SSplitNav'
});

const props = withDefaults(defineProps<SplitNavProps<T>>(), {
  mode: 'dual-vertical'
});

const emit = defineEmits<SplitNavEmits>();

const slots = defineSlots<SplitNavSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => splitNavVariants({ size: props.size, mode: props.mode }, props.ui, { root: props.class }));

provideSplitNavUi(ui);
</script>

<template>
  <SplitNavRoot v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore slot type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </SplitNavRoot>
</template>
