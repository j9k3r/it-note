import { Note } from "../interfaces";
import { Ref } from 'vue'
import _ from 'lodash';
export default {
  saveDbNote(note: Ref<Note>) {
    const clonedData = _.cloneDeep(note.value)
    window.api.db.api.addNote(clonedData)
  },

  updatedDbNote(id: string, note: Ref<Note>) {
    const clonedData = _.cloneDeep(note.value)
    window.api.db.api.updateNoteById(id, clonedData)
  },

  async deleteDbNote(id: string) {
    try {
      const result = await window.api.db.api.deleteNoteById(id)
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async getDbNoteById(noteId: string) {
    try {
      const result = await window.api.db.api.getNoteById(noteId)
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async getDbAllNotes() {
    try {
      const result = await window.api.db.api.getAllNotes()
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
