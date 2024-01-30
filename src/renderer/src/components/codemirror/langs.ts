import { javascriptLanguage } from "@codemirror/lang-javascript";
import { htmlLanguage } from '@codemirror/lang-html';
import { cssLanguage } from "@codemirror/lang-css";
import { lessLanguage } from "@codemirror/lang-less";


export enum langList {
  javascript,
  html,
  css,
  less
}

export const langs = [
  {
    // ...javascript()
    ...javascriptLanguage
  },
  {
    ...htmlLanguage
  },
  {
    ...cssLanguage
  },
  {
    ...lessLanguage
  }

]

// export default langs
