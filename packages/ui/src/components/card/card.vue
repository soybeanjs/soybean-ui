<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import { cardVariants, cn } from '@soybean-unify/ui-variants';
import SCardRoot from './card-root.vue';
import SCardHeader from './card-header.vue';
import SCardTitleRoot from './card-title-root.vue';
import SCardTitle from './card-title.vue';
import SCardDescription from './card-description.vue';
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
  description: () => any;
  extra: () => any;
  footer: () => any;
};

const slots = defineSlots<Slots>();

const delegatedProps = reactiveOmit(props, [
  'title',
  'description',
  'size',
  'split',
  'headerProps',
  'titleRootProps',
  'titleProps',
  'descriptionProps',
  'contentProps',
  'footerProps'
]);

const forwardedProps = useForwardProps(delegatedProps);

const showTitle = computed(() => {
  return Boolean(slots.title || props.title);
});

const showDescription = computed(() => {
  return Boolean(slots.description || props.description);
});

const showTitleRoot = computed(() => {
  return Boolean(showTitle.value || showDescription.value);
});

const showHeader = computed(() => {
  return Boolean(showTitleRoot.value || slots.extra);
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

const showFooter = computed(() => {
  return Boolean(slots.footer);
});

const footerComputedProps = computed(() => {
  const config = { ...props.footerProps };

  if (!config.size) {
    config.size = props.size;
  }

  if (!config.split) {
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
        <SCardTitleRoot v-if="showTitleRoot" v-bind="titleRootProps">
          <SCardTitle v-if="showTitle" v-bind="titleProps">
            <slot name="title">{{ title }}</slot>
          </SCardTitle>
          <SCardDescription v-if="showDescription" v-bind="descriptionProps">
            <slot name="description">{{ description }}</slot>
          </SCardDescription>
        </SCardTitleRoot>
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
