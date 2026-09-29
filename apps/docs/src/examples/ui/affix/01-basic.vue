<template>
  <div id="__DEMO_AFFIX_SCROLL" class="h-50 overflow-auto rounded-md border bg-muted/20 p-4">
    <p class="text-sm text-muted-foreground">Scroll the page to keep the button pinned near the top of the viewport.</p>
    <div class="h-48" />
    <SAffix target="#__DEMO_AFFIX_SCROLL" :offset-top="24">
      <div class="w-fit">
        <SButton variant="pure">Fixed Button</SButton>
      </div>
    </SAffix>
    <div class="h-48" />
  </div>
</template>
