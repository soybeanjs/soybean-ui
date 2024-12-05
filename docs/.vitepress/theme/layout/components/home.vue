<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'Home'
});
</script>

<template>
  <div class="grid justify-items-center gap-8 p-5 px-3 md:gap-10 md:px-8 sm:px-4">
    <div class="grid mt-6 max-w-4xl w-full justify-items-center gap-[inherit] md:mt-20 sm:mt-10">
      <h1 class="text-center text-pretty text-4xl text-foreground font-bold md:text-7xl sm:text-6xl sm:font-extrabold">
        Craft accessible web apps with Vue
      </h1>
      <p
        class="max-w-[720px] text-center text-pretty text-lg text-muted-foreground lg:text-2xl md:text-xl lg:leading-9 md:leading-8"
      >
        An open-source library with
        <a
          class="relative inline-block text-foreground font-semibold before:[translate:0_-0.1em] before:absolute before:inset-x-0 before:top-full before:h-[2px] before:bg-primary hover:before:h-[4px]"
          href="/docs/guides/styling"
        >
          unstyled
        </a>
        ,
        <a
          class="relative inline-block text-foreground font-semibold before:[translate:0_-0.1em] before:absolute before:inset-x-0 before:top-full before:h-[2px] before:bg-primary hover:before:h-[4px]"
          href="/docs/guides/composition"
        >
          primitive
        </a>
        components, accompanied by a variety of
        <a
          class="relative inline-block text-foreground font-semibold before:[translate:0_-0.1em] before:absolute before:inset-x-0 before:top-full before:h-[2px] before:bg-primary hover:before:h-[4px]"
          href="/examples"
        >
          examples & use cases
        </a>
        ready to be integrated into your projects.
      </p>
    </div>
    <div class="mb-12 max-w-[calc(100%-2rem)] flex flex-wrap items-center justify-center gap-4 md:mb-20">
      <a
        class="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-primary-foreground font-semibold hover:bg-primary/90 focus-visible:(outline-2 outline-primary outline-offset-2 outline)"
        href="/docs/overview/getting-started"
      >
        Get started
      </a>
      <a
        class="group flex items-center justify-center gap-2 whitespace-nowrap border border-muted rounded-lg bg-muted/50 px-5 py-2.5 text-foreground/70 font-semibold hover:bg-card hover:text-foreground focus-visible:(outline-2 outline-primary outline-offset-2 outline)"
        href="/docs/components/checkbox"
      >
        Explore components
        <Icon icon="lucide:arrow-right" />
      </a>
    </div>
  </div>
</template>

<style scoped></style>
