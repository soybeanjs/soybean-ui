<script setup lang="ts">
import { computed } from 'vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  VisuallyHidden,
  useForwardProps,
  useForwardPropsEmits
} from '@soybean-ui/primitive';
import { X } from 'lucide-vue-next';
import { cn, sheetVariants } from '@soybean-ui/variants';
import { computedOmit, computedPick } from '../../shared';
import SCard from '../card/card.vue';
import SButtonIcon from '../button/button-icon.vue';
import type { SheetContentEmits, SheetContentProps } from './types';

defineOptions({
  name: 'SSheetContent'
});

const { class: cls, side, showClose = true, footerClass, ...delegatedProps } = defineProps<SheetContentProps>();

const emit = defineEmits<SheetContentEmits>();

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

const delegatedContentProps = computedPick(delegatedProps, ['forceMount', 'trapFocus', 'disableOutsidePointerEvents']);

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);

const delegatedCardProps = computedOmit(delegatedProps, ['forceMount', 'trapFocus', 'disableOutsidePointerEvents']);

const forwardedCardProps = useForwardProps(delegatedCardProps);

const slotKeys = computed(() => {
  const allKeys = Object.keys(slots) as (keyof Slots)[];

  const remainingKeys = allKeys.filter(key => key !== 'default' && key !== 'close');

  if (showClose && !remainingKeys.includes('extra')) {
    remainingKeys.push('extra');
  }

  return remainingKeys;
});

const mergedCls = computed(() => {
  const { content } = sheetVariants({ side });

  return cn(content(), cls);
});

const { cardFooter } = sheetVariants();

const mergedFooterCls = computed(() => cn(cardFooter(), footerClass));
</script>

<template>
  <DialogContent as-child v-bind="forwardedContent">
    <SCard v-bind="forwardedCardProps" :class="mergedCls" :footer-class="mergedFooterCls">
      <VisuallyHidden>
        <DialogTitle />
        <DialogDescription />
      </VisuallyHidden>
      <slot />
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
        <slot :name="slotKey">
          <template v-if="slotKey === 'extra'">
            <DialogClose v-if="showClose" as-child>
              <slot name="close">
                <SButtonIcon size="sm">
                  <X />
                </SButtonIcon>
              </slot>
            </DialogClose>
          </template>
        </slot>
      </template>
    </SCard>
  </DialogContent>
</template>

<style scoped></style>
