<script setup lang="ts">
import { computed } from 'vue';
import { AffixRoot } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { affixVariants } from './variants';
import type { AffixEmits, AffixProps } from './types';

defineOptions({
  name: 'SAffix'
});

const props = defineProps<AffixProps>();

const emit = defineEmits<AffixEmits>();

const forwardedProps = useOmitProps(props, ['class']);
const listeners = useForwardListeners(emit);

const cls = computed(() => cn(affixVariants(), props.class));
</script>

<template>
  <AffixRoot v-bind="forwardedProps" :class="cls" v-on="listeners">
    <slot />
  </AffixRoot>
</template>
