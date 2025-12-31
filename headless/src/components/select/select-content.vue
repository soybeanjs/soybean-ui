<script setup lang="ts">
import { onMounted, ref, shallowRef, useAttrs } from 'vue';
import { useForwardListeners, useOmitProps, usePresence } from '../../composables';
import { provideSelectPopupElementContext, useSelectRootContext } from './context';
import SelectContentImpl from './select-content-impl.vue';
import SelectTeleportProvider from './select-teleport-provider.vue';
import type { SelectContentEmits, SelectContentProps } from './types';

defineOptions({
  name: 'SelectContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectContentProps>(), {
  position: 'popper',
  avoidCollisions: true,
  prioritizePosition: true,
  bodyLock: true
});

const emit = defineEmits<SelectContentEmits>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['forceMount'], attrs);

const listeners = useForwardListeners(emit);

const { open } = useSelectRootContext('SelectContent');

const { popupElement } = provideSelectPopupElementContext();

const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);

const fragment = ref<DocumentFragment>();

onMounted(() => {
  fragment.value = new DocumentFragment();
});
</script>

<template>
  <SelectContentImpl v-if="isPresent" v-bind="forwardedProps" v-on="listeners">
    <slot />
  </SelectContentImpl>
  <div v-else-if="fragment">
    <Teleport :to="fragment">
      <SelectTeleportProvider :position="position" :popup-element="popupElement">
        <slot />
      </SelectTeleportProvider>
    </Teleport>
  </div>
</template>
