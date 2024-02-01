const Datastore = require('nedb');
const db = new Datastore({ filename: 'db/test', autoload: true });

function readFromDb() {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

function saveFromDb() {
  return new Promise(() => {
    db.insert({name : "Boris the Blade", year: 1946})
  });
}

function removeFromDb(id) {
  return new Promise(() => {
    db.remove({_id: id})
  });
}

export { readFromDb, saveFromDb, removeFromDb }
