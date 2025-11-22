<script setup lang="ts"></script>

<template>
  <div class="[--app-header:3.75rem] h-full pt-[calc(var(--app-header)+1rem)] text-sm">
    <AppHeader />
    <div class="fixed top-[--app-header] left-0 w-50 h-[calc(100vh-var(--app-header))]">
      <SiderMenu />
    </div>
    <RouterView />
  </div>
</template>
