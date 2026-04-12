<script setup lang="ts">
import { computed } from 'vue';
import { AffixContent, AffixPlaceholder, AffixRoot, provideAffixUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { affixVariants } from './variants';
import type { AffixEmits, AffixProps } from './types';

defineOptions({
  name: 'SAffix'
});

const props = defineProps<AffixProps>();

const emit = defineEmits<AffixEmits>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'placeholderProps', 'contentProps']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = affixVariants();

  return mergeSlotVariants(variants, props.ui, { content: props.class });
});

provideAffixUi(ui);
</script>

<template>
  <AffixRoot v-bind="forwardedProps" v-on="listeners">
    <AffixPlaceholder />
    <AffixContent>
      <slot />
    </AffixContent>
  </AffixRoot>
</template>
