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
    model.addNote('Do the laundry');
    view.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(3);
  });

  it('displays input notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    view.displayNotes();

    const buttonEl = document.querySelector('#note-button');
    const inputEl = document.querySelector('#message-input');
    
    inputEl.value = 'Walk the dog';
    buttonEl.click();
    inputEl.value = 'Go shopping';
    buttonEl.click();
    inputEl.value = 'Do the laundry';
    buttonEl.click();

    
    const message = document.querySelectorAll('.note');

    expect(message.length).toBe(6);
  })
});