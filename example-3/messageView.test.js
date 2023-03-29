/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const MessageView = require('./messageView');

describe('MessageView', () => {
  it('shows the message', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const view = new MessageView();

    const inputEl = document.querySelector('#message-input');
    inputEl.value = 'Hello Samuel';

    const buttonEl = document.querySelector('#show-message-button');
    buttonEl.click();

    const message = document.querySelector('#message');

    expect(message).not.toBeNull();
    expect(message.textContent).toBe('Hello Samuel');
  });

  it('hides the message', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const view = new MessageView();

    const buttonEl = document.querySelector('#show-message-button');
    buttonEl.click();
    const buttonEl2 = document.querySelector('#hide-message-button');
    buttonEl2.click();

    expect(document.querySelector('#message')).toBeNull();
  })
});