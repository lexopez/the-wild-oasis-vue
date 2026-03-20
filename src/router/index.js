import AccountPage from '@/views/AccountPage.vue'
import BookingPage from '@/views/BookingPage.vue'
import BookingsPage from '@/views/BookingsPage.vue'
import CabinsPage from '@/views/CabinsPage.vue'
import CheckinPage from '@/views/CheckinPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import SettingsPage from '@/views/SettingsPage.vue'
import UsersPage from '@/views/UsersPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const DashboardPage = () => import('@/views/DashboardPage.vue')
const AppLayout = () => import('@/layout/AppLayout.vue')
const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        component: DashboardPage,
      },
      {
        path: '/bookings',
        component: BookingsPage,
      },
      {
        path: '/bookings/:bookingId',
        component: BookingPage,
      },
      {
        path: '/checkin/:bookingId',
        component: CheckinPage,
      },
      {
        path: '/cabins',
        component: CabinsPage,
      },
      {
        path: '/users',
        component: UsersPage,
      },
      {
        path: '/settings',
        component: SettingsPage,
      },
      {
        path: '/account',
        component: AccountPage,
      },
    ],
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
