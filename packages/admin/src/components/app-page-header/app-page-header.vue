<script setup lang="ts">
import { computed } from 'vue';
import { SButtonIcon } from '@soybeanjs/ui';
import { appPageHeaderVariants } from '@/styles/app-page-header';
import type { AppPageHeaderProps } from './types';

defineOptions({
  name: 'SAppPageHeader'
});

const props = withDefaults(defineProps<AppPageHeaderProps>(), {
  title: undefined,
  description: undefined,
  showBack: false,
  sticky: false
});

const emit = defineEmits<{ back: [] }>();

const ui = computed(() => appPageHeaderVariants({ sticky: props.sticky }, { root: props.class }));

function handleBack() {
  emit('back');
}
</script>

<template>
  <div :class="ui.root">
    <div :class="ui.titleBlock">
      <SButtonIcon v-if="showBack" icon="lucide:arrow-left" variant="ghost" @click="handleBack" />
      <div class="min-w-0">
        <h2 v-if="title" :class="ui.title">{{ title }}</h2>
        <p v-if="description" :class="ui.description">{{ description }}</p>
      </div>
    </div>
    <div v-if="$slots.default" :class="ui.actions">
      <slot />
    </div>
  </div>
</template>
