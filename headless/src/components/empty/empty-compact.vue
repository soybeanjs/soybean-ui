<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import EmptyContent from './empty-content.vue';
import EmptyDescription from './empty-description.vue';
import EmptyHeader from './empty-header.vue';
import EmptyMedia from './empty-media.vue';
import EmptyRoot from './empty-root.vue';
import EmptyTitle from './empty-title.vue';
import type { EmptyCompactProps, EmptyCompactSlots } from './types';

defineOptions({
  name: 'EmptyCompact'
});

const props = defineProps<EmptyCompactProps>();

defineSlots<EmptyCompactSlots>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'title',
  'description',
  'icon',
  'headerProps',
  'mediaProps',
  'contentProps',
  'titleProps',
  'descriptionProps'
]);

const showHeader = computed(() => Boolean(slots.title || slots.description || props.title || props.description));

const showMedia = computed(() => Boolean(slots.media || props.icon));
</script>

<template>
  <EmptyRoot v-bind="forwardedProps">
    <EmptyHeader v-if="showHeader" v-bind="headerProps">
      <EmptyMedia v-if="showMedia" v-bind="mediaProps">
        <slot name="media">
          <Icon v-if="icon" :icon="icon" />
        </slot>
      </EmptyMedia>
      <EmptyTitle v-if="slots.title || title" v-bind="titleProps">
        <slot name="title">{{ title }}</slot>
      </EmptyTitle>
      <EmptyDescription v-if="slots.description || description" v-bind="descriptionProps">
        <slot name="description">{{ description }}</slot>
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent v-bind="contentProps">
      <slot name="content" />
    </EmptyContent>
    <slot />
  </EmptyRoot>
</template>
