/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');

describe('Page view', () => {
  it('displays all notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('Walk the dog');
    model.addNote('Go shopping');
    model.addNote('Do the shopping');
    view.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(3);
  });
});