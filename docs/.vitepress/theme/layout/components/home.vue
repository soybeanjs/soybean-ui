<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { SButtonLink } from 'soy-ui';

defineOptions({
  name: 'Home'
});
</script>

<template>
  <div class="grid justify-items-center gap-8 p-5 px-3 md:gap-10 md:px-8 sm:px-4">
    <div class="grid mt-6 max-w-4xl w-full justify-items-center gap-[inherit] md:mt-20 sm:mt-10">
      <h1 class="text-center text-4xl text-foreground font-bold md:text-7xl sm:text-6xl sm:font-extrabold">
        An elegant and accessible UI library like shadcn for Vue3
      </h1>
      <p
        class="max-w-[720px] text-center text-pretty text-lg text-muted-foreground lg:text-2xl md:text-xl lg:leading-9 md:leading-8"
      >
        An open-source library based on
        <SButtonLink href="/primitive/index.html" target="_self" class="link">soybean-primitive</SButtonLink>
        and
        <SButtonLink href="https://unocss.dev" class="link">UnoCSS</SButtonLink>
        , like
        <SButtonLink href="https://ui.shadcn.com/" class="link">shadcn</SButtonLink>
        for Vue3, accompanied by a variety of
        <SButtonLink href="/examples/checkbox-group.html" target="_self" class="link">examples & use cases</SButtonLink>
        ready to be integrated into your projects.
      </p>
    </div>
    <div class="mb-12 max-w-[calc(100%-2rem)] flex flex-wrap items-center justify-center gap-4 md:mb-20">
      <SButtonLink variant="solid" size="xl" href="/docs/overview/getting-started.html" target="_self">
        Get started
      </SButtonLink>
      <SButtonLink variant="pure" size="xl" href="/docs/components/button.html" target="_self">
        Explore components
        <Icon icon="lucide:arrow-right" />
      </SButtonLink>
    </div>
  </div>
</template>

<style scoped>
.link {
  @apply p-0 text-foreground lg:text-2xl md:text-xl lg:leading-9 md:leading-8;
}
</style>
