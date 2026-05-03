<template>
  <SSplitterGroup class="h-48 rd-md border">
    <SSplitterPanel :default-size="25">
      <div class="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
        Navigation
      </div>
    </SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="Resize navigation and content panels" />
    <SSplitterPanel :default-size="50">
      <div class="flex h-full items-center justify-center bg-background text-sm">Content</div>
    </SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="Resize content and details panels" />
    <SSplitterPanel :default-size="25">
      <div class="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">Details</div>
    </SSplitterPanel>
  </SSplitterGroup>
</template>
