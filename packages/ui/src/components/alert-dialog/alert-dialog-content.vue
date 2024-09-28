<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionalComponent } from 'vue';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  VisuallyHidden,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next';
import type { LucideProps } from 'lucide-vue-next';
import { computedOmit, computedPick } from '../../shared';
import SCard from '../card/card.vue';
import type { AlertDialogContentEmits, AlertDialogContentProps, AlertType } from './types';

defineOptions({
  name: 'SAlertDialogContent'
});

const { class: cls, type, footerClass, ...delegatedProps } = defineProps<AlertDialogContentProps>();

const emit = defineEmits<AlertDialogContentEmits>();

type Slots = {
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  footer: () => any;
};

const slots = defineSlots<Slots>();

const delegatedContentProps = computedPick(delegatedProps, ['forceMount', 'trapFocus', 'disableOutsidePointerEvents']);

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);

const delegatedCardProps = computedOmit(delegatedProps, ['forceMount', 'trapFocus', 'disableOutsidePointerEvents']);

const forwardedCardProps = useForwardProps(delegatedCardProps);

const slotKeys = computed(() => {
  const allKeys = Object.keys(slots) as (keyof Slots)[];

  const remainingKeys = allKeys.filter(key => key !== 'default');

  return remainingKeys;
});

const { content, cardFooter } = dialogVariants();

const mergedCls = computed(() => cn(content(), cls));

const mergedFooterCls = computed(() => cn(cardFooter(), footerClass));

const iconRecord: Record<AlertType, { icon: FunctionalComponent<LucideProps>; class: string }> = {
  destructive: {
    icon: CircleX,
    class: 'text-destructive'
  },
  success: {
    icon: CircleCheck,
    class: 'text-success'
  },
  warning: {
    icon: CircleAlert,
    class: 'text-warning'
  },
  info: {
    icon: Info,
    class: 'text-info'
  }
};

const iconProps = computed(() => {
  if (!type) {
    return null;
  }

  return iconRecord[type];
});
</script>

<template>
  <AlertDialogContent as-child v-bind="forwardedContent">
    <SCard v-bind="forwardedCardProps" :class="mergedCls" :footer-class="mergedFooterCls">
      <VisuallyHidden>
        <AlertDialogTitle />
        <AlertDialogDescription />
      </VisuallyHidden>
      <slot />
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
        <slot :name="slotKey">
          <template v-if="slotKey === 'title-leading'">
            <component :is="iconProps.icon" v-if="iconProps" :class="iconProps.class" />
          </template>
        </slot>
      </template>
    </SCard>
  </AlertDialogContent>
</template>

<style scoped></style>
