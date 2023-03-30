/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

describe('Page view', () => {
  xit('displays all notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('Walk the dog');
    model.addNote('Go shopping');
    model.addNote('Do the laundry');
    view.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(3);
  });

  xit('displays input notes', () => {
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

  xit('clears previous notes', () => {
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
    const client = {loadNotes: jest.fn()};
    const view = new NotesView(model, client);

    client.loadNotes.mockImplementation((callback) => callback(["This note is coming from the server"]));
    
    view.displayNotesFromApi();

    const notes = document.querySelectorAll('.note')
    expect(model.getNotes()).toEqual(["This note is coming from the server"]);
    expect(notes.length).toBe(1);
  });

  it('creates notes in the api', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const client = {createNote: jest.fn(), loadNotes: jest.fn()};
    const view = new NotesView(model, client); 

    const buttonEl = document.querySelector('#note-button');
    const inputEl = document.querySelector('#message-input')
    inputEl.value;


    // fetch.mockResponseOnce(JSON.stringify([
    //   "This note is coming from the server",
    //   "Remember to reflect on my progress this week!"
    // ]));

    
    client.createNote.mockImplementation((data, callback) => callback(["This note is coming from the server222", data['content']]));

    client.loadNotes.mockImplementation((callback) => callback(["This note is coming from the server222","Walk the dog", "Go shopping"]));

    inputEl.value = "Walk the dog";
    buttonEl.click();
    inputEl.value = "Go shopping";
    buttonEl.click();
    

    const notes = document.querySelectorAll('.note')
    console.log(document.querySelector('.note').textContent)
    expect(notes.length).toBe(3);
    expect(model.getNotes()).toEqual(["This note is coming from the server222","Walk the dog", "Go shopping"]);
  });

});