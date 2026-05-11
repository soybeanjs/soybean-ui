<script setup lang="ts" generic="T extends PageTabsOptionData = PageTabsOptionData">
import { computed } from 'vue';
import { PageTabsCompact, providePageTabsUi } from '@soybeanjs/headless/page-tabs';
import type { PageTabsOptionData } from '@soybeanjs/headless/page-tabs';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { provideMenuUi } from '../menu/context';
import { pageTabsVariants } from './variants';
import type { PageTabsProps, PageTabsEmits, PageTabsSlots } from './types';

defineOptions({
  name: 'SPageTabs'
});

const props = withDefaults(defineProps<PageTabsProps<T>>(), {
  variant: 'chrome',
  loop: true
});

const emit = defineEmits<PageTabsEmits<T>>();

const slots = defineSlots<PageTabsSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'onClick', 'onContextmenu']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(name => name !== 'indicator'));

const ui = computed(() => {
  const variants = pageTabsVariants({
    size: props.size,
    variant: props.variant
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideMenuUi(() => ({
  size: props.size
}));
providePageTabsUi(ui);
</script>

<template>
  <PageTabsCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore slot type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
    <template #indicator>
      <template v-if="variant === 'chrome'">
        <svg height="100%" width="100%" viewBox="0 0 8 8" :class="ui.chromeBgLeft">
          <path d="M 0 8 A 8 8 0 0 0 8 0 L 8 8 Z" />
        </svg>
        <svg height="100%" width="100%" viewBox="0 0 8 8" :class="ui.chromeBgRight">
          <path d="M 0 0 A 8 8 0 0 0 8 8 L 0 8 Z" />
        </svg>
      </template>

      <div v-if="variant === 'slider'" :class="ui.sliderIndicator"></div>
    </template>
  </PageTabsCompact>
</template>
