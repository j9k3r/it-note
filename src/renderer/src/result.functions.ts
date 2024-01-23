import { ResultFn } from '@/interfaces'

export const resultFn: ResultFn = (result, error, data) => {
  return { result, error, data }
}


// export class ErrorFunctions implements ResultFunction {
//   constructor(public result: boolean, public error?: Error) { }
//
//   getFunctionError(): { result: boolean, error?: Error } {
//     return { result: this.result, error: this.error }
//   }
// }
