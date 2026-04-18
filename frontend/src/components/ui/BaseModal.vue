<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          @click="emit('close')"
        />

        <!-- Modal Content -->
        <div class="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
          <!-- Header -->
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-foreground">{{ title }}</h2>
            <button
              @click="emit('close')"
              class="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Content -->
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
