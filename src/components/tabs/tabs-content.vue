<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { useTabsRootContext, useTabsThemeContext } from './context';
import type { TabsContentProps } from './types';

defineOptions({
  name: 'TabsContent'
});

const props = defineProps<TabsContentProps>();

const { modelValue, unmountOnHide, getId } = useTabsRootContext('TabsContent');

const [contentElement, setContentElement] = useForwardElement();

const themeContext = useTabsThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);

const { contentId, triggerId } = getId(props.value);

const isSelected = computed(() => props.value === modelValue.value);
const dataState = computed(() => (isSelected.value ? 'active' : 'inactive'));

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, isSelected);

const isMountAnimationPreventedRef = shallowRef(isSelected.value);

const style = computed(() => ({ animationDuration: isMountAnimationPreventedRef.value ? '0s' : undefined }));

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPreventedRef.value = false;
  });
});
</script>

<template>
  <div
    :id="contentId"
    :ref="setContentElement"
    :class="cls"
    :aria-labelledby="triggerId"
    :data-state="dataState"
    :hidden="!isPresent"
    role="tabpanel"
    tabindex="0"
    :style="style"
  >
    <slot v-if="!unmountOnHide || isPresent" :active="isSelected" />
  </div>
</template>
