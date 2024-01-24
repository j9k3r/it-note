import { ResultFn } from '@/interfaces'

export const resultFn: ResultFn = (result, error, data) => {
  return { result, error, data }
}
