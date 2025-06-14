<script setup lang="ts">
import { SButton, SCard } from '@ui';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from '@headless';
import { tooltipVariants } from '@variants/tooltip';

const { content, arrow } = tooltipVariants();
</script>

<template>
  <SCard title="Tooltip">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <SButton variant="pure" class="w-30">Hover me</SButton>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent side="top" :class="content()">
          <p>This is a tooltip</p>
          <TooltipArrow :class="arrow()" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </SCard>
</template>
