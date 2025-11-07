<script setup lang="ts">
import { SAvatar, SCard } from '@ui';
</script>

<template>
  <SCard title="Avatar" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Basic Avatar with Image">
      <SAvatar
        :image-props="{
          src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }"
        fallback-label="JD"
      />
    </SCard>
    <SCard title="Avatar with Broken Image (Shows Fallback)">
      <SAvatar
        :image-props="{
          src: 'https://broken-image-url.jpg'
        }"
        fallback-label="BR"
      />
    </SCard>
    <SCard title="Avatar with Delayed Fallback">
      <SAvatar
        :image-props="{
          src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }"
        fallback-label="DL"
      />
    </SCard>
    <SCard title="Different Sizes">
      <SAvatar
        size="sm"
        :image-props="{
          src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }"
        fallback-label="JD"
      />
      <SAvatar
        size="md"
        :image-props="{
          src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }"
        fallback-label="JD"
      />
    </SCard>
  </SCard>
</template>
