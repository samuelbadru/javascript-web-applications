class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#note-button');

    this.buttonEl.addEventListener('click', () => {
      const messageInput = document.querySelector('#message-input');
      this.model.addNote(messageInput.value);
      messageInput.value = '';
      this.displayNotes();
   });
  }

  displayNotes() {
    const currNotes = document.querySelectorAll('.note');
    currNotes.forEach((note) => {
      note.remove();
    })

    const notes = this.model.getNotes();
    notes.forEach((note) => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.textContent = note;
      this.mainContainerEl.append(noteDiv);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      this.model.setNotes(data);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;