import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Note, NoteList } from "../interfaces";
import notesApi from "../services/notesApi";

// import { jsonNote, jsonNoteList } from '../components/note/MockNote'
export const useNotesStore = defineStore('notes', () => {
  const note = ref<Note>({
    content: []
  })

  const noteList = ref<NoteList>({
    itemsPerPage: 5,
    currentPage: 1,
    notes: []
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
    if (id !== note.value.content.length - 1) {
      const removedElement = note.value.content.splice(id, 1)[0]
      note.value.content.splice(id + 1, 0, removedElement)
    }
  }

  function updateCurrentPage(page: number) {
    noteList.value.currentPage = page;

    // const n = JSON.parse(jsonNote)
    // console.log(n)
  }
  function updateItemsPerPage(num: number) {
    noteList.value.itemsPerPage = num;
  }
  function initNoteById(noteId: string) {
    notesApi.getDbNoteById(noteId).then((result) => {
      if (result === null) throw Error('Note not found')
      note.value = result
    })
  }

  function initAllNotes() {
    notesApi.getDbAllNotes().then((result) => {
      noteList.value.notes = result
    })
  }

  function createNote() {
    notesApi.saveDbNote(note)
  }

  function updatedNote(id: string) {
    notesApi.updatedDbNote(id, note)
  }

  async function deleteNote(id: string) {
    const index = noteList.value.notes.findIndex(item => item._id === id)
    notesApi.deleteDbNote(id).then((result) => {
      if (result === 0) throw Error('Note not found')
      if (result !== 0 && index !== -1) {
        noteList.value.notes.splice(index, 1)
      }
    })
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
    updateItemsPerPage,
    initNoteById,
    initAllNotes,
    createNote,
    updatedNote,
    deleteNote
  }
})
