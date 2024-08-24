<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from 'radix-vue';
import { cardVariants, cn } from '@soybean-unify/ui-variants';
import { computedOmit } from '../../shared';
import SCardRoot from './card-root.vue';
import SCardHeader from './card-header.vue';
import SCardTitleRoot from './card-title-root.vue';
import SCardTitle from './card-title.vue';
import SCardContent from './card-content.vue';
import SCardFooter from './card-footer.vue';
import type { CardProps, CardSplit } from './types';

defineOptions({
  name: 'SCard'
});

const props = withDefaults(defineProps<CardProps>(), {
  size: 'md',
  split: 'none'
});

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

const delegatedProps = computedOmit(props, [
  'title',
  'size',
  'split',
  'headerClass',
  'titleClass',
  'titleRootClass',
  'contentClass',
  'footerClass'
]);

const forwardedProps = useForwardProps(delegatedProps);

const showHeader = computed(() => {
  return Boolean(slots.header || slots.title || props.title || slots.extra);
});

const headerSplit = computed(() => props.split === 'header' || props.split === 'all');

const showFooter = computed(() => Boolean(slots.footer));

const footerSplit = computed(() => props.split === 'footer' || props.split === 'all');

const contentCls = computed(() => {
  const split = getSplit(props.split, showHeader.value, showFooter.value);

  const { content } = cardVariants({ size: props.size, split });

  return cn(content(), props.contentClass);
});

function getSplit(initSplit?: CardSplit, headerVisible?: boolean, footerVisible?: boolean) {
  if (initSplit === 'all') {
    return 'all';
  }

  if (!headerVisible && !footerVisible) {
    return 'all';
  }

  if (!headerVisible) {
    return initSplit === 'footer' ? 'all' : 'header';
  }

  if (!footerVisible) {
    return initSplit === 'header' ? 'all' : 'footer';
  }

  return initSplit;
}
</script>

<template>
  <SCardRoot v-bind="forwardedProps">
    <SCardHeader v-if="showHeader" :size="size" :split="headerSplit" :class="headerClass">
      <slot name="header">
        <slot name="title-root">
          <SCardTitleRoot :class="titleRootClass">
            <slot name="title-leading" />
            <SCardTitle :size="size" :class="titleClass">
              <slot name="title">{{ title }}</slot>
            </SCardTitle>
            <slot name="title-trailing" />
          </SCardTitleRoot>
        </slot>
        <slot name="extra"></slot>
      </slot>
    </SCardHeader>
    <SCardContent :size="size" :class="contentCls">
      <slot />
    </SCardContent>
    <SCardFooter v-if="showFooter" :size="size" :split="footerSplit" :class="footerClass">
      <slot name="footer"></slot>
    </SCardFooter>
  </SCardRoot>
</template>

<style scoped></style>
