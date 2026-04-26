<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutClassicRootContext, useLayoutClassicUi } from './context';

defineOptions({
  name: 'LayoutClassicPlaceholder',
  inheritAttrs: false
});

interface Props {
  type: 'header' | 'tab' | 'footer';
}

const props = defineProps<Props>();

const cls = useLayoutClassicUi(`${props.type}Placeholder`);

const { fixedTop, headerVisible, tabVisible, footerVisible, fixedFooter } =
  useLayoutClassicRootContext('LayoutClassicPlaceholder');

const fixed = computed(() => (props.type === 'footer' ? fixedFooter.value : fixedTop.value));

const visible = computed(() => {
  if (props.type === 'header') {
    return headerVisible.value;
  }

  if (props.type === 'tab') {
    return tabVisible.value;
  }

  return footerVisible.value;
});

const dataSlot = computed(() => `${props.type}-placeholder`);
</script>

<template>
  <div v-if="visible && fixed" :class="cls" :data-slot="dataSlot"></div>
</template>
