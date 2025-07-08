<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useForwardPropsEmits } from '../../composables';
import { Presence } from '../presence';
import { injectSelectRootContext } from './context';
import SelectContentImpl from './select-content-impl.vue';
import SelectProvider from './select-provider.vue';
import type { SelectContentEmits, SelectContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectContent',
  inheritAttrs: false
});

const props = defineProps<SelectContentPropsWithPrimitive>();

const emit = defineEmits<SelectContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);

const rootContext = injectSelectRootContext();

const fragment = ref<DocumentFragment>();
onMounted(() => {
  fragment.value = new DocumentFragment();
});

const presenceRef = ref<InstanceType<typeof Presence>>();
const present = computed(() => props.forceMount || rootContext.open.value);
const renderPresence = ref(present.value);

watch(present, () => {
  // Toggle render presence after a delay (nextTick is not enough)
  // to allow children to re-render with the latest state.
  // Otherwise, they would remain in the old state during the transition,
  // which would prevent the animation that depend on state (e.g., data-[state=closed])
  // from being applied accurately.
  // @see https://github.com/unovue/reka-ui/issues/1865
  setTimeout(() => (renderPresence.value = present.value));
});
</script>

<template>
  <Presence v-if="present || renderPresence || presenceRef?.present" ref="presenceRef" :present="present">
    <SelectContentImpl v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </SelectContentImpl>
  </Presence>

  <div v-else-if="fragment">
    <Teleport :to="fragment">
      <SelectProvider :context="rootContext">
        <slot />
      </SelectProvider>
    </Teleport>
  </div>
</template>
