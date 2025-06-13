<script setup lang="ts">
import { SButton, SCard } from '@ui';
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@headless';
import { dialogVariants } from '@variants/dialog';

const { content, description, overlay, title } = dialogVariants();
</script>

<template>
  <SCard title="Alert Dialog">
    <AlertDialogRoot>
      <AlertDialogTrigger as="template">
        <SButton variant="pure" class="w-20">Open</SButton>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay :class="overlay()" />
        <AlertDialogContent :class="content()">
          <AlertDialogTitle :class="title()">Alert Dialog Title</AlertDialogTitle>
          <AlertDialogDescription :class="description()">Alert Dialog Description</AlertDialogDescription>
          <div class="flex justify-end gap-2">
            <AlertDialogCancel as="template">
              <SButton variant="outline">Cancel</SButton>
            </AlertDialogCancel>
            <AlertDialogCancel as="template">
              <SButton>Confirm</SButton>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </SCard>
</template>
