<script setup lang="ts">
import { computed } from 'vue';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  CardTitleRoot,
  provideCardThemeContext
} from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { cardVariants } from '@variants/card';
import type { CardProps } from './types';

defineOptions({
  name: 'SCard'
});

const props = withDefaults(defineProps<CardProps>(), {
  scrollable: true
});

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'title',
  'description',
  'scrollable',
  'split',
  'headerProps',
  'contentProps',
  'footerProps',
  'titleRootProps',
  'titleProps',
  'descriptionProps'
]);

type Slots = {
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  footer: () => any;
  description: () => any;
};

const slots = defineSlots<Slots>();

const showHeader = computed(() => {
  return Boolean(slots.header || slots.title || slots.description || slots.extra || props.title || props.description);
});

const ui = computed(() => {
  const variants = cardVariants({
    size: props.size,
    scrollable: props.scrollable,
    split: props.split
  });

  return mergeSlotVariants(variants, props.ui);
});

provideCardThemeContext({
  ui
});
</script>

<template>
  <CardRoot v-bind="forwardedProps">
    <CardHeader v-if="showHeader" v-bind="props.headerProps">
      <CardTitleRoot v-bind="props.titleRootProps">
        <slot name="title-leading" />
        <CardTitle v-bind="props.titleProps">
          <slot name="title">{{ title }}</slot>
        </CardTitle>
        <slot name="title-trailing" />
      </CardTitleRoot>
      <slot name="extra" />
      <CardDescription v-if="slots.description || description" v-bind="props.descriptionProps">
        <slot name="description">{{ description }}</slot>
      </CardDescription>
    </CardHeader>
    <CardContent v-bind="props.contentProps">
      <slot />
    </CardContent>
    <CardFooter v-if="slots.footer" v-bind="props.footerProps">
      <slot name="footer" />
    </CardFooter>
  </CardRoot>
</template>
