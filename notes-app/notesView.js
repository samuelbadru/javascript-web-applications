class NotesView {
  constructor(model) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
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
}

module.exports = NotesView;