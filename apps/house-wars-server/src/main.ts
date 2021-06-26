/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { Server } from 'socket.io';
import * as path from 'path';
import { environment } from './environments/environment';

const port = process.env.PORT || 3333;
const app = express();
const STATIC = environment.staticPath;
const INDEX = path.resolve(STATIC, 'index.html');

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to house-wars-server!' });
});

app.use(express.static(STATIC));
app.get('*', function (req, res) {
  res.sendFile(INDEX);
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Client Connected');
  socket.on('message', (message) => {
    io.emit('message', message);
  })
});
