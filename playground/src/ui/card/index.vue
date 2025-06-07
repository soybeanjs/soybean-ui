<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@/composables';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  CardTitleRoot,
  provideCardThemeContext
} from '@/components/card';
import { cn } from '../../theme/merge';
import { cardVariants } from '../../variants/card';
import type { CardProps } from './types';

defineOptions({
  name: 'Card'
});

const props = defineProps<CardProps>();

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'title',
  'description',
  'split',
  'flexHeight',
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
  const { root, header, content, footer, titleRoot, title, description } = cardVariants({
    size: props.size,
    split: props.split,
    flexHeight: props.flexHeight
  });

  return {
    root: cn(root(), props.ui?.root),
    header: cn(header(), props.ui?.header),
    content: cn(content(), props.ui?.content),
    footer: cn(footer(), props.ui?.footer),
    titleRoot: cn(titleRoot(), props.ui?.titleRoot),
    title: cn(title(), props.ui?.title),
    description: cn(description(), props.ui?.description)
  };
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
