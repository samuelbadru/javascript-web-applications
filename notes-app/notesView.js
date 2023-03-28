class NotesView {
  constructor(model) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
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