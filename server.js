const express = require("express");
const app = express();
const port = 8000;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const dayRoute = require("./routes/dayRoute");
const interviewRoute = require("./routes/interviewRoute");
const availableRoute = require("./routes/availableRoute");
const { Pool } = require("pg");

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

app.use(express.json());

app.use("/", dayRoute);
app.use("/", interviewRoute);
app.use("/", availableRoute);

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const pool = new Pool(dbCredentials);
  socket.on("book", (data) => {
    socket.broadcast.emit("received_message", data);
    pool.query(
      `INSERT INTO interview (student, interviewer_id, appointment_id) VALUES ('${data.interview.student}', '${data.interview.interviewer.id}', '${data.id}');`
    );
  });
  socket.on("delete", (data) => {
    socket.broadcast.emit("received_delete", data);
    pool.query(
      `DELETE FROM interview WHERE interview.appointment_id='${data.id}';`
    );
  });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
