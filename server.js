const express = require('express');
const app = express();
const port = 8000;
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const cors = require('cors');
app.use(cors());

const io = new Server(server, {
  cor: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on('send_message', (data) => {
    socket.broadcast.emit('recieved_message', data);
  });
});

const dayRoute = require('./routes/dayRoute');
const interviewRoute = require('./routes/interviewRoute');
const availableRoute = require('./routes/availableRoute');

app.use(express.json());

app.use('/', dayRoute);
app.use('/', interviewRoute);
app.use('/', availableRoute);

server.listen(port, () => console.log(`Server is running on port ${port}`));

// app.listen(port, () => console.log(`Server is running on port ${port}`));
