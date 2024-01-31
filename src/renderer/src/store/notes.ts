import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const note = ref({
    id: 1,
    title: 'Заголовок',
    description: 'Описание',
    content: [
      {
        type: 'codemirror',
        option: {
          lang: 'javascript',
          theme: 'dracula'
        },
        text: "const code1 = `function myFunction() {\n console.log('Hello, World!');\n + }`;"
      },
      {
        type: 'textWrapp',
        text: 'какой то текст строка1\n строка 2\n строка3',
        option: {
          lang: '',
          theme: ''
        }
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
      }
    ]
  })

  function updateDoc(state: string, id: number) {
    note.value.content[id].text = state
  }

  function updateTheme(state: string, id: number) {
    note.value.content[id].option.theme = state
  }

  function updateLang(state: string, id: number) {
    note.value.content[id].option.lang = state
  }

  function addElement(id: number, type: string = 'textWrapp') {

    let codeMirrorExample = {
      type: 'textWrapp',
      option: {
        lang: '',
        theme: ''
      },
      text: ''
    }

    if (type === 'codemirror') {
      codeMirrorExample = {
        type: 'codemirror',
        option: {
          lang: 'javascript',
          theme: 'dracula'
        },
        text: ''
      }
    }
    note.value.content.splice(id !== 0 ? id + 1 : 0, 0, codeMirrorExample)
  }

  function removeElement(id: number) {
    note.value.content.splice(id, 1)
  }

  function elementUp(id: number) {
    if (id !== 0) {
      const removedElement = note.value.content.splice(id, 1)[0]
      note.value.content.splice(id - 1, 0, removedElement)
    }
  }
  function elementDown(id: number) {
    // console.log('id ',id)
    // console.log('arr len ',note.value.content.length)
    if (id !== note.value.content.length - 1) {
      const removedElement = note.value.content.splice(id, 1)[0]
      note.value.content.splice(id + 1, 0, removedElement)
    }
    // else {
    //   console.log('last element')
    // }
  }

  return {
    note,
    updateDoc,
    updateLang,
    updateTheme,
    addElement,
    removeElement,
    elementUp,
    elementDown
  }
})
