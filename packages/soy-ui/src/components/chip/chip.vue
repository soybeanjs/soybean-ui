<script lang="ts" setup>
import { useForwardProps } from '@soybean-ui/primitives';
import SChipRoot from './chip-root.vue';
import SChipContent from './chip-content.vue';
import type { ChipProps } from './types';

defineOptions({
  name: 'SChip'
});

const { class: rootCls, contentCls, text, show = true, ...delegatedContentProps } = defineProps<ChipProps>();

const forwardedContentProps = useForwardProps(delegatedContentProps);
</script>

<template>
  <SChipRoot :class="rootCls">
    <slot />
    <SChipContent v-if="show" v-bind="forwardedContentProps" :class="contentCls">
      <slot name="content" :value="text">
        {{ text }}
      </slot>
    </SChipContent>
  </SChipRoot>
</template>
