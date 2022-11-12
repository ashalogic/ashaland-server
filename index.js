const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
  // cors: {
  //   origin: "*",
  //   // methods: ["GET", "POST"],
  //   // allowedHeaders: ["my-custom-header"],
  //   // credentials: true
  // },
});

var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("chat message", (msg) => {
    io.emit("message: ", msg);
  });

  socket.conn.on("close", (reason) => {
    console.log(`${socket.id} ${reason}`);
  });
});

// instrument(io, {
//   auth: false,
// });
server.listen(8081, () => {
  console.log("Running on 8081");
});
