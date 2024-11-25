<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Primitive } from '../primitive';
import { Presence } from '../presence';
import { useForwardExpose } from '../../composables';
import { makeContentId, makeTriggerId } from './shared';
import { injectTabsRootContext } from './context';
import type { TabsContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'TabsContent'
});

const props = defineProps<TabsContentPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();
const rootContext = injectTabsRootContext();
const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
const contentId = computed(() => makeContentId(rootContext.baseId, props.value));

const isSelected = computed(() => props.value === rootContext.modelValue.value);

const isMountAnimationPreventedRef = ref(isSelected.value);

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPreventedRef.value = false;
  });
});
</script>

<template>
  <Presence v-slot="{ present }" :present="forceMount || isSelected" force-mount>
    <Primitive
      :id="contentId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-labelledby="triggerId"
      :data-orientation="rootContext.orientation.value"
      :data-state="isSelected ? 'active' : 'inactive'"
      :hidden="!present"
      role="tabpanel"
      tabindex="0"
      :style="{
        animationDuration: isMountAnimationPreventedRef ? '0s' : undefined
      }"
    >
      <slot v-if="rootContext.unmountOnHide.value ? present : true" />
    </Primitive>
  </Presence>
</template>
