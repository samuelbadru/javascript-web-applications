const NotesModel = require('./notesModel');
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')

const model = new NotesModel();
const client = new NotesClient();
const view = new NotesView(model, client);

view.displayNotesFromApi();
