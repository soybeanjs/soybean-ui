<template>
  <div class="h-full p-4">
    <SCard title="Home Layout" class="h-full">
      <template #extra>
        <ThemeSchemaToggler />
      </template>
      <RouterView />
    </SCard>
  </div>
</template>
