<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from '@soybean-ui/primitives';
import { LoaderCircle } from 'lucide-vue-next';
import type { LoadingButtonProps } from '../types';
import SButton from './button.vue';

defineOptions({
  name: 'SLoadingButton'
});

const { disabled, loading, ...delegatedProps } = defineProps<LoadingButtonProps>();

const forwardedProps = useForwardProps(delegatedProps);

const isDisabled = computed(() => loading || disabled);
</script>

<template>
  <SButton v-bind="forwardedProps" :disabled="isDisabled">
    <template #leading>
      <slot v-if="loading" name="loading">
        <LoaderCircle class="animate-spin" />
      </slot>
      <slot v-else name="leading" />
    </template>
    <slot />
    <template #trailing>
      <slot name="trailing" />
    </template>
  </SButton>
</template>
