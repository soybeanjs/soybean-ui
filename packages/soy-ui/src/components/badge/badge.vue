<script lang="ts" setup>
import { useForwardProps } from '@soybean-ui/primitives';
import SBadgeRoot from './badge-root.vue';
import SBadgeContent from './badge-content.vue';
import type { BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const { class: cls, ui, text, show = true, ...delegatedContentProps } = defineProps<BadgeProps>();

const forwardedContentProps = useForwardProps(delegatedContentProps);
</script>

<template>
  <SBadgeRoot :class="cls || ui?.root">
    <slot />
    <SBadgeContent v-if="show" v-bind="forwardedContentProps" :class="ui?.content">
      <slot name="content" :value="text">
        {{ text }}
      </slot>
    </SBadgeContent>
  </SBadgeRoot>
</template>
