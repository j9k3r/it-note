// import console from 'console';
// import { log } from "node:util";
// console.log(process.env.NODE_ENV);

const { app } = require('electron')

const Datastore = require('nedb-promises')
const dbFactory = (fileName) => Datastore.create({
  filename: `${process.env.NODE_ENV === 'development' ? `./db/${fileName}` :
    app.getAppPath('userData')}/data/${fileName}`,
  timestampData: true,
  autoload: true
});

// const tags = dbFactory('tags.db')
const notes = dbFactory('notes.db')

const api = {
  addNote: async (postData) => {
    // const x = JSON.stringify(postData)
    // const z = JSON.parse(x)
    // console.log(z)
    const insertNote = await notes.insert(postData)
    return insertNote
  },
  updateNoteById: async (id, newData) => {
    // Поиск записи по _id и обновление данных
    const updatedNote = await notes.updateOne({ _id: id }, newData , false);
    return updatedNote;
  },

  deleteNoteById: async (id) => {
    const deletedNote = await notes.removeOne({ _id: id }, false);
    return deletedNote;
  },
  getNoteById: async (id) => {
    const note = await notes.findOne({ _id: id })
    return note
  },
  getAllNotes: async () => {
    const allNotes = await notes.find({});
    return allNotes;
  }
}
export default {
  api
};
