<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { badgeVariants, cn } from '@soybean-unify/ui-variants';
import { X } from 'lucide-vue-next';
import SButtonIcon from '../button/button-icon.vue';
import type { BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'div'
});

const close = defineModel<boolean>('close', {
  default: false
});

function closeAlert() {
  close.value = true;
}
</script>

<template>
  <Primitive v-show="!close" :as="as" :as-child="asChild" :class="cn(badgeVariants({ color, variant }), props.class)">
    <slot />
    <SButtonIcon v-if="closable" size="xs" class="size-fit -mr-2" @click="closeAlert">
      <X />
    </SButtonIcon>
  </Primitive>
</template>

<style scoped></style>
