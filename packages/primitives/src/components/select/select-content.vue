<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
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
