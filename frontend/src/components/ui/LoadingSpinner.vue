<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div class="flex flex-col items-center gap-3">
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
      <p class="text-sm text-muted-foreground">Carregando...</p>
    </div>
  </div>
</template>
