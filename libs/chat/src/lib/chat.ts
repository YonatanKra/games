export class Chat extends HTMLElement {
  private messageArea: Element;
  private chatForm: Element;
  private chatInput: HTMLInputElement;

  connectedCallback() {
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
      #messages {
        box-shadow: 0px 0px 10px 1px #24292e;
        height: 400px;
        border-radius: 5px;
        padding: 5px;
        overflow: auto;
        overflow-wrap: normal;
      }
      </style>
      <div class="chat-wrapper">
        <div class="chat-content">
            <div id="messages"></div>
        </div>
        <form name="chat-form" id="chat-form">
            <input id="chat-input"/>
            <button type="submit" id="chat-input-submit">Send</button>
        </form>
      </div>
    `;

    this.messageArea = this.shadowRoot.querySelector('#messages');
    this.chatForm = this.shadowRoot.querySelector('#chat-form');
    this.chatInput = this.chatForm.querySelector('input');

    this.chatForm.addEventListener('submit', this.messageSubmitHandler());
  }

  private messageSubmitHandler() {
    return (e) => {
      e.preventDefault();
      if (!this.chatInput.value) return;
      this.dispatchEvent(new CustomEvent('message', {
        detail: this.chatInput.value
      }));
      this.chatInput.value = null;
    };
  }

  addMessage(message: string): void {
    this.messageArea.innerHTML += `<p>${message}</p>`;
  }
}
