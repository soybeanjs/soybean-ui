<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import { cardVariants, cn } from '@soybean-unify/ui-variants';
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
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  footer: () => any;
};

const slots = defineSlots<Slots>();

const delegatedProps = reactiveOmit(props, [
  'title',
  'size',
  'split',
  'headerProps',
  'titleProps',
  'titleRootProps',
  'contentProps',
  'footerProps'
]);

const forwardedProps = useForwardProps(delegatedProps);

const showHeader = computed(() => {
  return Boolean(slots.header || slots.title || props.title || slots.extra);
});

const headerComputedProps = computed(() => {
  const config = { ...props.headerProps };

  if (!config.size) {
    config.size = props.size;
  }

  if (config.split === undefined) {
    config.split = props.split === 'header' || props.split === 'all';
  }

  return config;
});

const titleComputedProps = computed(() => {
  const config = { ...props.titleProps };

  if (!config.size) {
    config.size = props.size;
  }

  return config;
});

const showFooter = computed(() => {
  return Boolean(slots.footer);
});

const footerComputedProps = computed(() => {
  const config = { ...props.footerProps };

  if (!config.size) {
    config.size = props.size;
  }

  if (config.split === undefined) {
    config.split = props.split === 'footer' || props.split === 'all';
  }

  return config;
});

const contentComputedProps = computed(() => {
  const split = getSplit(props.split, showHeader.value, showFooter.value);

  const { content } = cardVariants({ size: props.size, split });

  const config = { ...props.contentProps };

  if (!config.size) {
    config.size = props.size;
  }

  config.class = cn(content(), config.class);

  return config;
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
    <SCardHeader v-if="showHeader" v-bind="headerComputedProps">
      <slot name="header">
        <slot name="title">
          <SCardTitleRoot>
            <slot name="title-leading" />
            <SCardTitle v-bind="titleComputedProps">{{ props.title }}</SCardTitle>
            <slot name="title-trailing" />
          </SCardTitleRoot>
        </slot>
        <slot name="extra"></slot>
      </slot>
    </SCardHeader>
    <SCardContent v-bind="contentComputedProps">
      <slot />
    </SCardContent>
    <SCardFooter v-if="showFooter" v-bind="footerComputedProps">
      <slot name="footer"></slot>
    </SCardFooter>
  </SCardRoot>
</template>

<style scoped></style>
