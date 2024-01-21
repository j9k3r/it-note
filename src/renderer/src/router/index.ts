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

router.beforeEach(loadLayoutMiddleware)
export default router
