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

  clearParagraphs() {
    const allParas = document.querySelectorAll('p');
    allParas.forEach((para) => {
      para.remove();
    })
  }

}

module.exports = View;