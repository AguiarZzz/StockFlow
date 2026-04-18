<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import ToastProvider from '@/components/ToastProvider.vue'
</script>

<template>
  <ToastProvider>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </ToastProvider>
</template>
