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
    expect(notes[0].textContent).toBe("This note is coming from the server")
    expect(notes.length).toBe(1);
  });

  it('creates notes in the api', () => {
    // Arrange
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const client = {createNote: jest.fn(), loadNotes: jest.fn()};
    const view = new NotesView(model, client); 

    // Action
    const buttonEl = document.querySelector('#note-button');
    const inputEl = document.querySelector('#message-input');
    
    client.createNote.mockImplementation((data, callback) => callback(["This note is coming from the server222", data['content']]));
    client.loadNotes.mockImplementation((callback) => callback(["This note is coming from the server222","Walk the dog", "Go shopping"]));

    inputEl.value = "Walk the dog";
    buttonEl.click();
    inputEl.value = "Go shopping";
    buttonEl.click();

    // Assert
    const notes = document.querySelectorAll('.note')
    expect(notes.length).toBe(3);
    expect(notes[0].textContent).toBe("This note is coming from the server222");
    expect(notes[1].textContent).toBe("Walk the dog");
    expect(notes[2].textContent).toBe("Go shopping");
  });

  it('catches errors in loading notes', () => {
    // Arrange
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const client = {loadNotes: jest.fn()};
    const view = new NotesView(model, client); 

    // Action
    client.loadNotes.mockImplementation((callback, callbackErr) => callbackErr(new Error("Server is not running")));
    view.displayNotesFromApi();
    // Assert
    const notes = document.querySelectorAll('.note')
    expect(notes.length).toBe(1);
    expect(notes[0].textContent).toBe("Oops, something went wrong!")
  });

  it('catches errors in creating notes', () => {
    // Arrange
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const client = {createNote: jest.fn(), loadNotes: jest.fn()};
    const view = new NotesView(model, client); 

    // Action
    const buttonEl = document.querySelector('#note-button');
    const inputEl = document.querySelector('#message-input');

    client.createNote.mockImplementation((data, callback, callbackErr) => callbackErr(new Error("Server is not running, cannot create note")));
    client.loadNotes.mockImplementation((callback, callbackErr) => callbackErr(new Error("Server is not running, cannot load server")));
    
    inputEl.value = "Walk the dog";
    buttonEl.click();
    inputEl.value = "Go shopping";
    buttonEl.click();

    // Assert
    const notes = document.querySelectorAll('.note')
    expect(notes.length).toBe(2);
    expect(notes[0].textContent).toBe("Oops, something went wrong!")
  });

});