<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from '../../../src/components/avatar';
import SectionWrapper from '../components/section-wrapper.vue';

function onLoadingStatusChange(status: string) {
  console.log('Avatar loading status:', status);
}
</script>

<template>
  <SectionWrapper title="Avatar">
    <div class="space-y-6">
      <section>
        <h2 class="text-lg font-semibold mb-4">Basic Avatar with Image</h2>
        <AvatarRoot class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            class="h-full w-full object-cover"
            @loading-status-change="onLoadingStatusChange"
          />
          <AvatarFallback class="flex h-full w-full items-center justify-center bg-gray-300 text-gray-700 font-medium">
            JD
          </AvatarFallback>
        </AvatarRoot>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4">Avatar with Broken Image (Shows Fallback)</h2>
        <AvatarRoot class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          <AvatarImage
            src="https://broken-image-url.jpg"
            class="h-full w-full object-cover"
            @loading-status-change="onLoadingStatusChange"
          />
          <AvatarFallback class="flex h-full w-full items-center justify-center bg-red-200 text-red-700 font-medium">
            BR
          </AvatarFallback>
        </AvatarRoot>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4">Avatar with Delayed Fallback</h2>
        <AvatarRoot class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          <AvatarImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            class="h-full w-full object-cover"
            @loading-status-change="onLoadingStatusChange"
          />
          <AvatarFallback
            :delay-ms="1000"
            class="flex h-full w-full items-center justify-center bg-blue-200 text-blue-700 font-medium"
          >
            DL
          </AvatarFallback>
        </AvatarRoot>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4">Different Sizes</h2>
        <div class="flex items-center space-x-4">
          <!-- Small -->
          <AvatarRoot class="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <AvatarImage
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face"
              class="h-full w-full object-cover"
            />
            <AvatarFallback
              class="flex h-full w-full items-center justify-center bg-green-200 text-green-700 text-xs font-medium"
            >
              S
            </AvatarFallback>
          </AvatarRoot>

          <!-- Medium -->
          <AvatarRoot
            class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100"
          >
            <AvatarImage
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
              class="h-full w-full object-cover"
            />
            <AvatarFallback
              class="flex h-full w-full items-center justify-center bg-purple-200 text-purple-700 font-medium"
            >
              M
            </AvatarFallback>
          </AvatarRoot>

          <!-- Large -->
          <AvatarRoot
            class="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100"
          >
            <AvatarImage
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
              class="h-full w-full object-cover"
            />
            <AvatarFallback
              class="flex h-full w-full items-center justify-center bg-orange-200 text-orange-700 text-lg font-medium"
            >
              L
            </AvatarFallback>
          </AvatarRoot>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4">Custom Shapes</h2>
        <div class="flex items-center space-x-4">
          <!-- Square -->
          <AvatarRoot class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              class="h-full w-full object-cover"
            />
            <AvatarFallback
              class="flex h-full w-full items-center justify-center bg-indigo-200 text-indigo-700 font-medium"
            >
              SQ
            </AvatarFallback>
          </AvatarRoot>

          <!-- Rounded -->
          <AvatarRoot class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-100">
            <AvatarImage
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              class="h-full w-full object-cover"
            />
            <AvatarFallback
              class="flex h-full w-full items-center justify-center bg-pink-200 text-pink-700 font-medium"
            >
              RD
            </AvatarFallback>
          </AvatarRoot>
        </div>
      </section>
    </div>
  </SectionWrapper>
</template>
