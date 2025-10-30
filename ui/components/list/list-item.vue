<script setup lang="ts">
import { useSlots } from 'vue';
import { ListContent, ListDescription, ListItem, ListTitle } from '@headless';
import type { ListItemProps } from './types';

defineOptions({
  name: 'SListItem'
});

defineProps<ListItemProps>();

const slots = useSlots();
</script>

<template>
  <ListItem>
    <slot name="leading" />
    <ListContent v-bind="contentProps">
      <ListTitle v-if="slots.title || title" v-bind="titleProps">
        <slot name="title">{{ title }}</slot>
      </ListTitle>
      <ListDescription v-if="slots.description || description" v-bind="descriptionProps">
        <slot name="description">{{ description }}</slot>
      </ListDescription>
      <slot />
    </ListContent>
    <slot name="trailing" />
  </ListItem>
</template>
