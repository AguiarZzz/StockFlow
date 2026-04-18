<script setup lang="ts">
import { ArrowUpDown, ArrowUp, ArrowDown, PackagePlus, PackageMinus } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Product, SortField, SortDirection } from '@/types'

defineProps<{
  products: Product[]
  sortField: SortField
  sortDirection: SortDirection
}>()

const emit = defineEmits(['sort', 'stockMovement'])

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const getStockColor = (stock: number) => {
  if (stock === 0) return 'text-destructive'
  if (stock <= 5) return 'text-amber-600'
  return 'text-success'
}

const getStockBg = (stock: number) => {
  if (stock === 0) return 'bg-destructive/10'
  if (stock <= 5) return 'bg-amber-100'
  return 'bg-success/10'
}
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-border">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-secondary">
          <tr>
            <th class="px-4 py-3 text-left">
              <button
                @click="emit('sort', 'name')"
                class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                Nome
                <component 
                  :is="sortField === 'name' ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown" 
                  class="h-3.5 w-3.5"
                  :class="{ 'text-primary': sortField === 'name' }"
                />
              </button>
            </th>
            <th class="px-4 py-3 text-left">
              <button
                @click="emit('sort', 'price')"
                class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                Preço
                <component 
                  :is="sortField === 'price' ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown" 
                  class="h-3.5 w-3.5"
                  :class="{ 'text-primary': sortField === 'price' }"
                />
              </button>
            </th>
            <th class="px-4 py-3 text-left">
              <button
                @click="emit('sort', 'stock')"
                class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                Estoque
                <component 
                  :is="sortField === 'stock' ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown" 
                  class="h-3.5 w-3.5"
                  :class="{ 'text-primary': sortField === 'stock' }"
                />
              </button>
            </th>
            <th class="px-4 py-3 text-right">
              <span class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Ações
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border bg-card">
          <tr 
            v-for="product in products" 
            :key="product.id"
            class="transition-colors hover:bg-secondary/50"
          >
            <td class="px-4 py-3">
              <span class="font-medium text-foreground">{{ product.name }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-foreground">{{ formatPrice(product.price) }}</span>
            </td>
            <td class="px-4 py-3">
              <span 
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="[getStockColor(product.stock), getStockBg(product.stock)]"
              >
                {{ product.stock }} un.
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center justify-end gap-1">
                <BaseButton
                  variant="ghost"
                  size="sm"
                  @click="emit('stockMovement', product, 'IN')"
                  title="Adicionar estoque"
                >
                  <PackagePlus class="h-4 w-4 text-success" />
                </BaseButton>
                <BaseButton
                  variant="ghost"
                  size="sm"
                  @click="emit('stockMovement', product, 'OUT')"
                  :disabled="product.stock === 0"
                  title="Remover estoque"
                >
                  <PackageMinus class="h-4 w-4 text-destructive" />
                </BaseButton>
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="4" class="px-4 py-12 text-center">
              <p class="text-muted-foreground">Nenhum produto encontrado</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
