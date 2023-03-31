class NotesModel {
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  addNote(text) {
    this.notes.push(text);
  }

  reset() {
    this.notes = [];
  }

  setNotes(data) {
    this.reset();
    data.forEach((note) => {
      this.addNote(note);
    })
  }
}


module.exports = NotesModel;