<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger
} from '@/components/dropdown-menu';
import { menuVariants } from '../variants/menu';
import { buttonVariants } from '../variants/button';
import SectionWrapper from '../components/section-wrapper.vue';

const {
  content,
  item
  // itemLink,
  // itemLinkIcon,
  // subTrigger,
  // subContent,
  // checkboxItem,
  // itemIndicator,
  // radioItem,
  // separator,
  // group,
  // label,
  // shortcut
} = menuVariants();
</script>

<template>
  <SectionWrapper title="Dropdown">
    <DropdownMenuRoot>
      <DropdownMenuTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-20">Open</button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent :class="content()" side="right">
          <DropdownMenuItem :class="item()">Item 1</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 2</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 3</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 4</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 5</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 6</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 7</DropdownMenuItem>
          <DropdownMenuItem :class="item()">Item 8</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </SectionWrapper>
</template>
