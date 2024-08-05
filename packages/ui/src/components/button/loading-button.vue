<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import { LoaderCircle } from 'lucide-vue-next';
import { computed } from 'vue';
import type { LoadingButtonProps } from './types';
import SButton from './button.vue';

defineOptions({
  name: 'SLoadingButton'
});

const props = withDefaults(defineProps<LoadingButtonProps>(), {
  loading: false
});

const delegatedProps = reactiveOmit(props, ['disabled']);

const forwarded = useForwardProps(delegatedProps);

const disabled = computed(() => props.loading || props.disabled);
</script>

<template>
  <SButton v-bind="forwarded" :disabled="disabled">
    <template #before>
      <slot v-if="loading" name="loading">
        <LoaderCircle class="animate-spin" />
      </slot>
      <slot v-else name="before" />
    </template>
    <slot />
    <template #after>
      <slot name="after" />
    </template>
  </SButton>
</template>

<style scoped></style>
