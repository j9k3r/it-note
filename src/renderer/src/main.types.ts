export type ResultType = {
  result: boolean
  error?: Error
  data?: object
}

export type HtmlResultType = ResultType & {
  errorMsgStr: string
  errorStackStr: string
}
