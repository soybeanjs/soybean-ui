<script setup lang="ts">
import { computed } from 'vue';
import SCardRoot from './card-root.vue';
import SCardHeader from './card-header.vue';
import SCardTitleRoot from './card-title-root.vue';
import SCardTitle from './card-title.vue';
import SCardBody from './card-body.vue';
import SCardFooter from './card-footer.vue';
import type { CardProps } from './types';

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
  bodyClass,
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

const showFooter = computed(() => Boolean(slots.footer));
</script>

<template>
  <SCardRoot :class="rootCls" :size="size" :split="split">
    <SCardHeader v-if="showHeader" :class="headerClass" :size>
      <slot name="header">
        <slot name="title-root">
          <SCardTitleRoot :class="titleRootClass">
            <slot name="title-leading" />
            <SCardTitle :class="titleClass" :size="size">
              <slot name="title">{{ title }}</slot>
            </SCardTitle>
            <slot name="title-trailing" />
          </SCardTitleRoot>
        </slot>
        <slot name="extra"></slot>
      </slot>
    </SCardHeader>
    <SCardBody :class="bodyClass" :size="size">
      <slot />
    </SCardBody>
    <SCardFooter v-if="showFooter" :class="footerClass" :size="size">
      <slot name="footer"></slot>
    </SCardFooter>
  </SCardRoot>
</template>

<style scoped></style>
