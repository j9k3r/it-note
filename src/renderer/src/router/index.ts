import { createRouter, createWebHashHistory } from 'vue-router'
import Electron from '@/components/Electron.vue'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'

import Test from '@/components/Test.vue'
import { HtmlResultType, ResultType } from "../main.types";

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
  const err: HtmlResultType[] = []
  sessionStorage.removeItem('Errors')

  try {
    const result = await loadLayoutMiddleware(to)

    router.onError((error) => {
      err.push(resultErrorToJson({ result: false, error: error }))

      //добавляем ошибки навигации
      saveErrorsSession(err)
      console.log(`router.onError =  ${error.message}  `)
      // return {path: to.path}
    })

    if (result.result) {
      // Продолжаем навигацию
    } else {
      const error = result.error || 'An error occurred'
      console.error('no catch - An error occurred while processing the route:', error)
      err.push(resultErrorToJson(result))

      //добавляем новую ошибку
      saveErrorsSession(err)
      // throw new Error('ssss') // для ошибки катч
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const cstrErr: Error = new Error(error.message)
      cstrErr.stack = error.stack
      err.push(resultErrorToJson({ result: false, error: cstrErr }))
      saveErrorsSession(err)

      console.error('critical error the route:', error)
      // throw error
    } else {
      console.error('Error is not an instance of Error:', error);
    }
  }
})

function resultErrorToJson(result: ResultType): HtmlResultType {
  const resultJson: HtmlResultType = { ...result, errorMsgStr: '', errorStackStr: '' }
  resultJson.error = undefined
  resultJson.errorMsgStr = result.error!.message!
  resultJson.errorStackStr = result.error!.stack!
  return resultJson
}

function saveErrorsSession(err) {
  const existingErrors = sessionStorage.getItem('Errors');
  const allErrors = existingErrors ? JSON.parse(existingErrors).concat(err) : err
  sessionStorage.setItem('Errors', JSON.stringify(allErrors))
}

export default router
