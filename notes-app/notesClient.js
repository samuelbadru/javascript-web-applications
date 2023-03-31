class NotesClient {
  loadNotes(callback, callbackErr) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => callback(data))
      .catch(() => callbackErr());
  }

  createNote(newNote, callback) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(response => {
      return response.json()})
    .then(data => callback(data));
  }
}

module.exports = NotesClient;