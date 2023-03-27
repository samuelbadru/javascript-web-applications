const NotesModel = require('./notesModel');

describe('NotesModel', () => {
  let model;
  beforeEach(() => {
    model = new NotesModel();
  });
  
  it('returns nothings when nothing has been added', () => {
    expect(model.getNotes()).toEqual([])
  });

  it('returns notes that have been added', () => {
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  });
})