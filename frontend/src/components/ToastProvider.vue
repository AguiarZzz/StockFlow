<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info
}

const colors = {
  success: 'bg-success text-success-foreground',
  error: 'bg-destructive text-destructive-foreground',
  info: 'bg-primary text-primary-foreground'
}
</script>

<template>
  <slot />
  
  <!-- Toast Container -->
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg min-w-[280px] max-w-[400px]',
            colors[toast.type]
          ]"
        >
          <component :is="icons[toast.type]" class="h-5 w-5 shrink-0" />
          <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>
          <button
            @click="removeToast(toast.id)"
            class="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
