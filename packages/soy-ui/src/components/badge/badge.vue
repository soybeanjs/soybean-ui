<script lang="ts" setup>
import { computed } from 'vue';
import { useForwardProps } from '@soybean-ui/primitives';
import { useThemeSize } from '../../context/theme';
import SBadgeRoot from './badge-root.vue';
import SBadgeContent from './badge-content.vue';
import type { BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const { class: cls, ui, text, show = true, size: _size, ...delegatedContentProps } = defineProps<BadgeProps>();

const themeSize = useThemeSize();

const forwardedContentProps = useForwardProps(delegatedContentProps);

const size = computed(() => _size || themeSize.value);
</script>

<template>
  <SBadgeRoot :class="cls || ui?.root">
    <slot />
    <SBadgeContent v-if="show" v-bind="forwardedContentProps" :class="ui?.content" :size="size">
      <slot name="content" :value="text">
        {{ text }}
      </slot>
    </SBadgeContent>
  </SBadgeRoot>
</template>
