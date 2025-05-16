<script setup lang="ts">
import { computed } from 'vue';
import type { CardProps } from '../types';
import SCardRoot from './card-root.vue';
import SCardHeader from './card-header.vue';
import SCardTitleRoot from './card-title-root.vue';
import SCardTitle from './card-title.vue';
import SCardContent from './card-content.vue';
import SCardFooter from './card-footer.vue';

defineOptions({
  name: 'SCard'
});

const { class: cls, size, split, title, ui, flexHeight } = defineProps<CardProps>();

type Slots = {
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  footer?: () => any;
};

const slots = defineSlots<Slots>();

const showHeader = computed(() => {
  return Boolean(slots.header || slots.title || title || slots.extra);
});
</script>

<template>
  <SCardRoot :class="cls || ui?.root" :size="size" :split="split">
    <SCardHeader v-if="showHeader" :class="ui?.header" :size="size">
      <slot name="header">
        <slot name="title-root">
          <SCardTitleRoot :class="ui?.titleRoot" :size="size">
            <slot name="title-leading" />
            <SCardTitle :class="ui?.title" :size="size">
              <slot name="title">{{ title }}</slot>
            </SCardTitle>
            <slot name="title-trailing" />
          </SCardTitleRoot>
        </slot>
        <slot name="extra" />
      </slot>
    </SCardHeader>
    <SCardContent :class="ui?.content" :size="size" :flex-height="flexHeight">
      <slot />
    </SCardContent>
    <SCardFooter v-if="slots.footer" :class="ui?.footer" :size="size">
      <slot name="footer" />
    </SCardFooter>
  </SCardRoot>
</template>
