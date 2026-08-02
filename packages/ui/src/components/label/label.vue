<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { Label } from '@soybeanjs/headless/label';
import { labelVariants } from '@/styles/label';
import type { LabelProps } from './types';

defineOptions({
  name: 'SLabel'
});

const props = defineProps<LabelProps>();

const delegatedProps = useOmitProps(props, ['class', 'size']);

const cls = computed(() => labelVariants({ size: props.size }, props.class));
</script>

<template>
  <Label v-bind="delegatedProps" :class="cls">
    <slot />
  </Label>
</template>
