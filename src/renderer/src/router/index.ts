import { createRouter, createWebHashHistory } from 'vue-router'
import Electron from '@/components/test/Electron.vue'
import Test from '@/components/test/Test.vue'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'

import { ResultHtmlType, ResultType } from '@/main.types'
import { resultErrorToJson, saveErrorsToMeta } from '@/result.functions'

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

// router.beforeEach(async () => {
//   sessionStorage.removeItem('Errors')
// })

//router.beforeEach(async (to, from, next) => { // для ошибки навигации
router.beforeEach(async (to) => {
  // const err: ResultHtmlType[] = []
  const err: ResultType[] = []

  // sessionStorage.removeItem('Errors')
  try {
    const result = await loadLayoutMiddleware(to)

    router.onError((error) => {
      // err.push(resultErrorToJson({ result: false, error: error }))
      err.push({ result: false, error: error })

      //добавляем ошибки навигации
      // saveErrorsToMeta(resultErrorToJson({ result: false, error: error }), to)
      saveErrorsToMeta({ result: false, error: error }, to)
      console.log(`router.onError =  ${error.message}  `)
    })

    if (result.result) {
      // Продолжаем навигацию
    } else {
      const error = result.error || 'An error occurred'
      console.error('no catch - An error occurred while processing the route:', error)
      // err.push(resultErrorToJson(result))
      err.push(result)

      //добавляем новую ошибку
      // saveErrorsToMeta(resultErrorToJson(result), to)
      saveErrorsToMeta(result, to)
      // throw new Error('ssss') // для ошибки катч
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const cstrErr: Error = new Error(error.message)
      cstrErr.stack = error.stack

      // err.push(resultErrorToJson({ result: false, error: cstrErr }))
      err.push({ result: false, error: cstrErr })

      // saveErrorsToMeta(resultErrorToJson({ result: false, error: cstrErr }), to)
      saveErrorsToMeta({ result: false, error: cstrErr }, to)

      console.error('Critical error the route:', error)
      // throw error
    } else {
      console.error('Error is not an instance of Error:', error)
    }
  }

  if (to.meta.errors && to.meta.errors instanceof Array)
    if (err.length !== to.meta.errors.length)
      console.log(new Error('The mismatch between the number of meta.error and the errors call'))
})

export default router
