<script setup lang="ts">
import {
  SMenubar,
  SMenubarContent,
  SMenubarGroup,
  SMenubarItem,
  SMenubarLabel,
  SMenubarMenu,
  SMenubarSeparator,
  SMenubarShortcut,
  SMenubarSub,
  SMenubarSubContent,
  SMenubarSubTrigger,
  SMenubarTrigger
} from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SMenubar>
      <SMenubarMenu value="file">
        <SMenubarTrigger>File</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarGroup>
            <SMenubarLabel>File</SMenubarLabel>
            <SMenubarItem>
              New Tab
              <SMenubarShortcut>⌘T</SMenubarShortcut>
            </SMenubarItem>
            <SMenubarItem>
              New Window
              <SMenubarShortcut>⌘N</SMenubarShortcut>
            </SMenubarItem>
          </SMenubarGroup>
          <SMenubarSeparator />
          <SMenubarSub>
            <SMenubarSubTrigger>Share</SMenubarSubTrigger>
            <SMenubarSubContent>
              <SMenubarItem>Email Link</SMenubarItem>
              <SMenubarItem>Messages</SMenubarItem>
              <SMenubarItem>Notes</SMenubarItem>
            </SMenubarSubContent>
          </SMenubarSub>
          <SMenubarSeparator />
          <SMenubarItem variant="destructive">Close Window</SMenubarItem>
        </SMenubarContent>
      </SMenubarMenu>

      <SMenubarMenu value="edit">
        <SMenubarTrigger>Edit</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarItem>
            Undo
            <SMenubarShortcut>⌘Z</SMenubarShortcut>
          </SMenubarItem>
          <SMenubarItem>
            Redo
            <SMenubarShortcut>⇧⌘Z</SMenubarShortcut>
          </SMenubarItem>
          <SMenubarSeparator />
          <SMenubarItem>
            Cut
            <SMenubarShortcut>⌘X</SMenubarShortcut>
          </SMenubarItem>
          <SMenubarItem>
            Copy
            <SMenubarShortcut>⌘C</SMenubarShortcut>
          </SMenubarItem>
          <SMenubarItem>
            Paste
            <SMenubarShortcut>⌘V</SMenubarShortcut>
          </SMenubarItem>
        </SMenubarContent>
      </SMenubarMenu>

      <SMenubarMenu value="view">
        <SMenubarTrigger>View</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarItem>Reload</SMenubarItem>
          <SMenubarItem>Force Reload</SMenubarItem>
          <SMenubarSeparator />
          <SMenubarItem>Actual Size</SMenubarItem>
          <SMenubarItem>Zoom In</SMenubarItem>
          <SMenubarItem>Zoom Out</SMenubarItem>
        </SMenubarContent>
      </SMenubarMenu>
    </SMenubar>
  </div>
</template>
