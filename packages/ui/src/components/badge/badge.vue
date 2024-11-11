<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { badgeVariants, cn } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import SButtonIcon from '../button/button-icon.vue';
import type { BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const { class: cls, closeClass, color, variant } = defineProps<BadgeProps>();

const mergedCls = computed(() => cn(badgeVariants({ color, variant }), cls));

const mergedCloseCls = computed(() => cn('border-0 bg-transparent -mr-1.5', closeClass));

const close = defineModel<boolean>('close', {
  default: false
});

function closeAlert() {
  close.value = true;
}
</script>

<template>
  <Primitive v-show="!close" as="div" :class="mergedCls">
    <slot />
    <slot name="trailing" :close-alert="closeAlert">
      <SButtonIcon v-if="closable" :color :variant size="xs" fit-content :class="mergedCloseCls" @click="closeAlert">
        <X />
      </SButtonIcon>
    </slot>
  </Primitive>
</template>

<style scoped></style>
