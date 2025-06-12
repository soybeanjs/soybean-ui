<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from '@headless/components/tooltip';
import { tooltipVariants } from '../../../ui/variants/tooltip';
import { buttonVariants } from '../../../ui/variants/button';
import SectionWrapper from '../components/section-wrapper.vue';

const { content, arrow } = tooltipVariants();
</script>

<template>
  <SectionWrapper title="Tooltip">
    <TooltipRoot>
      <TooltipTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-30">Hover me</button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent side="top" :class="content()">
          <p>This is a tooltip</p>
          <TooltipArrow :class="arrow()" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </SectionWrapper>
</template>
