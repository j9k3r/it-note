import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const listNotes = ref([
    {
      type: 'codemirror',
      option: {
        lang: 'javascript',
        theme: 'dracula'
      },
      text: 'const code1 = `function myFunction() {\n console.log(\'Hello, World!\');\n + }`;'
    },
    {
      type: 'codemirror',
      option: {
        lang: 'html',
        theme: 'amy'
      },
      text: '<div><h1>Hello world</h1></div>'
    },
    {
      type: 'codemirror',
      option: {
        lang: 'css',
        theme: 'ayuLight'
      },
      text:
        '#errState {\n' +
        '  display: flex;\n' +
        '  justify-content: right;\n' +
        '  span {\n' +
        '    padding: 5px;\n' +
        '  }\n' +
        '}'
    },
])

  function updateDoc(state, id) {
    listNotes.value[id].text = state
  }

  function updateTheme(state, id) {
    listNotes.value[id].option.theme = state
  }

  function updateLang(state, id) {
    listNotes.value[id].option.lang = state
  }

  return { listNotes, updateDoc, updateLang, updateTheme }
})
