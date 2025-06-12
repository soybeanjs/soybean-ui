<script setup lang="ts">
import { X } from 'lucide-vue-next';
import {
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from '@headless/components/popover';
import { buttonVariants } from '../../../ui/variants/button';
import { popoverVariants } from '../../../ui/variants/popover';
import SectionWrapper from '../components/section-wrapper.vue';

const { content, arrow } = popoverVariants();
</script>

<template>
  <SectionWrapper title="Popover">
    <PopoverRoot>
      <PopoverTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-20">Open</button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :class="content()">
          <PopoverArrow :class="arrow()" />
          <PopoverClose as="template">
            <X class="absolute top-1 right-1 size-3 cursor-pointer" />
          </PopoverClose>
          <p>This is a popover</p>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <PopoverRoot>
      <PopoverTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-20">Open</button>
      </PopoverTrigger>
      <PopoverAnchor as="template">
        <div :class="buttonVariants({ variant: 'pure' })" class="w-fit cursor-default">Custom Anchor</div>
      </PopoverAnchor>
      <PopoverPortal>
        <PopoverContent :class="content()">
          <PopoverArrow :class="arrow()" />
          <PopoverClose as="template">
            <X class="absolute top-1 right-1 size-3 cursor-pointer" />
          </PopoverClose>
          <p>This is a popover</p>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </SectionWrapper>
</template>
