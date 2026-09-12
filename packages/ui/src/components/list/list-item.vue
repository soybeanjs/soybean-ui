<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { useListUi } from './context';
import type { ListItemProps, ListItemSlots } from './types';

defineOptions({
  name: 'SListItem'
});

const props = defineProps<ListItemProps>();

const slots = defineSlots<ListItemSlots>();

const forwardedProps = useOmitProps(props, [
  'class',
  'title',
  'description',
  'contentProps',
  'titleProps',
  'descriptionProps'
]);

const itemUi = useListUi('item');
const contentUi = useListUi('content');
const titleUi = useListUi('title');
const descriptionUi = useListUi('description');

const itemClass = computed(() => [itemUi.value, props.class]);
</script>

<template>
  <li v-bind="forwardedProps" data-soybean-list-item :class="itemClass">
    <slot name="leading" />
    <div v-bind="contentProps" data-soybean-list-content :class="contentUi">
      <h3 v-if="slots.title || title" v-bind="titleProps" data-soybean-list-title :class="titleUi">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p
        v-if="slots.description || description"
        v-bind="descriptionProps"
        data-soybean-list-description
        :class="descriptionUi"
      >
        <slot name="description">{{ description }}</slot>
      </p>
      <slot />
    </div>
    <slot name="trailing" />
  </li>
</template>
