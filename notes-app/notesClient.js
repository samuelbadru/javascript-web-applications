class NotesClient {
  loadNotes(callback, callbackErr) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => callback(data))
      .catch(() => callbackErr());
  }

  createNote(newNote, callback, callbackErr) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(() => callbackErr());
  }

  convertEmoji(note, callback, callbackErr) {
    fetch('https://makers-emojify.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"text": note})
    })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch(() => callbackErr())
  }
}

module.exports = NotesClient;