<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="rounded-md border bg-muted/20 p-4">
      <p class="text-sm text-muted-foreground">
        Scroll the page to keep the button pinned near the top of the viewport.
      </p>
      <div class="h-48" />
      <SAffix target="#__DEMO_AFFIX_SCROLL" :offset-top="24">
        <div class="w-fit">
          <SButton>Back to top</SButton>
        </div>
      </SAffix>
      <div class="h-48" />
    </div>
  </div>
</template>
