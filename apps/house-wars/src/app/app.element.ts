import { io } from "socket.io-client";
import { Chat } from '@games/chat';

const socket = io();

customElements.define('game-root', Chat);

const app = document.body.querySelector('game-root') as Chat;

app.addEventListener('message', (e: CustomEvent) => {
  socket.emit('message', e.detail);
});

socket.on('message', (message) => {
  app.addMessage(`<p>${message}</p>`);
});
