<script setup lang="ts">
import { X } from 'lucide-vue-next';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '@/components/dialog';
import { buttonVariants } from '../variants/button';
import { dialogVariants } from '../variants/dialog';
import SectionWrapper from '../components/section-wrapper.vue';

const { closeIcon, content, description, overlay, title } = dialogVariants();
</script>

<template>
  <SectionWrapper title="Dialog">
    <DialogRoot>
      <DialogTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-20">Open</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay :class="overlay()" />
        <DialogContent :class="content()">
          <DialogTitle :class="title()">Dialog Title</DialogTitle>
          <DialogDescription :class="description()">Dialog Description</DialogDescription>
          <DialogClose as="template" :class="closeIcon()">
            <button>
              <X />
            </button>
          </DialogClose>
          <p>This is a dialog</p>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </SectionWrapper>
</template>
