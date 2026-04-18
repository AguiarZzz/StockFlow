import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import CreateProduct from '@/views/CreateProduct.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductList
    },
    {
      path: '/create',
      name: 'create-product',
      component: CreateProduct
    }
  ]
})

export default router
