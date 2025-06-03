<script setup lang="ts">
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/alert-dialog';
import { buttonVariants } from '../variants/button';
import { dialogVariants } from '../variants/dialog';
import SectionWrapper from '../components/section-wrapper.vue';

const { content, description, overlay, title } = dialogVariants();
</script>

<template>
  <SectionWrapper title="Alert Dialog">
    <AlertDialogRoot>
      <AlertDialogTrigger as="template">
        <button :class="buttonVariants({ variant: 'pure' })" class="w-20">Open</button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay :class="overlay()" />
        <AlertDialogContent :class="content()">
          <AlertDialogTitle :class="title()">Alert Dialog Title</AlertDialogTitle>
          <AlertDialogDescription :class="description()">Alert Dialog Description</AlertDialogDescription>
          <div class="flex justify-end gap-2">
            <AlertDialogCancel as="template">
              <button :class="buttonVariants({ variant: 'outline' })">Cancel</button>
            </AlertDialogCancel>
            <AlertDialogCancel as="template">
              <button :class="buttonVariants()">Confirm</button>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </SectionWrapper>
</template>
