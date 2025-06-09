<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from '@/components/tooltip';
import { tooltipVariants } from '../variants/tooltip';
import { buttonVariants } from '../variants/button';
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
