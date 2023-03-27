const NotesModel = require('./notesModel');

describe('NotesModel', () => {
  let model;
  beforeEach(() => {
    model = new NotesModel();
  });
  
  it('returns nothings when nothing has been added', () => {
    expect(model.getNotes()).toEqual([])
  });
})