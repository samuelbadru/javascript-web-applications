class NotesView {
  constructor(model) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
    this.buttonEl = document.querySelector('#note-button');

    this.buttonEl.addEventListener('click', () => {
      this.model.addNote(document.querySelector('#message-input').value)
      this.displayNotes();
   });
  }

  displayNotes() {
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