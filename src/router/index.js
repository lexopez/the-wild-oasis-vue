import { createRouter, createWebHistory } from 'vue-router'

const DashboardPage = () => import('@/views/DashboardPage.vue')
const routes = [
  {
    path: '/',
    component: DashboardPage,
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
