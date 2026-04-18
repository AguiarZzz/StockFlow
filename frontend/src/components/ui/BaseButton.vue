<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :disabled="disabled || loading"
    @click="emit('click')"
    class="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="[
      // Variants
      variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      variant === 'ghost' && 'hover:bg-secondary text-foreground',
      (!variant || variant === 'primary') && 'bg-primary text-primary-foreground hover:bg-primary/90',
      // Sizes
      size === 'sm' && 'h-8 px-3 text-xs',
      size === 'lg' && 'h-12 px-6 text-base',
      (!size || size === 'md') && 'h-10 px-4 text-sm',
    ]"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>
