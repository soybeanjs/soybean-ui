<script setup lang="ts" generic="T extends DefinedValue, M extends boolean = false, P extends boolean = false">
import { computed } from 'vue';
import { CascaderCompact, provideCascaderUi } from '@soybeanjs/headless/cascader';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/headless/shared';
import type { DefinedValue } from '@soybeanjs/headless/types';
import { cascaderVariants } from '@/styles/cascader';
import type { CascaderProps, CascaderEmits, CascaderSlots } from './types';

defineOptions({
  name: 'SCascader',
  inheritAttrs: false
});

const props = withDefaults(defineProps<CascaderProps<T, M, P>>(), {
  open: undefined,
  clearable: true
});

const emit = defineEmits<CascaderEmits<T, M, P>>();

const slots = defineSlots<CascaderSlots<T, M, P>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() =>
  cascaderVariants({ size: props.size, virtual: Boolean(props.virtualScroll) }, props.ui, { trigger: props.class })
);

provideCascaderUi(ui);
</script>

<template>
  <CascaderCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </CascaderCompact>
</template>
