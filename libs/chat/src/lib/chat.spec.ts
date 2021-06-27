import { Chat } from './chat';

const ELEMENT_TAG = 'chat-widget';

describe('chat', () => {
  let component, messagesArea, chatForm;

  beforeAll(() => {
    window.customElements.define(ELEMENT_TAG, Chat);
  });

  beforeEach(function() {
    component = document.createElement(ELEMENT_TAG) as Chat;
    document.body.appendChild(component);
    messagesArea = component.shadowRoot.querySelector('#messages');
    chatForm = component.shadowRoot.querySelector('#chat-form');
  });

  it('should expose a class', () => {
    expect(Chat).toBeTruthy();
  });

  it(`should create a custom element`, function() {
    expect(window.customElements.get(ELEMENT_TAG)).toEqual(Chat);
  });

  it(`should add a message to the messages list`, function() {
    component.addMessage('message');
    expect(messagesArea.textContent).toEqual('message');
  });

  it(`should emit a message event`, function() {
    const spy = jest.fn();
    component.addEventListener('message', spy);
    chatForm.querySelector('input').value = 'dummy value';
    chatForm.dispatchEvent(new Event('submit'));
    expect(spy).toHaveBeenCalled();
  });

  it(`should not emit message event if value is null`, function() {
    const spy = jest.fn();
    component.addEventListener('message', spy);
    chatForm.dispatchEvent(new Event('submit'));
    expect(spy).not.toHaveBeenCalled();
  });

  it(`should clear the input after submitting the form`, function() {
    const spy = jest.fn();
    component.addEventListener('message', spy);
    chatForm.querySelector('input').value = 'dummy value';
    chatForm.dispatchEvent(new Event('submit'));
    expect(chatForm.querySelector('input').value).toBeFalsy();
  });
});
