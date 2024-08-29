<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { badgeVariants, cn } from '@soybean-ui/variants';
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
    <slot name="trailing" :close-alert="closeAlert">
      <SButtonIcon
        v-if="closable"
        :color="color"
        :variant="variant"
        size="xs"
        fit-content
        :class="cn('border-0 bg-transparent -mr-1.5', closeClass)"
        @click="closeAlert"
      >
        <X />
      </SButtonIcon>
    </slot>
  </Primitive>
</template>

<style scoped></style>
