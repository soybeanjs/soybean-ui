<script setup lang="ts">
import { computed } from 'vue';
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyRoot,
  EmptyTitle,
  provideEmptyUi
} from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { emptyVariants } from './variants';
import type { EmptyProps } from './types';

defineOptions({
  name: 'SEmpty'
});

const props = defineProps<EmptyProps>();

const forwardedProps = useOmitProps(props, [
  'class',
  'ui',
  'title',
  'description',
  'icon',
  'mediaVariant',
  'headerProps',
  'mediaProps',
  'contentProps',
  'titleProps',
  'descriptionProps'
]);

type Slots = {
  default?: () => any;
  media?: () => any;
  title?: () => any;
  description?: () => any;
};

const slots = defineSlots<Slots>();

const showHeader = computed(() => Boolean(slots.title || slots.description || props.title || props.description));

const showMedia = computed(() => Boolean(slots.media || props.icon));

const ui = computed(() => {
  const variants = emptyVariants({
    mediaVariant: props.mediaVariant
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideEmptyUi(ui);
</script>

<template>
  <EmptyRoot v-bind="forwardedProps">
    <EmptyMedia v-if="showMedia" v-bind="mediaProps">
      <slot name="media">
        <Icon :icon="icon" />
      </slot>
    </EmptyMedia>
    <EmptyContent v-bind="contentProps">
      <EmptyHeader v-if="showHeader" v-bind="headerProps">
        <EmptyTitle v-if="slots.title || title" v-bind="titleProps">
          <slot name="title">{{ title }}</slot>
        </EmptyTitle>
        <EmptyDescription v-if="slots.description || description" v-bind="descriptionProps">
          <slot name="description">{{ description }}</slot>
        </EmptyDescription>
      </EmptyHeader>
      <slot />
    </EmptyContent>
  </EmptyRoot>
</template>
