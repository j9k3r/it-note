import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const listNotes = ref([{id: 1, title: 'Test note'}])

  return { listNotes }
})
