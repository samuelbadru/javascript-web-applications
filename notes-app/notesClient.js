class NotesClient {
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data)});
  }

  createNote(newNote, callback) {
    console.log(`New note is: ${newNote}`);
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(response => {
      console.log(response)
      return response.json()})
    .then(data => callback(data));
  }
}

module.exports = NotesClient;