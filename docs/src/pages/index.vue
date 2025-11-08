<script setup lang="ts"></script>

<template>
  <SDialog title="Dialog Title" description="Dialog Description">
    <template #trigger>
      <SButton>Open Dialog</SButton>
    </template>
    <div>Dialog Content</div>
  </SDialog>
  <SButtonLink to="/home">To Home</SButtonLink>
  <SButtonLink to="/about">To About</SButtonLink>
  <SButtonLink to="/aaaa">To 404</SButtonLink>
</template>
