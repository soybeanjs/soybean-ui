<script setup lang="ts">
import { computed } from 'vue';
import { cardVariants, cn } from '@soybean-ui/variants';
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

const {
  class: rootCls,
  size,
  split,
  title,
  headerClass,
  titleClass,
  titleRootClass,
  contentClass,
  footerClass
} = defineProps<CardProps>();

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

const showHeader = computed(() => {
  return Boolean(slots.header || slots.title || title || slots.extra);
});

const headerSplit = computed(() => split === 'header' || split === 'all');

const showFooter = computed(() => Boolean(slots.footer));

const footerSplit = computed(() => split === 'footer' || split === 'all');

const contentCls = computed(() => {
  const contentSplit = getSplit(split, showHeader.value, showFooter.value);

  const { content } = cardVariants({ size, split: contentSplit });

  return cn(content(), contentClass);
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
  <SCardRoot :class="rootCls" :size>
    <SCardHeader v-if="showHeader" :class="headerClass" :size :split="headerSplit">
      <slot name="header">
        <slot name="title-root">
          <SCardTitleRoot :class="titleRootClass">
            <slot name="title-leading" />
            <SCardTitle :class="titleClass" :size>
              <slot name="title">{{ title }}</slot>
            </SCardTitle>
            <slot name="title-trailing" />
          </SCardTitleRoot>
        </slot>
        <slot name="extra"></slot>
      </slot>
    </SCardHeader>
    <SCardContent :class="contentCls" :size>
      <slot />
    </SCardContent>
    <SCardFooter v-if="showFooter" :class="footerClass" :size :split="footerSplit">
      <slot name="footer"></slot>
    </SCardFooter>
  </SCardRoot>
</template>

<style scoped></style>
