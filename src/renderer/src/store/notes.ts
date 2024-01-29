import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const listNotes = ref([
    [
    {type: 'codemirror',
      option: {
        tabSize: 4,
        mode: 'text/javascript',
        lineNumbers: true,
        line: true,
        theme: 'rubyblue'
      }, text: 'сырой текст1'},
    ]
])

  return { listNotes }
})
