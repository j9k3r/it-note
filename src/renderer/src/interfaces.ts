import { ResultType } from "@/main.types";

export interface LayoutToFileMap {
  [key: string]: string
}

// export interface ResultFn {
//   result: boolean
//   error?: Error
// }

// export interface ResultFn {
//   (result: boolean, error?: Error, data?: object): { result: boolean, error?: Error, data?: object }
// }

export interface ResultFn {
  (result: boolean, error?: Error, data?: object): ResultType
}
