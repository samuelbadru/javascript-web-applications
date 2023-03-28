class View {
  constructor() {
    this.mainContainerEl = document.querySelector('#main-container');

    console.log(this.mainContainerEl);
  }

  addParagraph() {
    const newEl = document.createElement('p');
    newEl.textContent = 'This paragraph has been dynamically added by JavaScript!';
    this.mainContainerEl.append(newEl);
  }
}

module.exports = View;