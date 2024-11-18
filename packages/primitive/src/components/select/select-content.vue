<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Presence } from '../presence';
import { useForwardPropsEmits } from '../../composables';
import type { SelectContentImplEmits, SelectContentImplProps } from './SelectContentImpl.vue';

import SelectContentImpl from './select-content-impl.vue';
import { injectSelectRootContext } from './select-root.vue';
import SelectProvider from './select-provider.vue';

export type SelectContentEmits = SelectContentImplEmits;

export interface SelectContentProps extends SelectContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

defineOptions({
  inheritAttrs: false
});

const props = defineProps<SelectContentProps>();

const emit = defineEmits<SelectContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);

const rootContext = injectSelectRootContext();

const fragment = ref<DocumentFragment>();
onMounted(() => {
  fragment.value = new DocumentFragment();
});

const presenceRef = ref<InstanceType<typeof Presence>>();
const renderPresence = computed(() => props.forceMount || rootContext.open.value);
</script>

<template>
  <Presence v-if="renderPresence" ref="presenceRef" :present="true">
    <SelectContentImpl v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </SelectContentImpl>
  </Presence>

  <div v-else-if="!presenceRef?.present && fragment">
    <Teleport :to="fragment">
      <SelectProvider :context="rootContext">
        <slot />
      </SelectProvider>
    </Teleport>
  </div>
</template>
