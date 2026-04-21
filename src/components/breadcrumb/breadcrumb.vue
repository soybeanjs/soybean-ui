<script setup lang="ts" generic="T extends BreadcrumbOptionData = BreadcrumbOptionData">
import { computed } from 'vue';
import { BreadcrumbCompact, provideBreadcrumbUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { breadcrumbVariants } from './variants';
import type { BreadcrumbEmits, BreadcrumbOptionData, BreadcrumbProps, BreadcrumbSlots } from './types';

defineOptions({
  name: 'SBreadcrumb'
});

const props = defineProps<BreadcrumbProps<T>>();

const emit = defineEmits<BreadcrumbEmits<T>>();

const slots = defineSlots<BreadcrumbSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = breadcrumbVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideBreadcrumbUi(ui);
</script>

<template>
  <BreadcrumbCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </BreadcrumbCompact>
</template>
