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
}


module.exports = NotesModel;