<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutRootContext, useLayoutUi } from './context';

defineOptions({
  name: 'LayoutPlaceholder',
  inheritAttrs: false
});

interface Props {
  type: 'header' | 'tab' | 'footer';
}

const props = defineProps<Props>();

const cls = useLayoutUi(`${props.type}Placeholder`);

const { fixedTop, headerVisible, tabVisible, footerVisible, fixedFooter } = useLayoutRootContext('LayoutPlaceholder');

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

const dataSoybeanAttr = computed(() => ({ [`data-soybean-layout-${props.type}-placeholder`]: '' }));
</script>

<template>
  <div v-if="visible && fixed" :class="cls" v-bind="dataSoybeanAttr"></div>
</template>
