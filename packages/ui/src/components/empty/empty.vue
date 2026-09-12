<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { emptyVariants } from '@/styles/empty';
import Icon from '../icon/icon.vue';
import type { EmptyProps, EmptySlots } from './types';

defineOptions({
  name: 'SEmpty'
});

const props = defineProps<EmptyProps>();

const slots = defineSlots<EmptySlots>();

const forwardedProps = useOmitProps(props, [
  'class',
  'ui',
  'size',
  'title',
  'description',
  'icon',
  'headerProps',
  'mediaProps',
  'contentProps',
  'titleProps',
  'descriptionProps'
]);

const ui = computed(() => emptyVariants({ size: props.size }, props.ui, { root: props.class }));

const showMedia = computed(() => Boolean(slots.media || props.icon));

const showHeader = computed(() =>
  Boolean(showMedia.value || slots.title || slots.description || props.title || props.description)
);
</script>

<template>
  <div v-bind="forwardedProps" data-soybean-empty-root :class="ui.root">
    <div v-if="showHeader" v-bind="headerProps" data-soybean-empty-header :class="ui.header">
      <div v-if="showMedia" v-bind="mediaProps" data-soybean-empty-media :class="ui.media">
        <slot name="media">
          <Icon v-if="icon" :icon="icon" />
        </slot>
      </div>
      <h3 v-if="slots.title || title" v-bind="titleProps" data-soybean-empty-title :class="ui.title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p
        v-if="slots.description || description"
        v-bind="descriptionProps"
        data-soybean-empty-description
        :class="ui.description"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <div v-bind="contentProps" data-soybean-empty-content :class="ui.content">
      <slot name="content" />
    </div>
    <slot />
  </div>
</template>
