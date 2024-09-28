<script setup lang="ts">
import { computed } from 'vue';
import { VisuallyHidden, useForwardProps } from 'radix-vue';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from 'vaul-vue';
import { X } from 'lucide-vue-next';
import { cn, drawerVariants } from '@soybean-ui/variants';
import SCard from '../card/card.vue';
import SButtonIcon from '../button/button-icon.vue';
import SDrawerKnob from './drawer-knob.vue';
import type { DrawerContentProps } from './types';

defineOptions({
  name: 'SDrawerContent'
});

const {
  class: cls,
  showClose = true,
  closeClass,
  cardClass,
  footerClass,
  ...delegatedProps
} = defineProps<DrawerContentProps>();

type Slots = {
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  close: () => any;
  footer: () => any;
};

const slots = defineSlots<Slots>();

const forwardedCardProps = useForwardProps(delegatedProps);

const slotKeys = computed(() => {
  const allKeys = Object.keys(slots) as (keyof Slots)[];

  const remainingKeys = allKeys.filter(key => key !== 'default' && key !== 'close');

  return remainingKeys;
});

const { content, card, cardFooter, close } = drawerVariants();

const mergedCls = computed(() => cn(content(), cls));

const mergedCloseCls = computed(() => cn(close(), closeClass));

const mergedCardCls = computed(() => cn(card(), cardClass));

const mergedCardFooterCls = computed(() => cn(cardFooter(), footerClass));
</script>

<template>
  <DrawerContent :class="mergedCls">
    <SDrawerKnob />
    <DrawerClose v-if="showClose" as-child>
      <slot name="close">
        <SButtonIcon size="sm" :class="mergedCloseCls">
          <X />
        </SButtonIcon>
      </slot>
    </DrawerClose>
    <SCard v-bind="forwardedCardProps" :class="mergedCardCls" :footer-class="mergedCardFooterCls">
      <VisuallyHidden>
        <DrawerTitle />
        <DrawerDescription />
      </VisuallyHidden>
      <slot />
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" />
      </template>
    </SCard>
  </DrawerContent>
</template>

<style scoped></style>
