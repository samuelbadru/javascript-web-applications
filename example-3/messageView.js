class MessageView {
  constructor() {
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#show-message-button');
    this.buttonEl2 = document.querySelector('#hide-message-button');

    this.buttonEl.addEventListener('click', () => {
       this.displayMessage();
    });

    this.buttonEl2.addEventListener('click', () => {
      this.hideMessage();
    });


  }

  displayMessage() {
    const newDiv = document.createElement('div')
    newDiv.id = 'message';
    newDiv.textContent = document.querySelector('#message-input').value;
    this.mainContainerEl.append(newDiv)
    console.log('Thanks for clicking me!');
  }

  hideMessage() {
    const message = document.querySelector('#message');
    message.remove();
}
}

module.exports = MessageView;