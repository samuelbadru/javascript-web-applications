const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

describe('NotesClient', () => {
  it('loads notes', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      note1: "This note is coming from the server"
    }));

    client.loadNotes((data) => {
      expect(data.note1).toBe("This note is coming from the server")
      done();
    });
  });
});