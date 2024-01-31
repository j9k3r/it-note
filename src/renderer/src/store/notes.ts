import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Note {
  id?: number;
  title?: string;
  description?: string;
  tags?: string[];
  content: {text?: string, type?: string, option: { theme?:string, lang?: string}}[]
}

export const useNotesStore = defineStore('notes', () => {
  const note = ref<Note>({
    id: 1,
    title: 'Заголовок',
    description: 'Описание',
    tags: ['#js', '#php', '#css'],
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

  const noteList = ref({
    currentPage: 1,
    itemsPerPage: 2,
    notes: <Note[]>[
    {
    id: 1,
    title: 'Заголовок 1',
    description: 'Описание 1',
    tags: ['#js', '#php', '#css'],
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
  },
    {
      id: 2,
      title: 'Заголовок 2',
      description: 'Описание 2',
      tags: ['#js', '#php', '#css'],
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
    },
    {
      id: 3,
      title: 'Заголовок 3',
      description: 'Описание 3',
      tags: ['#js', '#php', '#css'],
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
    },
    {
      id: 4,
      title: 'Заголовок 4',
      description: 'Описание 4',
      tags: ['#js', '#php', '#css'],
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
    }
  ]})


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

    let codeMirrorExample = { //Todo сделать тип?
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

  function updateCurrentPage(page) {
    noteList.value.currentPage = page;
  }
  function updateItemsPerPage(num) {
    noteList.value.itemsPerPage = num;
  }


  return {
    note,
    noteList,
    updateDoc,
    updateLang,
    updateTheme,
    addElement,
    removeElement,
    elementUp,
    elementDown,
    updateCurrentPage,
    updateItemsPerPage
  }
})
