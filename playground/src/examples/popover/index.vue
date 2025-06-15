<script setup lang="ts">
import { SButton, SCard, SIcon } from '@ui';
import {
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from '@headless';
import { popoverVariants } from '@variants/popover';

const { content, arrow } = popoverVariants();
</script>

<template>
  <SCard title="Popover">
    <PopoverRoot>
      <PopoverTrigger as-child>
        <SButton variant="pure" class="w-20 mr-3">Open</SButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :class="content()">
          <PopoverArrow :class="arrow()" />
          <PopoverClose as-child>
            <SIcon icon="lucide:x" class="absolute top-1 right-1 size-3 cursor-pointer" />
          </PopoverClose>
          <p>This is a popover</p>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <PopoverRoot>
      <PopoverTrigger as-child>
        <SButton variant="pure" class="w-fit mr-3">Open Custom Anchor</SButton>
      </PopoverTrigger>
      <PopoverAnchor as-child>
        <SButton variant="soft" class="w-fit cursor-default">Custom Anchor</SButton>
      </PopoverAnchor>
      <PopoverPortal>
        <PopoverContent :class="content()">
          <PopoverArrow :class="arrow()" />
          <PopoverClose as-child>
            <SIcon icon="lucide:x" class="absolute top-1 right-1 size-3 cursor-pointer" />
          </PopoverClose>
          <p>This is a popover</p>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </SCard>
</template>
