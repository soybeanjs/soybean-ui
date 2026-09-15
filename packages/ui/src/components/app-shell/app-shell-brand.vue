<script setup lang="ts">
import { computed } from 'vue';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { AppShellBrandLayout } from './shared';
import type { AppShellBrandSlotProps, AppShellLogoPlacementResolved } from './types';

defineOptions({
  name: 'AppShellBrand'
});

interface Props {
  /** Resolved placement of the region. */
  placement: AppShellLogoPlacementResolved;
  /** Whether the sidebar is collapsed. */
  collapsed: boolean;
  /** Cell geometry of the current mode and sidebar state. */
  layout: AppShellBrandLayout;
  /** Class of the region. */
  regionClass: ClassValue;
  /** Class of the mark cell. */
  markClass: ClassValue;
  /** Class of the title cell. */
  titleClass: ClassValue;
}

const props = defineProps<Props>();

interface Slots {
  logo?: (props: AppShellBrandSlotProps) => any;
  title?: (props: AppShellBrandSlotProps) => any;
}

const slots = defineSlots<Slots>();

/** A cell sized to the column it aligns to; `undefined` lets the content size it. */
function toCellStyle(width: number | undefined) {
  return width === undefined ? undefined : { width: `${width}rem` };
}

const slotProps = computed<AppShellBrandSlotProps>(() => ({
  collapsed: props.collapsed,
  placement: props.placement
}));

/**
 * Whether the mark and the title align to the sidebar's columns.
 *
 * Only the rail modes do; everywhere else the two share one row and are sized by
 * their own content.
 */
const aligned = computed(() => props.layout.markWidth !== undefined);

/**
 * Whether the row centers its content.
 *
 * A collapsed sidebar without a rail has room for the mark alone, and takes no
 * padding: centering it is what keeps the mark in the middle of the shrunken
 * column instead of leaving it against the start edge.
 */
const centered = computed(() => props.collapsed && !aligned.value);

const markStyle = computed(() => toCellStyle(props.layout.markWidth));

const titleStyle = computed(() => toCellStyle(props.layout.titleWidth));

const showTitle = computed(() => Boolean(slots.title) && props.layout.titleVisible);
</script>

<template>
  <div
    :class="regionClass"
    data-soybean-app-shell-logo
    :data-placement="placement"
    :data-aligned="aligned ? 'true' : undefined"
    :data-centered="centered ? 'true' : undefined"
    :data-collapsed="collapsed ? 'true' : undefined"
  >
    <div
      :class="markClass"
      :style="markStyle"
      :data-divider="aligned ? 'true' : undefined"
      data-soybean-app-shell-logo-mark
    >
      <slot name="logo" v-bind="slotProps" />
    </div>
    <div v-if="showTitle" :class="titleClass" :style="titleStyle" data-soybean-app-shell-logo-title>
      <slot name="title" v-bind="slotProps" />
    </div>
  </div>
</template>
