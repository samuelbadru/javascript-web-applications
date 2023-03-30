const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

describe('NotesClient', () => {
  it('loads notes', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify([
      "This note is coming from the server"
    ]));

    client.loadNotes((data) => {
      expect(data).toEqual(["This note is coming from the server"])
      done();
    });
  });

  it('creates a new note', (done) => {
    const client = new NotesClient();

    const newNote = "Remember to reflect on my progress this week!";

    fetch.mockResponseOnce(JSON.stringify([
      "This note is coming from the server",
      "Remember to reflect on my progress this week!"
    ]));

    client.createNote(newNote, (data) => {
      expect(data).toEqual(["This note is coming from the server", "Remember to reflect on my progress this week!"])
      done();
    })
  });
});