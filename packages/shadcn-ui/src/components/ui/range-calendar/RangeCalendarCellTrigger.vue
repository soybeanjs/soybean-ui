<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue';
import { RangeCalendarCellTrigger, type RangeCalendarCellTriggerProps, useForwardProps } from 'radix-vue';
import { buttonVariants } from '@ui/components/ui/button';
import { cn } from '@ui/lib/utils';

const props = defineProps<RangeCalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RangeCalendarCellTrigger
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),
        'h-9 w-9 p-0 font-normal data-[selected]:opacity-100',
        '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
        // Selection Start
        'data-[selection-start]:bg-maincolor data-[selection-start]:text-maincolor-foreground data-[selection-start]:hover:bg-maincolor data-[selection-start]:hover:text-maincolor-foreground data-[selection-start]:focus:bg-maincolor data-[selection-start]:focus:text-maincolor-foreground',
        // Selection End
        'data-[selection-end]:bg-maincolor data-[selection-end]:text-maincolor-foreground data-[selection-end]:hover:bg-maincolor data-[selection-end]:hover:text-maincolor-foreground data-[selection-end]:focus:bg-maincolor data-[selection-end]:focus:text-maincolor-foreground',
        // Outside months
        'data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30',
        // Disabled
        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
        // Unavailable
        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
