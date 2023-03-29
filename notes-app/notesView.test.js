/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

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
    
    const notes = document.querySelectorAll('.note');
    expect(notes.length).toBe(3);
  });

  it('clears previous notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    view.displayNotes();

    const buttonEl = document.querySelector('#note-button');
    const inputEl = document.querySelector('#message-input')

    inputEl.value = 'Walk the dog';
    buttonEl.click();
    inputEl.value = 'Go shopping';
    buttonEl.click();

    const notes = document.querySelectorAll('.note');
    expect(notes.length).toBe(2);
  });

  it('displays notes from api', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);
     
    fetch.mockResponseOnce(JSON.stringify([
      "This note is coming from the server"
    ]));
    
    view.displayNotesFromApi();

    setTimeout(() => {
      const notes = document.querySelectorAll('.note')
      expect(notes.length).toBe(1);
    }, 500);
    
  });
});