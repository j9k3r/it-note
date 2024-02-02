import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { less } from "@codemirror/lang-less";



export enum langList {
  javascript,
  html,
  css,
  less
}

export const langs: { [key in langList]: { extension: any, name: string } }  = {
    [langList.javascript]: {
    extension: javascript(),
    name: langList[langList.javascript]
  },
   [langList.html]: {
    extension: html(),
    name: langList[langList.html]
  },
   [langList.css]: {
    extension: css(),
    name: langList[langList.css]
  },
   [langList.less]:{
    extension: less(),
    name: langList[langList.less]
  }
}

// export default langs
