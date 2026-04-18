<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { Package, PlusCircle, BarChart3 } from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { to: '/', label: 'Produtos', icon: Package },
  { to: '/create', label: 'Novo Produto', icon: PlusCircle },
]
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BarChart3 class="h-5 w-5 text-primary-foreground" />
            </div>
            <span class="text-lg font-semibold text-foreground">StockFlow</span>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center gap-1">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              :class="[
                route.path === item.to
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              ]"
            >
              <component :is="item.icon" class="h-4 w-4" />
              <span class="hidden sm:inline">{{ item.label }}</span>
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
