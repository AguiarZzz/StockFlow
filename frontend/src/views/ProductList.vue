<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search, Package, TrendingUp, AlertTriangle } from 'lucide-vue-next'
import { useProducts } from '@/composables/useProducts'
import { useToast } from '@/composables/useToast'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ProductTable from '@/components/ProductTable.vue'
import StockMovementModal from '@/components/StockMovementModal.vue'
import type { Product, CreateStockMovementPayload, SortField } from '@/types'

const {
  products,
  isLoading,
  sortField,
  sortDirection,
  searchQuery,
  fetchProducts,
  createStockMovement,
  setSort,
  setSearch
} = useProducts()

const { success, error } = useToast()

// Modal state
const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

onMounted(() => {
  fetchProducts()
})

const handleSort = (field: SortField) => {
  setSort(field)
}

const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement
  setSearch(target.value)
}

const openStockModal = (product: Product, type: 'IN' | 'OUT') => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const handleStockMovement = async (payload: CreateStockMovementPayload) => {
  try {
    await createStockMovement(payload)
    isModalOpen.value = false
    success(payload.type === 'IN' 
      ? 'Estoque adicionado com sucesso!' 
      : 'Estoque removido com sucesso!'
    )
  } catch (err) {
    error(err instanceof Error ? err.message : 'Erro ao movimentar estoque')
  }
}

// Stats
const totalProducts = () => products.value.length
const totalStock = () => products.value.reduce((acc, p) => acc + p.stock, 0)
const lowStockCount = () => products.value.filter(p => p.stock <= 5).length
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground">Produtos</h1>
      <p class="mt-1 text-muted-foreground">Gerencie seu inventário de produtos</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 sm:grid-cols-3">
      <BaseCard>
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Package class="h-6 w-6 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Total de Produtos</p>
            <p class="text-2xl font-bold text-foreground">{{ totalProducts() }}</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <TrendingUp class="h-6 w-6 text-success" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Estoque Total</p>
            <p class="text-2xl font-bold text-foreground">{{ totalStock() }}</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
            <AlertTriangle class="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Estoque Baixo</p>
            <p class="text-2xl font-bold text-foreground">{{ lowStockCount() }}</p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Search & Table -->
    <BaseCard :padding="false">
      <div class="border-b border-border p-4">
        <div class="relative max-w-sm">
          <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            :value="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Buscar produtos..."
            class="flex h-10 w-full rounded-lg border border-input bg-card pl-10 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      <LoadingSpinner v-if="isLoading" />
      
      <ProductTable
        v-else
        :products="products"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @sort="handleSort"
        @stock-movement="openStockModal"
      />
    </BaseCard>

    <!-- Stock Movement Modal -->
    <StockMovementModal
      :open="isModalOpen"
      :product="selectedProduct"
      @close="isModalOpen = false"
      @submit="handleStockMovement"
    />
  </div>
</template>
