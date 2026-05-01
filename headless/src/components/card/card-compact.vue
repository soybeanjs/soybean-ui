<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import { useCardUi } from './context';
import CardRoot from './card-root.vue';
import CardHeader from './card-header.vue';
import CardContent from './card-content.vue';
import CardFooter from './card-footer.vue';
import CardTitleRoot from './card-title-root.vue';
import CardTitle from './card-title.vue';
import CardDescription from './card-description.vue';
import type { CardCompactProps, CardCompactEmits, CardCompactSlots } from './types';

defineOptions({
  name: 'CardCompact'
});

const props = defineProps<CardCompactProps>();

const emit = defineEmits<CardCompactEmits>();

const slots = defineSlots<CardCompactSlots>();

const forwardedProps = useOmitProps(props, [
  'title',
  'description',
  'headerProps',
  'contentProps',
  'footerProps',
  'titleRootProps',
  'titleProps',
  'descriptionProps'
]);

const listeners = useForwardListeners(emit);

const ui = useCardUi();

const showHeader = computed(() => {
  return Boolean(slots.header || slots.title || slots.description || slots.extra || props.title || props.description);
});
</script>

<template>
  <CardRoot v-bind="forwardedProps" v-on="listeners">
    <CardHeader v-if="showHeader" v-bind="headerProps">
      <slot name="header">
        <CardTitleRoot v-bind="titleRootProps">
          <slot name="title-leading" />
          <CardTitle v-bind="titleProps">
            <slot name="title">{{ title }}</slot>
          </CardTitle>
          <slot name="title-trailing" />
        </CardTitleRoot>
        <slot name="extra" />
        <CardDescription v-if="slots.description || description" v-bind="descriptionProps">
          <slot name="description">{{ description }}</slot>
        </CardDescription>
      </slot>
    </CardHeader>
    <CardContent v-bind="contentProps">
      <slot />
    </CardContent>
    <CardFooter v-if="slots.footer" v-bind="footerProps">
      <slot name="footer" />
    </CardFooter>
  </CardRoot>
</template>
