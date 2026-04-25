import { ref, computed } from "vue";
import {
  getProducts,
  createProduct as createProductApi,
  stockIn,
  stockOut,
} from "@/services/api";
import type {
  Product,
  SortField,
  SortDirection,
  CreateProductPayload,
  CreateStockMovementPayload,
} from "@/types";

const products = ref<Product[]>([]);
const isLoading = ref(false);
const sortField = ref<SortField>("name");
const sortDirection = ref<SortDirection>("asc");
const searchQuery = ref("");

export function useProducts() {
  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      if (sortField.value === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField.value === "stock") {
        comparison = a.stock - b.stock;
      } else if (sortField.value === "price") {
        comparison = a.price - b.price;
      }

      return sortDirection.value === "asc" ? comparison : -comparison;
    });

    return result;
  });

  const fetchProducts = async () => {
    isLoading.value = true;
    try {
      products.value = await getProducts();
    } finally {
      isLoading.value = false;
    }
  };

  const createProduct = async (payload: CreateProductPayload) => {
    await createProductApi(payload);
    await fetchProducts();
  };

  const createStockMovement = async (data: CreateStockMovementPayload) => {
    if (data.type === "IN") {
      await stockIn(data.productId, data.quantity);
    } else {
      await stockOut(data.productId, data.quantity);
    }
    await fetchProducts();
  };

  const setSort = (field: SortField) => {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortField.value = field;
      sortDirection.value = "asc";
    }
  };

  const setSearch = (query: string) => {
    searchQuery.value = query;
  };

  return {
    products: filteredProducts,
    isLoading,
    sortField,
    sortDirection,
    searchQuery,
    fetchProducts,
    createProduct,
    createStockMovement,
    setSort,
    setSearch,
  };
}
