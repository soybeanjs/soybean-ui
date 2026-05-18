<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuCompact, provideNavigationMenuUi } from '@soybeanjs/headless/navigation-menu';
import { useOmitProps, useForwardListeners } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { navigationMenuVariants } from '@/styles/navigation-menu';
import type { NavigationMenuProps, NavigationMenuEmits, NavigationMenuSlots } from './types';

defineOptions({
  name: 'SNavigationMenu'
});

const props = defineProps<NavigationMenuProps>();

const emit = defineEmits<NavigationMenuEmits>();

const slots = defineSlots<NavigationMenuSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => navigationMenuVariants({ size: props.size }, props.ui, { root: props.class }));

provideNavigationMenuUi(ui);
</script>

<template>
  <NavigationMenuCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </NavigationMenuCompact>
</template>
