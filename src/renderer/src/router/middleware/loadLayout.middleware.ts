import { RouteLocationNormalized } from "vue-router";
import { layoutToFileMap } from '@/layouts/layouts.functions'
import { resultFn } from '@/result.functions'
// import { ResultFn } from "../../interfaces";
// import { ResultFn } from "@/interfaces";
import { ResultType } from '@/main.types'

// export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<ReturnType<ResultFn>> {
export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<ResultType> {
  const layout = route.meta ? route.meta.layout : undefined

  let normalizedLayoutName: string | unknown
  layout === undefined ? (normalizedLayoutName = 'default') : (normalizedLayoutName = layout)

  if (typeof normalizedLayoutName === 'string') {
    const fileName = layoutToFileMap[normalizedLayoutName]
    const fileNameWithoutExtension = fileName.split('.vue')[0]
    const component = await import(`../../layouts/${fileNameWithoutExtension}.vue`)

    // route.meta!.layoutComponent = component.default // подавление ! если точно есть route.meta
    if (typeof route.meta === 'undefined') {
      // throw result.error
      return resultFn(false, new Error('route.meta: undefined'))
    }
    // throw new Error('route.meta: undefined')

    route.meta.layoutComponent = component.default
    return resultFn(true)
  } else {
    // const result: ResultFn = {
    //   result: false,
    //   error: new Error(`unknown type normalizedLayoutName: ${route.meta}`)
    // }
    // throw result.error
    // throw new Error(`unknown type normalizedLayoutName: ${route.meta}`)

    return resultFn(false, new Error(`unknown type normalizedLayoutName: ${route.meta}`))
  }
}
