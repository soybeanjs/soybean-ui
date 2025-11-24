<script setup lang="ts"></script>

<template>
  <div class="[--app-header:3.75rem] h-full pt-[calc(var(--app-header)+1rem)] text-sm">
    <AppHeader />
    <div class="max-w-[1440px] mx-auto flex h-full px-6">
      <aside
        class="sticky top-[calc(var(--app-header)+1rem)] w-50 h-[calc(100vh-var(--app-header)-2rem)] overflow-y-auto hidden md:block shrink-0"
      >
        <SiderMenu />
      </aside>
      <main class="flex-1 min-w-0 pl-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
