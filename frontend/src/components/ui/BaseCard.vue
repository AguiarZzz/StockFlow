<script setup lang="ts">
defineProps<{
  padding?: boolean
}>()
</script>

<template>
  <div 
    class="rounded-xl border border-border bg-card shadow-sm"
    :class="{ 'p-6': padding !== false }"
  >
    <slot />
  </div>
</template>
