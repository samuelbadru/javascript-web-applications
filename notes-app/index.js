const NotesModel = require('./notesModel');
const NotesView = require('./notesView')

const model = new NotesModel();
const view = new NotesView(model);

model.addNote('This is an example note');
view.displayNotes();

console.log('The notes app is running');
console.log(model.getNotes());