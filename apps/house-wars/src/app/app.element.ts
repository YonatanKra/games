import { io } from "socket.io-client";

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  private chatInput: HTMLInputElement | null;
  private chatContent: Element;
  private chatForm: HTMLFormElement;

  connectedCallback() {
    const socket = io();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
      .chat-wrapper {
        border: 2px solid gray;
        padding: 15px;
      }
      .chat-wrapper>* {
        margin: 5px;
      }
      #chat-content {
        box-shadow: 0px 0px 10px 1px #24292e;
        height: 400px;
        border-radius: 5px;
        padding: 5px;
      }
      </style>
      <div class="chat-wrapper">
        <div class="chat-content">
            <div id="chat-content"></div>
        </div>
        <form name="chat-form" id="chat-form">
            <input id="chat-input"/>
            <button type="submit" id="chat-input-submit">Send</button>
        </form>
      </div>
      `;
    this.chatInput = this.shadowRoot.querySelector('#chat-input');
    this.chatContent = this.shadowRoot.querySelector('#chat-content');
    this.chatForm = this.shadowRoot.querySelector('#chat-form');
    this.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.chatInput.value) return;
      socket.emit('message', this.chatInput.value);
      this.chatForm.reset();
    });

    socket.on('message', (message) => {
      this.chatContent.innerHTML += `<p>${message}</p>`;
    });
  }
}

customElements.define('games-root', AppElement);
