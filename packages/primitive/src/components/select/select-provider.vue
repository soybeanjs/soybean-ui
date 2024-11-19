<script setup lang="ts">
import type { AcceptableValue } from '../../types';
import type { SelectRootContext } from './select-root.vue';
import { provideSelectRootContext } from './select-root.vue';
import { SelectContentDefaultContextValue, provideSelectContentContext } from './select-content-impl.vue';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  context: SelectRootContext<AcceptableValue>;
}>();

provideSelectRootContext(props.context);
provideSelectContentContext(SelectContentDefaultContextValue);
</script>

<template>
  <slot />
</template>
