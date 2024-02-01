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
    notes.insert(postData)
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
