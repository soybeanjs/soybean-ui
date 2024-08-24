<script setup lang="ts">
import { useForwardProps } from 'radix-vue';
import { LoaderCircle } from 'lucide-vue-next';
import { computed } from 'vue';
import { computedOmit } from '../../shared';
import type { LoadingButtonProps } from './types';
import SButton from './button.vue';

defineOptions({
  name: 'SLoadingButton'
});

const props = withDefaults(defineProps<LoadingButtonProps>(), {
  loading: false
});

const delegatedProps = computedOmit(props, ['disabled', 'loading']);

const forwarded = useForwardProps(delegatedProps);

const disabled = computed(() => props.loading || props.disabled);
</script>

<template>
  <SButton v-bind="forwarded" :disabled="disabled">
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

<style scoped></style>
