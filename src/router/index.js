import { getCurrentUser } from '@/services/apiAuth'
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
    meta: { requiresAuth: true },
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

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    try {
      const user = await getCurrentUser()

      // If there's no user, return the redirect path
      if (!user) {
        return {
          path: '/login',
          // Optional: store the location the user was trying to go to
          query: { redirect: to.fullPath },
        }
      }

      // If user exists, we don't need to return anything
      // (returning undefined or true allows the navigation)
    } catch (err) {
      console.error('Auth Guard Error:', err)
      return '/login'
    }
  }

  // For public routes, navigation proceeds automatically
})

export default router
