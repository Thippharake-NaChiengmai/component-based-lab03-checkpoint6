import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PassengerDetailsView from '@/views/PassengerDetailsView.vue'
import AirlineDetailsView from '@/views/AirlineDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/passenger/:id',
      name: 'passenger-details',
      component: PassengerDetailsView,
    },
    {
      path: '/airline/:airlineId',
      name: 'airline-details',
      component: AirlineDetailsView,
    },
    {
      path: '/resource-not-found',
      name: 'resource-not-found',
      component: () => import('@/views/ResourceNotFoundView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
