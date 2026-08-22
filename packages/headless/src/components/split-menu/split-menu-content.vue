<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useSplitMenuUi } from './context';
import type { SplitMenuContentProps } from './types';

defineOptions({
  name: 'SplitMenuContent'
});

const props = defineProps<SplitMenuContentProps>();

const cls = useSplitMenuUi('panel');

const forwardedProps = useOmitProps(props, ['class', 'to']);

const isMounted = shallowRef(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <Teleport v-if="to" :to="to">
    <Primitive v-bind="forwardedProps" :as="as" :as-child="asChild" data-soybean-split-menu-content :class="cls">
      <slot />
    </Primitive>
  </Teleport>
  <Primitive v-else v-bind="forwardedProps" :as="as" :as-child="asChild" data-soybean-split-menu-content :class="cls">
    <slot />
  </Primitive>
</template>
