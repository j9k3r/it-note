// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Electron from '@/components/Electron.vue'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'

import Test from '@/components/Test.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Electron
    },
    {
      path: '/test/:test',
      name: 'test',
      component: Test
    },
  ]
})
router.beforeEach(async (to, from, next) => {
  try {
    const result = await loadLayoutMiddleware(to)
    if (result.result) {
      next()
    } else {
      next(new Error(result.error?.message || 'An error occurred'))
    }
  } catch (error) {
    console.error('An error occurred while processing the route:', error)
    // next(error) // перенаправление с сообщением об ошибке
  }
})
export default router
