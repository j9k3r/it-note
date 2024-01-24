import { ResultType } from '@/main.types'

export interface LayoutToFileMap {
  [key: string]: string
}
export interface ResultFn {
  (result: boolean, error?: Error, data?: object): ResultType
}
